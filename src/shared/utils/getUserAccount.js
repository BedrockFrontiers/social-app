import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getUserAccount(identifier) {
  try {
    const supabase = createClient();
    
    if (identifier === "@me") {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw new Error("Failed to fetch user from Supabase");
      }

      if (data?.user) {
        data.user.prisma = await prisma.user.findUnique({
          where: { email: data.user.email },
          include: {
            posts: true,
            followers: true,
            following: true,
            likes: true,
            reposts: true
          }
        });
      }

      return data?.user;
    } else {
      const user = await prisma.user.findUnique({
        where: { identifier },
        include: {
          posts: true,
          followers: true,
          following: true,
          likes: true,
          reposts: true
        }
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
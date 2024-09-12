import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getUserAccount(identifier) {
	const supabase = createClient();

	if (identifier === "@me") {
		const { data } = await supabase.auth.getUser();

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

		return user;
	}
}
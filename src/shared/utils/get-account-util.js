import { createClient } from "@/infrastructure/libraries/supabase/server";
import UserRepository from "@/infrastructure/repositories/user-repository";

const userRepository = new UserRepository();

export default async function getAccount(identifier) {
  const supabase = createClient();

  if (identifier === "@me") {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return null;
    }

    if (data?.user) {
      const user = await userRepository.findByEmail(data.user.email);
      if (!user) {
        return null;
      }

      data.user.prisma = user;
    }

    return data?.user;
  } else {
    const user = await userRepository.findByIdentifier(identifier);

    if (!user)
      return null;

    return user;
  }
}

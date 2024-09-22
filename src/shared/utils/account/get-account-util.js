import { createClient } from "@/infrastructure/libraries/supabase/server";
import UserRepository from "@/infrastructure/repositories/user-repository";

const userRepository = new UserRepository();

export default async function getAccount(identifier, userId = null) {
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
  } else if (!isNaN(identifier)) {
    const user = await userRepository.findById(parseInt(identifier), userId);

    if (!user)
      return null;

    return user;
  } else {
    const user = await userRepository.findByIdentifier(identifier, userId);

    if (!user)
      return null;

    return user;
  }
}

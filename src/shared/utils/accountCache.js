import getUserAccount from "@/shared/utils/getUserAccount"; 

let cachedUsers = {};

export default async function accountCache() {
  let userObj = await getUserAccount("@me");

  const identifier = userObj?.prisma?.identifier;

  if (identifier && !cachedUsers[identifier])
    cachedUsers[identifier] = userObj;

  return cachedUsers[identifier] || null;
}

import getUserAccount from "@/shared/utils/getUserAccount";

let cachedUsers = {};

export default async function accountCache() {
  let userObj = null;
  userObj = await getUserAccount("@me");

  if (!cachedUsers[userObj.prisma.identifier])
    cachedUsers[userObj.prisma.identifier] = userObj;
  return cachedUsers[userObj.prisma.identifier];
}

import MainStructure from "@/presentation/components/MainStructure";
import MainHeader from "@/presentation/components/MainHeader";
import Link from "next/link";
import Image from "next/image";
import Post from "@/presentation/components/Post";
import MessageRepository from "@/infrastructure/repositories/message-repository";
import getVerifiedLevelName from "@/shared/utils/user/get-verified-level-name-util";
import getAccount from "@/shared/utils/account/get-account-util";

export default async function MessagesPage({ params }) {
  const userId = decodeURIComponent(params.userId);
  const me = await getAccount("@me");
  const user = await getAccount(parseInt(userId));

  if (!user) {
    return {
      title: `User id ${userId} Not Found`,
      description: `The account with id ${userId} does not exist or is not active.`,
    };
  }

  if (!me) {
    return {
      title: `Message Permission Denied`,
      description: `You can't talk with other users without account.`,
    };
  }

  const verifiedName = getVerifiedLevelName(user.verified);
  const messageRepo = new MessageRepository();
  const messages = await messageRepo.findAllByUserId(me.prisma.id);

  return (
  	<MainStructure>
  		<MainHeader returnRoute={`/profile/${user.identifier}`}>
  			<Link href={`/profile/${user.identifier}`} className="flex items-center gap-2">
  			  <div className="w-[30px] h-[30px]">
  			    <Image className="rounded-full object-cover select-none w-[30px] h-[30px]" src={user.avatarUrl} width={30} height={30} quality={100} alt="Profile Picture" />
  			  </div>
  			  <div>
  			    <div className="flex items-center gap-2">
  			      <p className="text-sm dark:text-white font-semibold truncate max-w-[130px]">{user.name}</p>
  			      {verifiedName.length > 0 && (<Image className="select-none" src={`/badges/${verifiedName}.png`} width={15} height={15} alt={verifiedName} />)}
  			    </div>
  			    <p className="text-xs font-semibold text-zinc-500 max-w-[130px] truncate">{user.identifier}</p>
  			  </div>
  			</Link>
  		</MainHeader>
  	</MainStructure>
  );
}
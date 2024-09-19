import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import BuzzText from "@/presentation/components/UI/BuzzText";
import ViewProfileActions from "@/presentation/components/Profile/ViewProfileActions";
import MediaModal from "@/presentation/components/Media/MediaModal";
import FollowerRepository from "@/infrastructure/repositories/follower-repository";
import { FaBabyCarriage } from "react-icons/fa";

export default async function ProfileHeader({ user, verifiedName, me }) {
  const sinceDate = moment(user.createdAt);
  const sinceRelativeDate = sinceDate.fromNow();
  const isFollowing = await new FollowerRepository().exists(me?.prisma.id, user.id);

  return (
    <div>
      <div className={`relative min-h-[200px] ${!user.bannerUrl && "bg-blue-500"}`}>
        {user.bannerUrl && (<MediaModal className="object-cover select-none cursor-pointer" quality={100} src={user.bannerUrl} fill={true} alt="Profile Banner" />)}     
      </div>
      <div className="relative themed-border !border-x-0 bg-white dark:bg-black">
        <div className="px-4">
          <div className="flex max-lg:flex-col gap-3">
            <div className="-mt-10 flex justify-between">
              <div className="w-[120px] h-[120px]">
                <MediaModal className="relative rounded-full object-cover select-none border-4 border-white dark:border-black cursor-pointer w-[120px] h-[120px]" src={user.avatarUrl} width={120} height={120} quality={100} alt="Profile Picture" />
              </div>
              <div className="lg:hidden mt-[60px]">
                <ViewProfileActions user={user} me={me} isFollowing={isFollowing} />
              </div>
            </div>
            <div className="mt-2 w-full">
              <div className="flex gap-4 w-full items-center max-lg:items-start justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <h3 className="font-bold text-gray-800 dark:text-white text-2xl">{user.name}</h3>
                    {verifiedName.length > 0 && (
                      <Image className="select-none" src={`/badges/${verifiedName}.png`} width={25} height={25} alt={verifiedName} />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-zinc-500">{user.identifier}</p>
                </div>
                <div className="lg:visible max-lg:hidden">
                  <ViewProfileActions user={user} me={me} isFollowing={isFollowing} />
                </div>
              </div>
              <div className="flex mt-3 max-lg:mt-2 gap-4">
                <Link href={`/profile/${user.identifier}/followers`} className="text-gray-700 transition duration-200 hover:underline dark:text-white text-sm"><strong>{user.followers.length}</strong> followers</Link>
                <Link href={`/profile/${user.identifier}/following`} className="text-gray-700 transition duration-200 hover:underline dark:text-white text-sm"><strong>{user.following.length}</strong> following</Link>
                <span className="text-gray-600 dark:text-white text-sm"><strong>{user.posts.length}</strong> posts</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 w-full">
              <h3 className="text-xs text-zinc-600 font-bold select-none border-b border-gray-200 dark:border-zinc-800">About Me</h3>
              <div className="mt-5 text-sm">
                <BuzzText content={user.bio || "Nothing about me."} />
              </div>
            </div>
          </div>
        </div>
        <div className="my-2 p-4">
          <p className="text-xs font-semibold flex items-center gap-2 text-zinc-700">
            <FaBabyCarriage />
            Since: {sinceRelativeDate}
          </p>
        </div>
        <div className="flex px-4 mt-[15px] flex-wrap gap-2 items-center mt-auto">
          <p className="font-semibold select-none text-sm p-2 transition duration-200 hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer border-b-4 border-blue-500">Tides</p>
          <p className="font-semibold text-zinc-500 select-none text-sm p-2 transition duration-200 hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer">Replies</p>
        </div>
      </div>
    </div>
  );
}

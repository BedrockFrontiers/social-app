import LoggedItems from "@/presentation/components/Sidebars/LeftSideBar/LoggedItems";
import UnloggedItems from "@/presentation/components/Sidebars/LeftSideBar/UnloggedItems";
import Image from "next/image";
import Link from "next/link";
import UserBox from "@/presentation/components/User/UserBox";
import isLogged from "@/shared/utils/account/is-logged-util";
import getVerifiedLevelName from "@/shared/utils/user/get-verified-level-name-util";

export default function LeftSideBar({ me }) {
  const logged = isLogged(me);
  const verifiedName = getVerifiedLevelName(me?.prisma.verified);

  return (
    <>
      <div className="w-[300px] max-lg:w-0 max-lg:hidden h-[95vh] z-10">
        <aside className="fixed top-0 left-0 w-[300px] max-lg:w-0 max-lg:hidden h-[95vh] overflow-y-hidden flex flex-col items-center bg-transparent text-black">
          <div className="pt-4 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              {(logged) ? <LoggedItems /> : <UnloggedItems />}
            </div>
          </div>
          {logged && (
            <div className="relative mt-auto w-full max-lg:hidden pt-5">
              <Link href="/profile/@me" className="flex items-center gap-2 justify-center">
                <div className="w-[30px] h-[30px]">
                  <Image className="rounded-full object-cover select-none w-[30px] h-[30px]" src={me.prisma.avatarUrl} width={30} height={30} quality={100} alt="Profile Picture" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm dark:text-white font-semibold truncate max-w-[130px]">{me.prisma.name}</p>
                    {verifiedName.length > 0 && (<Image className="select-none" src={`/badges/${verifiedName}.png`} width={15} height={15} alt={verifiedName} />)}
                  </div>
                  <p className="text-xs font-semibold text-zinc-500 max-w-[130px] truncate">{me.prisma.identifier}</p>
                </div>
              </Link>
              {/*
              <div className="flex border-t dark:border-zinc-800 flex-wrap mt-5 pt-5 gap-2 items-center justify-center">
                <Link className="text-sm font-semibold text-blue-500 transition duration-200 hover:text-blue-400 hover:underline" href="/support/tos">Terms of Service</Link>
                ·
                <Link className="text-sm font-semibold text-blue-500 transition duration-200 hover:text-blue-400 hover:underline" href="/support/privacy">Privacy</Link>
                ·
                <Link className="text-sm font-semibold text-blue-500 transition duration-200 hover:text-blue-400 hover:underline" href="/support/cookies">Use of Cookies</Link>
              </div>
              */}
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
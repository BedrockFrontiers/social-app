import { createClient } from "@/lib/supabase/client";
import LoggedItems from "@/interfaces/web/components/Sidebars/LeftSideBar/LoggedItems";
import UnloggedItems from "@/interfaces/web/components/Sidebars/LeftSideBar/UnloggedItems";
import Image from "next/image";
import Link from "next/link";
import getVerifiedLevelName from "@/shared/utils/getVerifiedLevelName";

export default function LeftSideBar({ user }) {
  const isLogged = Object.keys(user || {}).length > 0;
  const verifiedName = getVerifiedLevelName(user?.prisma.verified);

  return (
    <>
      <div className="w-[300px] max-lg:w-0 max-lg:hidden h-[95vh] z-10">
        <aside className="fixed top-0 left-0 w-[300px] max-lg:w-0 max-lg:hidden h-[95vh] overflow-y-hidden flex flex-col items-center bg-transparent text-black">
          <div className="pt-4 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              {(isLogged) ? <LoggedItems /> : <UnloggedItems />}
            </div>
          </div>
          {isLogged && (
            <div className="relative mt-auto px-4 w-full max-lg:hidden border-t dark:border-zinc-800 pt-5">
              <Link href="/profile/@me" className="flex items-center gap-2 justify-center">
                <div>
                  <Image className="rounded-full object-cover select-none" src={user.prisma.avatarUrl} width={30} height={30} quality={100} alt="Profile Picture" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm dark:text-white font-semibold truncate max-w-[130px]">{user.prisma.name}</p>
                    {verifiedName.length > 0 && (<Image className="select-none" src={`/badges/${verifiedName}.png`} width={15} height={15} alt={verifiedName} />)}
                  </div>
                  <p className="text-xs font-semibold text-zinc-500 max-w-[130px] truncate">{user.prisma.identifier}</p>
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
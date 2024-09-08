/**
 * LeftSideBar Component
 * 
 * This component represents the sidebar located on the left side of the layout when the user is logged in.
 * It is used to display navigation links, user information, or any other
 * relevant content specific to the left side of the page.
 * 
 * Usage:
 * <LeftSideBar />
 */

"use client";

import LoggedItems from "@/components/Sidebars/LeftSideBar/LoggedItems";
import UnloggedItems from "@/components/Sidebars/LeftSideBar/UnloggedItems";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookieFromDOM } from "@/utils/getCookieFromDOM";

export default function LeftSideBar() {
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
      setIsLogged(getCookieFromDOM(document, "LoggedIn"));
    }, []);

    return (
        <div className="w-[300px] max-lg:w-0 max-lg:hidden h-[95vh] z-10">
            <aside className="fixed top-0 left-0 w-[300px] max-lg:w-0 max-lg:hidden h-[95vh] overflow-y-hidden flex flex-col items-center bg-transparent text-black">
                <div className="pt-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        {(isLogged == "true") ? <LoggedItems /> : <UnloggedItems />}
                    </div>
                </div>
                {isLogged && (
                    <div className="relative mt-auto px-4 w-full max-lg:hidden">
                        <Link href="/profile/@filipotop" className="flex items-center gap-2 justify-center">
                        <div>
                            <Image className="rounded-full object-cover select-none" src="https://cdn.bsky.app/img/avatar/plain/did:plc:75khwetbovmfeylwszpvobu6/bafkreid5xynwkoazg4rres5wxd3fhcw2nbrmv7i3mychx4tni5lv62yovq@jpeg" width={30} height={30} quality={100} alt="Profile Picture" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm dark:text-white font-semibold truncate max-w-[130px]">filipotop</p>
                                <Image className="select-none" src="/badges/hallow-verified.png" width={15} height={15} alt="Verified" />
                            </div>
                            <p className="text-xs font-semibold text-zinc-500 max-w-[130px] truncate">@filipotop</p>
                        </div>
                        </Link>
                        <div className="flex border-t dark:border-zinc-800 flex-wrap mt-5 pt-5 gap-2 items-center justify-center">
                            <Link className="text-sm font-semibold text-blue-500 transition duration-200 hover:text-blue-400 hover:underline" href="/support/tos">Terms of Service</Link>
                            ·
                            <Link className="text-sm font-semibold text-blue-500 transition duration-200 hover:text-blue-400 hover:underline" href="/support/privacy">Privacy</Link>
                            ·
                            <Link className="text-sm font-semibold text-blue-500 transition duration-200 hover:text-blue-400 hover:underline" href="/support/cookies">Use of Cookies</Link>
                        </div>
                    </div>
                )}
            </aside>
        </div>
    );
}


/**
 * LeftSidebar Component
 * 
 * This component represents the sidebar located on the left side of the layout when the user is not logged in.
 * It is used to display the log in button, privacy policy, etc.
 * 
 * Usage:
 * <LeftSidebar />
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import SidebarItem from "@/components/Sidebars/SidebarItem";
import listSidebarItems from "@/data/listSidebarItems";
import { FaPaperPlane } from "react-icons/fa6";

export function UnloggedInLeftSideBar() {
  return (
    <div className="w-[300px] max-lg:w-0 max-lg:hidden h-[95vh] z-10">
    <aside className="fixed top-0 left-0 w-[300px] max-lg:w-0 max-lg:hidden h-[95vh] overflow-y-hidden flex flex-col items-center bg-transparent text-black">
      <div className="pt-4 flex flex-col gap-6">

        <div className="mt-auto text-align-center mr-10 ml-4 mt-15">
        <Image  src="/icon.png" width={65} height={65} className="select-none" alt="Social App Logo" />
        <p className="dark:text-white font-semibold w-22 text-align-center mt-2">
            Log in to join the conversation and enjoy Tidal. It&apos;s free!
        </p>
          <button className="p-2 max-[1000px]:p-3 w-full rounded-full font-bold bg-blue-500 text-white transition duration-200 hover:opacity-90 mt-3">
            <span className="visible max-[1000px]:hidden select-none text-sm text-center">
            	Log In
            </span>
            <div className="hidden max-[1000px]:visible">
            	<FaPaperPlane />
            </div>
          </button>
        </div>
      </div>
      <div className="relative mt-auto px-4 w-full max-[1000px]:hidden">

      	<div className="flex border-t dark:border-zinc-800 flex-wrap mt-5 pt-5 gap-2 items-center justify-center">
      		<Link className="text-sm font-semibold text-blue-500 transition duration-200 hover:text-blue-400 hover:underline" href="/support/tos">Terms of Service</Link>
      		·
      		<Link className="text-sm font-semibold text-blue-500 transition duration-200 hover:text-blue-400 hover:underline" href="/support/privacy">Privacy</Link>
      		·
      		<Link className="text-sm font-semibold text-blue-500 transition duration-200 hover:text-blue-400 hover:underline" href="/support/cookies">Use of Cookies</Link>
      	</div>
      </div>
    </aside>
    </div>
  );
}

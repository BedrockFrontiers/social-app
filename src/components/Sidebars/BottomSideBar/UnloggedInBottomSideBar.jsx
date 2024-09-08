/**
 * BottomSidebar Component
 * 
 * This component represents the sidebar located on the bottom side of the layout.
 * It is used to display navigation links, user information, or any other
 * relevant content specific to the bottom side of the page.
 * 
 * Usage:
 * <LoggedInBottomSideBar />
 */

"use client";

import Image from "next/image";
import SidebarItem from "@/components/Sidebars/SidebarItem";
import listSidebarItems from "@/data/listSidebarItems";

export default function UnloggedInBottomSideBar() {
	return (
    
		<div className="absolute z-50 bottom-0 left-0 w-full bg-white dark:bg-black border-t dark:border-zinc-700 py-3 min-h-[50px]">
			<div className="flex gap-4 justify-center h-full overflow-x-auto items-center">
      <Image  src="/icon.png" width={42} height={42} className="select-none" alt="Social App Logo" />
        <p className="dark:text-white w-full text-align-center">
            Log in to join the conversation and enjoy Tidal. It's free!
        </p>
          <button width={42}className="p-2 max-[1000px]:p-3 w-full rounded-full font-bold bg-blue-500 text-white transition duration-200 hover:opacity-90">
            <span className="visible select-none text-sm text-center">
            	Log In
            </span>
          </button>
        </div>
      </div>

	);
}
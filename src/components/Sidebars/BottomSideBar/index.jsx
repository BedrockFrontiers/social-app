/**
 * BottomSidebar Component
 * 
 * This component represents the sidebar located on the bottom side of the layout.
 * It is used to display navigation links, user information, or any other
 * relevant content specific to the bottom side of the page.
 * 
 * Usage:
 * <BottomSidebar />
 */

"use client";

import Image from "next/image";
import SidebarItem from "@/components/Sidebars/SidebarItem";
import listSidebarItems from "@/data/listSidebarItems";

export default function BottomSideBar() {
	return (
		<div className="fixed z-50 bottom-0 left-0 w-full bg-white dark:bg-black border-t dark:border-zinc-700 py-3 min-h-[50px]">
			<div className="flex gap-4 justify-center h-full overflow-x-auto items-center">
				{listSidebarItems.map((item) => (
          <SidebarItem
            key={item.url}
            url={item.url}
            icon={item.icon}
            text={item.text}
          />
        ))}
			</div>
		</div>
	);
}
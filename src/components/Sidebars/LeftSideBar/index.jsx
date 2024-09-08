/**
 * LeftSidebar Component
 * 
 * This component represents the sidebar located on the left side of the layout.
 * It is used to display navigation links, user information, or any other
 * relevant content specific to the left side of the page.
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

export default function LeftSideBar() {
  return (
    <aside className="relative w-[300px] max-[1000px]:w-[75px] h-[95vh] overflow-y-hidden flex flex-col items-center bg-transparent text-black max-[640px]:w-0 max-[640px]:hidden">
      <div className="pt-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {listSidebarItems.map((item) => (
            <SidebarItem
              key={item.url}
              url={item.url}
              icon={item.icon}
              svgFilled={item.svgFilled}
              text={item.text}
            />
          ))}
        </div>

        <div className="mt-auto">
          <button className="p-2 max-[1000px]:p-3 w-full rounded-full font-bold bg-blue-500 text-white transition duration-200 hover:opacity-90">
            <span className="visible max-[1000px]:hidden select-none text-sm text-center">
            	New Tide
            </span>
            <div className="hidden max-[1000px]:visible">
            	<FaPaperPlane />
            </div>
          </button>
        </div>
      </div>
      <div className="relative mt-auto px-4 w-full max-[1000px]:hidden">
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
    </aside>
  );
}

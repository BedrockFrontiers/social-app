/**
 * RightSidebar Component
 * 
 * This component represents the sidebar located on the right side of the layout.
 * It is used to display navigation links, user information, or any other
 * relevant content specific to the right side of the page.
 * 
 * Usage:
 * <RightSidebar />
 */

import Image from "next/image";
import Search from "/public/icons/search.svg";

export default function RightSideBar() {
	return (
		<aside className="w-[300px] h-[95vh] overflow-y-auto rounded-r-xl px-4 pt-2 bg-white text-black border-l border-b border-r border-t max-[1000px]:hidden">
			<div>
				<div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
					<Search className="text-gray-800" width={25} height={25} />
					<input className="bg-transparent text-gray-800 outline-none w-full text-sm" type="text" placeholder="Search..." />
				</div>
			</div>
		</aside>
	);
}

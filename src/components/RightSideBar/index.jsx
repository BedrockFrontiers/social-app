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

export default function RightSideBar() {
	return (
		<aside className="w-[250px] h-[100vh] overflow-y-auto p-4 bg-white text-black border-r border-gray-300">
			<div>
				<div className="bg-zinc-100 w-full p-2 rounded-full flex items-center gap-2">
					<Image src="/icons/search.svg" width={25} height={25} alt="Search" />
					<input className="bg-transparent outline-none" type="text" placeHolder="Search..." />
				</div>
			</div>
		</aside>
	);
}

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

import Image from "next/image";

export default function LeftSideBar() {
	return (
		<aside className="w-[300px] max-w-4xl bg-white border-r border-gray-300 h-[100vh] overflow-y-auto p-4">
		  <div className="pt-4 ml-auto pr-[7%] flex flex-col gap-4">
		    <div className="flex items-center gap-2 cursor-pointer transition delay-50 hover:bg-gray-200 p-2 rounded-lg">
		      <Image src="/icons/home.svg" width={25} height={25} alt="Home" />
		      <h3 className="text-lg font-semibold select-none">Home</h3>
		    </div>
		    <div className="flex items-center gap-2 cursor-pointer transition delay-50 hover:bg-gray-200 p-2 rounded-lg">
		      <Image src="/icons/notifications.svg" width={25} height={25} alt="Notifications" />
		      <h3 className="text-lg text-right font-semibold select-none">Notifications</h3>
		    </div>
		    <div className="flex items-center gap-2 cursor-pointer transition delay-50 hover:bg-gray-200 p-2 rounded-lg">
		      <Image src="/icons/feeds.svg" width={25} height={25} alt="Feeds" />
		      <h3 className="text-lg text-right font-semibold select-none">Feeds</h3>
		    </div>
		    <div className="flex items-center gap-2 cursor-pointer transition delay-50 hover:bg-gray-200 p-2 rounded-lg">
		      <Image src="/icons/profile.svg" width={25} height={25} alt="Profile" />
		      <h3 className="text-lg text-right font-semibold select-none">Profile</h3>
		    </div>
		    <div className="flex items-center gap-2 cursor-pointer transition delay-50 hover:bg-gray-200 p-2 rounded-lg">
		      <Image src="/icons/settings.svg" width={25} height={25} alt="Settings" />
		      <h3 className="text-lg text-right font-semibold select-none">Settings</h3>
		    </div>
		    <div>
		    	<button className="p-2 w-full bg-blue-500 text-white rounded-full font-bold transition duration-200 hover:bg-blue-600">Create New Post</button>
		    </div>
		  </div>
		</aside>
	);
}
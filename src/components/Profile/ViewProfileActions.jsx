/**
 * ViewProfileActions Component
 * 
 * This component renders action buttons for interacting with a user's profile, such as
 * sending a direct message or following the user. It provides two buttons styled for 
 * different themes (light and dark mode), with hover effects for a smoother user experience.
 * 
 * Features:
 * - The "Direct Message" button uses a light/dark theme depending on the user's settings.
 * - The "Follow" button is styled with a blue background and reduces opacity on hover.
 * - Both buttons have rounded corners and are responsive to user interaction with smooth
 *   transitions on hover.
 * 
 * Usage:
 * <ViewProfileActions />
 */

"use client";
import { useState } from "react";

export default function ViewProfileActions() {
	const [following, setFollowing] = useState(false);
	return (
		<div className="flex max-[640px]:flex-col sm:items-center gap-4">
			<button className="py-1 px-5 rounded-full font-bold bg-gray-100 dark:bg-zinc-700 transition duration-200 hover:bg-gray-200 dark:hover:bg-zinc-800">
			  <span className="select-none text-[11px] sm:text-xs text-gray-800 dark:text-white text-center">
			  	Direct Message
			  </span>
			</button>
			<button onClick={() => setFollowing(prev => !prev)} className={`py-1 px-5 rounded-full font-bold transition duration-200 ${!following ? "bg-blue-500 hover:opacity-90 text-white dark:text-black" : "text-black dark:text-white bg-transparent border-2 border-blue-500 hover:border-transparent hover:bg-blue-500 hover:text-white dark:hover:text-black"}`}>
			  <span className="select-none text-[11px] sm:text-xs text-center">
			  	{ following ? "Unfollow" : "Follow" }
			  </span>
			</button>
		</div>
	);
}
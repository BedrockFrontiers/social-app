"use client";

import { useState } from "react";
import EditProfile from "@/presentation/components/Profile/EditProfile";
import Link from "next/link";

export default function ViewProfileActions({ me, user, isFollowing = false }) {
	const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
	const [following, setFollowing] = useState(isFollowing);

	async function followUser() {
		const req = await fetch("/api/account/follow", {
			method: "POST",
			headers: {
				"Authorization": `G-ID ${me.prisma.gid}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				identifier: me.prisma.identifier,
				toFollowIdentifier: user.identifier
			})
		});

		setFollowing(true);
	}

	async function unfollowUser() {
		const req = await fetch("/api/account/unfollow", {
			method: "POST",
			headers: {
				"Authorization": `G-ID ${me.prisma.gid}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				identifier: me.prisma.identifier,
				toFollowIdentifier: user.identifier
			})
		});
		setFollowing(false);
	}

	return (
		<div className="flex max-[640px]:flex-col sm:items-center gap-4">
			{((me && user) && me.prisma.identifier !== user.identifier) && (
				<>
					<button className="py-1 px-5 rounded-full font-bold bg-gray-100 dark:bg-zinc-700 transition duration-200 hover:bg-gray-200 dark:hover:bg-zinc-800">
					  <span className="select-none text-[11px] sm:text-xs text-gray-800 dark:text-white text-center">
					  	Direct Message
					  </span>
					</button>
					<button onClick={following ? unfollowUser : followUser} className={`py-1 px-5 rounded-full font-bold transition duration-200 ${!following ? "bg-blue-500 hover:opacity-90 text-white dark:text-black" : "text-black dark:text-white bg-transparent border-2 border-blue-500 hover:border-transparent hover:bg-blue-500 hover:text-white dark:hover:text-black"}`}>
					  <span className="select-none text-[11px] sm:text-xs text-center">
					  	{ following ? "Unfollow" : "Follow" }
					  </span>
					</button>
				</>
			)}
			{((me && user) && me.prisma.identifier === user.identifier) && (
				<>
					<button onClick={() => setIsOpenEditProfile(true)} className="py-1 px-5 rounded-full font-bold bg-gray-100 dark:bg-zinc-700 transition duration-200 hover:bg-gray-200 dark:hover:bg-zinc-800">
					  <span className="select-none text-[11px] sm:text-xs text-gray-800 dark:text-white text-center">
					  	Edit Profile
					  </span>
					</button>
					{isOpenEditProfile && (<EditProfile me={me} onClose={() => setIsOpenEditProfile(false)} />)}
				</>
			)}
		</div>
	);
}
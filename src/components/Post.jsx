"use client";

import { useState } from "react";
import Image from "next/image";
import { FaRegComment, FaHeart, FaRegHeart, FaArrowsRotate } from "react-icons/fa6";

export default function Post({ post }) {
	const [liked, setLiked] = useState(false);
	const verifiedLevel = ['', "/badges/verified.png", "/badges/gold-verified.png", "/badges/hallow-verified.png"];

	return (
		<div className="relative p-4">
			<div id="post:content" className="flex gap-4">
				<div>
					<Image
						className="rounded-full select-none"
						src={post.profileImage}
						width={60}
						height={60}
						quality={100}
						alt="Profile Picture"
					/>
				</div>
				<div className="sm:w-[500px]">
					{post.reposted && (
						<div className="flex items-center gap-1 text-xs text-zinc-500">
							<FaArrowsRotate />
							<p id="user:identifier" className="font-bold max-w-[130px] truncate">Reposted</p>
						</div>
					)}
					<div className="flex items-center gap-1">
						<div id="user:information" className="flex items-center gap-1">
							<p id="user:name" className="text-sm font-bold cursor-pointer transition duration-200 hover:underline">{post.username}</p>
							{verifiedLevel[post.verified].length > 0 && (
								<Image
									id="user:verified"
									className="select-none"
									src={verifiedLevel[post.verified]}
									width={20}
									height={20}
									alt="Verified"
								/>
							)}
							<p id="user:identifier" className="text-sm font-semibold text-zinc-500 max-w-[130px] truncate">{post.identifier}</p>
						</div>
						<span className="text-zinc-500">·</span>
						<p id="uploaded:at" className="text-xs font-semibold text-zinc-500">{post.uploadedAt}</p>
					</div>
					<div className="mt-2">
						<p className="text-sm">
							{post.content}
						</p>
					</div>
					{post.attachments.length > 0 && (
						<div className="mt-2">
							<div className="relative w-full h-auto rounded-xl">
								<Image
									className="rounded-xl select-none"
									src={post.attachments[0]}
									alt="Post Image"
									width={500}
									height={300}
								/>
							</div>
						</div>
					)}
					<div id="post:actions" className="sm:w-[500px] flex justify-between mt-2 items-center flex-wrap">
						<div id="post:comment:action" className="transition duration-200 rounded-full p-1 hover:bg-black hover:bg-opacity-20 flex items-center gap-2 cursor-pointer">
							<FaRegComment className="text-zinc-500" />
							<p id="post:comment:count" className="text-sm text-zinc-500 font-semibold text-zinc-500 select-none">{post.comments}</p>
						</div>
						<div id="post:repost:action" className="transition duration-200 rounded-full p-1 hover:bg-black hover:bg-opacity-20 flex items-center gap-2 cursor-pointer">
							<FaArrowsRotate className="text-zinc-500" />
							<p id="post:reposts:count" className="text-sm text-zinc-500 font-semibold text-zinc-500 select-none">{post.reposts}</p>
						</div>
						<div onClick={() => setLiked(prev => !prev)} id="post:like:action" className="transition duration-200 rounded-full p-1 hover:bg-black hover:bg-opacity-20 flex items-center gap-2 cursor-pointer">
							{liked ? (
								<FaHeart className="text-pink-500" />
							) : (
								<FaRegHeart className="text-zinc-500" />
							)}
							<p id="post:likes:count" className={`text-sm ${liked ? "text-pink-500" : "text-zinc-500"} select-none font-semibold text-zinc-500`}>{post.likes}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

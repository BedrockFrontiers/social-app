"use client";

import { useState, useEffect, useRef } from "react";
import { FaHeart, FaRegHeart, FaArrowsRotate } from "react-icons/fa6";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import moment from "moment";
import getVerifiedLevelName from "@/shared/utils/user/get-verified-level-name-util";
import BuzzText from "@/presentation/components/UI/BuzzText";
import Link from "next/link";
import Image from "next/image";
import PostDropdownActions from "@/presentation/components/UI/Post/PostDropdownActions";
import Attachments from "@/presentation/components/Media/Attachments";

export default function Post({ post, me, isLiked = false, linkable = true }) {
	const [postDropdownOpen, setPostDropdownOpen] = useState(false);
	const [liked, setLiked] = useState(isLiked);
	const [likeCount, setLikeCount] = useState(post.likes.length);
	const verifiedName = getVerifiedLevelName(post.author.verified);

	async function likePost() {
		if (!me)
			return;
		const req = await fetch("/api/services/posts/like", {
			method: "POST",
			headers: {
				"Authorization": `G-ID ${me.prisma.gid}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				postId: post.id
			})
		});

		setLiked(true);
		setLikeCount(prev => prev + 1);
	}


	async function removeLikePost() {
		if (!me)
			return;
		const req = await fetch("/api/services/posts/like", {
			method: "DELETE",
			headers: {
				"Authorization": `G-ID ${me.prisma.gid}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				postId: post.id
			})
		});

		setLiked(false);
		setLikeCount(prev => prev - 1);
	}

	return (
		<div className="relative p-4">
			<div className="flex gap-4">
				<Link href={`/profile/${post.author.identifier}`} className="h-[60px] w-[60px] flex-shrink-0">
					<Image
						className="rounded-full select-none w-[60px] h-[60px]"
						src={post.author.avatarUrl}
						width={60}
						height={60}
						quality={100}
						alt="Profile Picture"
					/>
				</Link>
				<div className="w-[88vw] sm:w-[500px]">
					<div className="flex items-center gap-1 flex-wrap">
						<div className="flex items-center  gap-1">
							<Link href={`/profile/${post.author.identifier}`} className="text-sm font-bold cursor-pointer transition duration-200 hover:underline max-w-[130px] truncate">{post.author.name}</Link>
							{verifiedName.length > 0 && (
								<Image
									className="select-none"
									src={`/badges/${verifiedName}.png`}
									width={20}
									height={20}
									alt="Verified"
								/>
							)}
							<p className="text-sm font-semibold text-zinc-500 max-w-[130px] truncate">{post.author.identifier}</p>
						</div>
						<span className="text-zinc-500">·</span>
						<p className="text-xs font-semibold text-zinc-500">{moment(post.createdAt).fromNow()}</p>
					</div>
					<div className="mt-1">
						{linkable ? (
							<Link href={`/posts/${post.id}`} className="text-sm">
								<BuzzText content={post.content} />
							</Link>
						) : (
							<div className="text-sm">
								<BuzzText content={post.content} />
							</div>
						)}
					</div>
					{post.attachments.length > 0 && (
						<div className="mt-2">
							<Attachments items={post.attachments} />
						</div>
					)}
					<div className="sm:w-[500px] flex justify-between mt-2 items-center flex-wrap">
						<div className="transition duration-200 rounded-full p-1 hover:bg-zinc-700 hover:bg-opacity-20 flex items-center gap-2 cursor-pointer">
							<FaArrowsRotate className="text-zinc-500" />
							<p className="text-sm text-zinc-500 font-semibold text-zinc-500 select-none">{post.reposts.length}</p>
						</div>
						<div onClick={liked ? removeLikePost : likePost} className="transition duration-200 rounded-full p-1 hover:bg-zinc-700 hover:bg-opacity-20 flex items-center gap-2 cursor-pointer">
							{liked ? (
								<FaHeart className="text-pink-500" />
							) : (
								<FaRegHeart className="text-zinc-500" />
							)}
							<p className={`text-sm ${liked ? "text-pink-500" : "text-zinc-500"} select-none font-semibold text-zinc-500`}>{likeCount}</p>
						</div>
						<div className="relative">
							<div onClick={() => setPostDropdownOpen(prev => !prev)} className="transition duration-200 rounded-full p-1 hover:bg-zinc-700 hover:bg-opacity-20 cursor-pointer">
								<IoEllipsisVerticalSharp className="text-zinc-500" />
							</div>
							{postDropdownOpen && <PostDropdownActions me={me} />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

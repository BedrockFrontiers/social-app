"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment, FaArrowsRotate } from "react-icons/fa6";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { TbRating18Plus } from "react-icons/tb";
import moment from "moment";
import getVerifiedLevelName from "@/shared/utils/user/get-verified-level-name-util";
import BuzzText from "@/presentation/components/UI/BuzzText";
import Link from "next/link";
import Image from "next/image";
import PostDropdownActions from "@/presentation/components/UI/Post/PostDropdownActions";
import Attachments from "@/presentation/components/Media/Attachments";

export default function Post({ post, me, hasLiked = false, hasReposted = false, useRepostIndication = false }) {
  const [postDropdownOpen, setPostDropdownOpen] = useState(false);
  const [liked, setLiked] = useState(hasLiked);
  const [reposted, setReposted] = useState(hasReposted);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [repostCount, setRepostCount] = useState(post.reposts.length);
  const [showNSFW, setShowNSFW] = useState(!post.nsfw);
  const verifiedName = getVerifiedLevelName(post.author.verified);
  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [isLoadingRepost, setIsLoadingRepost] = useState(false);

  async function likePost() {
    if (!me || isLoadingLike) return;
    setIsLoadingLike(true);
    try {
      const req = await fetch("/api/services/posts/like", {
        method: "POST",
        headers: {
          Authorization: `G-ID ${me.prisma.gid}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post.id }),
      });

      if (req.ok) {
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } finally {
      setIsLoadingLike(false);
    }
  }

  async function removeLikePost() {
    if (!me || isLoadingLike) return;
    setIsLoadingLike(true);
    try {
      const req = await fetch("/api/services/posts/like", {
        method: "DELETE",
        headers: {
          Authorization: `G-ID ${me.prisma.gid}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post.id }),
      });

      if (req.ok) {
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    } finally {
      setIsLoadingLike(false);
    }
  }

  async function addRepost() {
    if (!me || isLoadingRepost) return;
    setIsLoadingRepost(true);
    try {
      const req = await fetch("/api/services/repost", {
        method: "POST",
        headers: {
          Authorization: `G-ID ${me.prisma.gid}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post.id }),
      });

      if (req.ok) {
        setReposted(true);
        setRepostCount((prev) => prev + 1);
      }
    } finally {
      setIsLoadingRepost(false);
    }
  }

  async function removeRepost() {
    if (!me || isLoadingRepost) return;
    setIsLoadingRepost(true);
    try {
      const req = await fetch("/api/services/repost", {
        method: "DELETE",
        headers: {
          Authorization: `G-ID ${me.prisma.gid}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post.id }),
      });

      if (req.ok) {
        setReposted(false);
        setRepostCount((prev) => prev - 1);
      }
    } finally {
      setIsLoadingRepost(false);
    }
  }

  return (
    <div className="relative p-4">
      <div className="flex gap-4">
        <Link href={`/profile/${post.author.identifier}`} className="h-[40px] w-[40px] flex-shrink-0">
          <Image
            className="rounded-full select-none w-[40px] h-[40px]"
            src={post.author.avatarUrl}
            width={40}
            height={40}
            quality={100}
            alt="Profile Picture"
          />
        </Link>
        <div className="relative w-[88vw] sm:w-[500px]">
          {useRepostIndication && (
            <div className="flex items-center gap-2">
              <FaArrowsRotate className="text-zinc-500 text-xs" />
              <p className="text-xs font-semibold text-zinc-500 max-w-[130px] truncate">Reposted</p>
            </div>
          )}
          <div className="flex items-center gap-1 flex-wrap">
            <div className="flex items-center  gap-1">
              <Link href={`/profile/${post.author.identifier}`} className="text-sm font-bold cursor-pointer transition duration-200 hover:underline max-w-[130px] truncate">
                {post.author.name}
              </Link>
              {verifiedName.length > 0 && (
                <Image className="select-none" src={`/badges/${verifiedName}.png`} width={20} height={20} alt="Verified" />
              )}
              <p className="text-sm font-semibold text-zinc-500 max-w-[130px] truncate">{post.author.identifier}</p>
            </div>
            <span className="text-zinc-500">·</span>
            <p className="text-xs font-semibold text-zinc-500">{moment(post.createdAt).fromNow()}</p>
          </div>

          {post.nsfw && !showNSFW ? (
            <div className="mt-1">
              <p className="text-red-500 text-sm font-bold flex items-center gap-2">
              	<TbRating18Plus size={20} />
              	NSFW Content
              </p>
              <p className="text-xs text-zinc-500 mt-1">
              	This content is marked as NSFW (Not Safe For Work) to protect users from viewing potentially explicit or sensitive material without prior consent. The NSFW filter ensures that users have control over their experience, allowing them to choose whether or not to view content that may be inappropriate for certain settings, such as work environments or around minors. By clicking &apos;Show this content,&apos; you acknowledge and accept the nature of this material and take responsibility for your viewing experience.
              </p>
              <button
                onClick={() => setShowNSFW(true)}
                className="bg-red-500 text-sm text-white p-2 mt-2 transition duration-200 hover:bg-red-600 rounded">
                Show this content.
              </button>
            </div>
          ) : (
            <div>
              <Link href={`/posts/${post.id}`} className="mt-1">
                <div className="text-sm">
                  <BuzzText content={post.content} />
                </div>
              </Link>
              {post.attachments.length > 0 && (
                <div className="mt-2">
                  <Attachments items={post.attachments} />
                </div>
              )}
            </div>
          )}

          <div className="sm:w-[500px] flex justify-between mt-2 items-center flex-wrap">
          	<div className="transition duration-200 rounded-full p-1 hover:bg-zinc-700 hover:bg-opacity-20 flex items-center gap-2 cursor-pointer">
              <FaRegComment className="text-zinc-500" />
              <p className="text-sm text-zinc-500 font-semibold text-zinc-500 select-none">{post.comments.length}</p>
            </div>
            <div onClick={reposted ? removeRepost : addRepost} className="transition duration-200 rounded-full p-1 hover:bg-zinc-700 hover:bg-opacity-20 flex items-center gap-2 cursor-pointer">
              {reposted ? (
                <FaArrowsRotate className="text-green-500" />
              ) : (
                <FaArrowsRotate className="text-zinc-500" />
              )}
              <p className="text-sm text-zinc-500 font-semibold text-zinc-500 select-none">{repostCount}</p>
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
              <div onClick={() => setPostDropdownOpen((prev) => !prev)} className="transition duration-200 rounded-full p-1 hover:bg-zinc-700 hover:bg-opacity-20 cursor-pointer">
                <IoEllipsisVerticalSharp className="text-zinc-500" />
              </div>
              {postDropdownOpen && <PostDropdownActions me={me} post={post} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

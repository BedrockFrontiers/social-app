"use client";

import { useState, useEffect, useRef } from "react";
import { FaHeart, FaRegHeart, FaRegComment, FaArrowsRotate } from "react-icons/fa6";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { TbRating18Plus } from "react-icons/tb";
import moment from "moment";
import getVerifiedLevelName from "@/shared/utils/user/get-verified-level-name-util";
import BuzzText from "@/presentation/components/UI/BuzzText";
import Link from "next/link";
import Image from "next/image";
import PostDropdownActions from "@/presentation/components/UI/Post/PostDropdownActions";
import NewCommentScreen from "@/presentation/components/Screens/NewCommentScreen";
import Attachments from "@/presentation/components/Media/Attachments";

export default function PagePost({ post, me, isLiked = false }) {
  const [isOpenNewCommentScreen, setIsOpenNewCommentScreen] = useState(false);
  const [postDropdownOpen, setPostDropdownOpen] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [showNSFW, setShowNSFW] = useState(!post.nsfw);
  const verifiedName = getVerifiedLevelName(post.author.verified);

  async function likePost() {
    if (!me) return;
    const req = await fetch("/api/services/posts/like", {
      method: "POST",
      headers: {
        Authorization: `G-ID ${me.prisma.gid}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post.id,
      }),
    });

    setLiked(true);
    setLikeCount((prev) => prev + 1);
  }

  async function removeLikePost() {
    if (!me) return;
    const req = await fetch("/api/services/posts/like", {
      method: "DELETE",
      headers: {
        Authorization: `G-ID ${me.prisma.gid}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post.id,
      }),
    });

    setLiked(false);
    setLikeCount((prev) => prev - 1);
  }

  return (
    <div className="relative">
      <div className="p-4">
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
            <div className="flex-wrap">
              <div className="flex items-center  gap-1">
                <Link href={`/profile/${post.author.identifier}`} className="text-sm font-bold cursor-pointer transition duration-200 hover:underline max-w-[130px] truncate">
                  {post.author.name}
                </Link>
                {verifiedName.length > 0 && (
                  <Image className="select-none" src={`/badges/${verifiedName}.png`} width={20} height={20} alt="Verified" />
                )}
              </div>
              <p className="text-sm font-semibold text-zinc-500 max-w-[130px] truncate">{post.author.identifier}</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          {post.nsfw && !showNSFW ? (
            <div className="mt-1">
              <p className="text-red-500 text-sm font-bold flex items-center gap-2">
                <TbRating18Plus size={20} />
                NSFW Content
              </p>
              <p className="text-xs text-zinc-600 mt-1">
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
              <div className="mt-1">
                <div className="text-sm">
                  <BuzzText content={post.content} />
                </div>
              </div>
              {post.attachments.length > 0 && (
                <div className="mt-2">
                  <Attachments items={post.attachments} />
                </div>
              )}
            </div>
          )}
          <hr className="themed-border mt-5" />
          <div className="my-2">
            <p className="text-xs font-semibold text-zinc-500">{moment(post.createdAt).format("MMMM D, YYYY [at] h:mm A")}</p>
          </div>
          <hr className="themed-border" />
          <div className="flex justify-between mt-2 items-center flex-wrap">
            <div className="transition duration-200 rounded-full p-1 hover:bg-zinc-700 hover:bg-opacity-20 flex items-center gap-2 cursor-pointer">
              <FaRegComment className="text-zinc-500" />
              <p className="text-sm text-zinc-500 font-semibold text-zinc-500 select-none">{post.comments.length}</p>
            </div>
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
              <div onClick={() => setPostDropdownOpen((prev) => !prev)} className="transition duration-200 rounded-full p-1 hover:bg-zinc-700 hover:bg-opacity-20 cursor-pointer">
                <IoEllipsisVerticalSharp className="text-zinc-500" />
              </div>
              {postDropdownOpen && <PostDropdownActions me={me} post={post} />}
            </div>
          </div>
        </div>
      </div>
      {me && (
        <div>
          <hr className="themed-border" />
          <div onClick={() => setIsOpenNewCommentScreen(true)} className="p-4 flex items-center gap-2 cursor-pointer">
            <div className="w-[40px] h-[40px]">
              <Image
                className="rounded-full select-none w-[40px] h-[40px]"
                src={me.prisma.avatarUrl}
                width={40}
                height={40}
                quality={100}
                alt="Profile Picture"
              />
            </div>
            <p>Write your reply</p>
          </div>
          {isOpenNewCommentScreen && (<NewCommentScreen me={me} post={post} onClose={() => setIsOpenNewCommentScreen(false)} />)}
        </div>
      )}
    </div>
  );
}

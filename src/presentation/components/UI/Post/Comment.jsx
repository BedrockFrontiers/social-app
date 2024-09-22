"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa6";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import moment from "moment";
import getVerifiedLevelName from "@/shared/utils/user/get-verified-level-name-util";
import BuzzText from "@/presentation/components/UI/BuzzText";
import Link from "next/link";
import Image from "next/image";
import CommentDropdownActions from "@/presentation/components/UI/Post/CommentDropdownActions";
import Attachments from "@/presentation/components/Media/Attachments";

export default function Comment({ me, comment, hasLiked = false, linkable = true }) {
  const [liked, setLiked] = useState(hasLiked);
  const [likeCount, setLikeCount] = useState(comment.likes.length);
  const [commentDropdownOpen, setCommentDropdownOpen] = useState(false);
  const verifiedName = getVerifiedLevelName(comment.author.verified);

  async function likeComment() {
    if (!me) return;
    const req = await fetch("/api/services/posts/comment/like", {
      method: "POST",
      headers: {
        Authorization: `G-ID ${me.prisma.gid}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId: comment.id,
      }),
    });

    setLiked(true);
    setLikeCount((prev) => prev + 1);
  }

  async function removeLikeComment() {
    if (!me) return;
    const req = await fetch("/api/services/posts/comment/like", {
      method: "DELETE",
      headers: {
        Authorization: `G-ID ${me.prisma.gid}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId: comment.id,
      }),
    });

    setLiked(false);
    setLikeCount((prev) => prev - 1);
  }

  return (
    <div className="relative">
      <div className="flex gap-4">
        <Link href={`/profile/${comment.author.identifier}`} className="h-[40px] w-[40px] flex-shrink-0">
          <Image
            className="rounded-full select-none w-[40px] h-[40px]"
            src={comment.author.avatarUrl}
            width={40}
            height={40}
            quality={100}
            alt="Profile Picture"
          />
        </Link>
        <div className="relative w-[88vw] sm:w-[500px]">
          <div className="flex items-center gap-1 flex-wrap">
            <div className="flex items-center  gap-1">
              <Link href={`/profile/${comment.author.identifier}`} className="text-sm font-bold cursor-pointer transition duration-200 hover:underline max-w-[130px] truncate">
                {comment.author.name}
              </Link>
              {verifiedName.length > 0 && (
                <Image className="select-none" src={`/badges/${verifiedName}.png`} width={20} height={20} alt="Verified" />
              )}
              <p className="text-sm font-semibold text-zinc-500 max-w-[130px] truncate">{comment.author.identifier}</p>
            </div>
            <span className="text-zinc-500">·</span>
            <p className="text-xs font-semibold text-zinc-500">{moment(comment.createdAt).fromNow()}</p>
          </div>
          <div>
            <div className="mt-1">
              {linkable ? (
                <Link href={`/comment/${comment.id}`} className="text-sm">
                  <BuzzText content={comment.content} />
                </Link>
              ) : (
                <div className="text-sm">
                  <BuzzText content={comment.content} />
                </div>
              )}
            </div>
            {comment.attachments.length > 0 && (
              <div className="mt-2">
                <Attachments items={comment.attachments} />
              </div>
            )}
          </div>
          <div className="sm:w-[500px] flex justify-between mt-2 items-center flex-wrap">
            <div className="transition duration-200 rounded-full p-1 hover:bg-zinc-700 hover:bg-opacity-20 flex items-center gap-2 cursor-pointer">
              <FaRegComment className="text-zinc-500" />
              <p className="text-sm text-zinc-500 font-semibold text-zinc-500 select-none">{comment.replies.length}</p>
            </div>
            <div onClick={liked ? removeLikeComment : likeComment} className="transition duration-200 rounded-full p-1 hover:bg-zinc-700 hover:bg-opacity-20 flex items-center gap-2 cursor-pointer">
              {liked ? (
                <FaHeart className="text-pink-500" />
              ) : (
                <FaRegHeart className="text-zinc-500" />
              )}
              <p className={`text-sm ${liked ? "text-pink-500" : "text-zinc-500"} select-none font-semibold text-zinc-500`}>{likeCount}</p>
            </div>
            <div className="relative">
              <div onClick={() => setCommentDropdownOpen((prev) => !prev)} className="transition duration-200 rounded-full p-1 hover:bg-zinc-700 hover:bg-opacity-20 cursor-pointer">
                <IoEllipsisVerticalSharp className="text-zinc-500" />
              </div>
              {commentDropdownOpen && <CommentDropdownActions me={me} comment={comment} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
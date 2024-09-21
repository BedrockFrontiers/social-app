"use client";

import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function CommentDropdownActions({ me, comment }) {
  const router = useRouter();

  async function handleDeletePost() {
    await fetch("/api/services/posts/comment", {
      method: "DELETE",
      headers: {
        "Authorization": `G-ID ${me.prisma.gid}`
      },
      body: JSON.stringify({
        commentId: comment.id
      })
    });

    router.refresh();
  }

  return (
    <div className="absolute bottom-full mb-2 max-lg:left-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 z-50 bg-white dark:bg-black themed-border rounded-lg min-h-[50px] w-[150px]">
      {comment.author.gid === me?.prisma.gid && (
        <p onClick={handleDeletePost} className="text-sm font-semibold select-none text-red-500 flex items-center gap-2 p-4 cursor-pointer hover:bg-red-100 dark:hover:bg-zinc-700 rounded-lg">
          <FaRegTrashAlt />
          Delete Comment
        </p>
      )}
    </div>
  );
}

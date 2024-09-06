"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SidebarItem({ url, icon: Icon, text }) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link href={url} className={`flex items-center gap-3 cursor-pointer p-2 rounded-full transition duration-200 ${isActive ? "sm:bg-white dark:sm:bg-zinc-700 sm:shadow-sm max-[640px]:bg-gray-200 dark:max-[640px]:bg-zinc-800" : "sm:hover:bg-gray-200 dark:sm:hover:bg-zinc-800 max-[640px]:hover:bg-white dark:max-[640px]:hover:bg-zinc-800"}`}>
      <Icon className="text-black dark:text-white" />
      <h3 className={`text-md text-gray-800 dark:text-white font-semibold select-none max-[1000px]:hidden max-[1000px]:w-0`}>{text}</h3>
    </Link>
  );
}
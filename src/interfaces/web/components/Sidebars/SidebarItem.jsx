"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SidebarItem({ url, icon: Icon, text }) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link href={url} className={`flex items-center gap-3 cursor-pointer p-2 rounded-full transition duration-200 ${isActive ? "lg:bg-white dark:lg:bg-zinc-700 lg:shadow-sm max-lg:bg-gray-200 dark:max-lg:bg-zinc-800" : "lg:hover:bg-gray-200 dark:lg:hover:bg-zinc-800"}`}>
      <Icon className="text-black dark:text-white" />
      <h3 className={`text-md text-gray-800 dark:text-white font-semibold select-none max-lg:hidden max-lg:w-0`}>{text}</h3>
    </Link>
  );
}
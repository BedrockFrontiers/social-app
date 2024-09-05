"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SidebarItem({ url, svg: SvgIcon, svgFilled: SvgIconFilled, text }) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link href={url} className={`flex items-center gap-3 cursor-pointer p-2 rounded-full transition duration-200 ${isActive ? "sm:bg-white sm:shadow-sm max-[640px]:bg-gray-200" : "sm:hover:bg-gray-200 max-[640px]:hover:bg-white"}`}>
      {isActive ? <SvgIconFilled width={25} height={25} /> : <SvgIcon width={25} height={25} /> }
      <h3 className={`text-md text-gray-800 font-semibold select-none max-[1000px]:hidden max-[1000px]:w-0`}>{text}</h3>
    </Link>
  );
}
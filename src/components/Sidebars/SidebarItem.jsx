/**
 * SidebarItem Component
 * 
 * This component renders an individual item for sidebar navigation, including
 * an icon and a text label. It highlights the active item based on the current
 * URL path and applies different styles when hovered or active, with support for
 * light and dark themes.
 * 
 * Features:
 * - Highlights the current item if the `url` matches the current path (`pathname`).
 * - Responsive styles: hides the text label on smaller screens, showing only the icon.
 * - Styles are adjusted for light and dark themes and include hover effects.
 * 
 * Usage:
 * <SidebarItem url="/home" icon={HomeIcon} text="Home" />
 * 
 * @param {object} props - The props for the component.
 * @param {string} props.url - The target URL for the navigation item.
 * @param {React.Component} props.icon - The icon component to be displayed next to the text.
 * @param {string} props.text - The label text to be displayed next to the icon.
 * 
 * @returns {JSX.Element} The rendered sidebar item component.
 */

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
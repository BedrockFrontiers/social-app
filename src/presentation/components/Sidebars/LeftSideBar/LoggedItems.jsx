"use client";

import { useState } from "react";
import NewPostScreen from "@/presentation/components/Screens/NewPostScreen";
import SidebarItem from "@/presentation/components/Sidebars/SidebarItem";
import listSidebarItems from "@/data/listSidebarItems";

export default function LoggedItems({ me }) {
  const [isOpenNewPostScreen, setIsOpenNewPostScreen] = useState(false);
  return (
    <>
      {listSidebarItems.map((item) => (
        <SidebarItem
          key={item.url}
          url={item.url}
          icon={item.icon}
          text={item.text}
        />
      ))}
      <div className="mt-auto">
        <button onClick={() => setIsOpenNewPostScreen(true)} className="p-2 max-lg:p-3 w-full rounded-full font-bold bg-blue-500 text-white transition duration-200 hover:opacity-90">
          <p className="select-none text-sm text-center">
            New Tide
          </p>
        </button>
        {isOpenNewPostScreen && (<NewPostScreen me={me} onClose={() => setIsOpenNewPostScreen(false)} />)}
      </div>
    </>
  );
}
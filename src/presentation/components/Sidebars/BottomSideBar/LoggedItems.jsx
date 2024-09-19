"use client";

import { useState } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import NewPostScreen from "@/presentation/components/Screens/NewPostScreen";
import SidebarItem from "@/presentation/components/Sidebars/SidebarItem";
import listSidebarItems from "@/data/listSidebarItems";

export default function LoggedItems({ me }) {
  const [isOpenNewPostScreen, setIsOpenNewPostScreen] = useState(false);

  return (
    <>
      <div className="fixed h-[max-content] z-10 bottom-[80px] right-4">
        <div onClick={() => setIsOpenNewPostScreen(true)} className="text-white bg-blue-500 p-2 rounded-full cursor-pointer">
          <HiMiniPencilSquare size={25} />
        </div>
      </div>
      {listSidebarItems.map((item) => (
        <SidebarItem
          key={item.url}
          url={item.url}
          icon={item.icon}
          text={item.text}
        />
      ))}
      {isOpenNewPostScreen && (<NewPostScreen me={me} onClose={() => setIsOpenNewPostScreen(false)} />)}
    </>
  );
}
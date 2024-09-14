import SidebarItem from "@/presentation/components/Sidebars/SidebarItem";
import listSidebarItems from "@/data/listSidebarItems";

export default function LoggedItems() {
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
    </>
  );
}
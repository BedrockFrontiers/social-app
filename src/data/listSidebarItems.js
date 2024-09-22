import { FaHouse, FaCompass, FaBell, FaHashtag, FaUser, FaGear } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";

const listSidebarItems = [
  { url: "/", icon: FaHouse, text: "Home" },
  { url: "/explore", icon: FaCompass, text: "Explore" },
  { url: "/notifications", icon: FaBell, text: "Notifications" },
  { url: "/messages", icon: AiFillMessage, text: "Messages" },
  { url: "/feeds", icon: FaHashtag, text: "Feeds" },
  { url: "/profile/@me", icon: FaUser, text: "Profile" },
  { url: "/settings", icon: FaGear, text: "Settings" },
];

export default listSidebarItems;
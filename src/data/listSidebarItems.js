import HomeIcon from "/public/icons/home.svg";
import HomeFilledIcon from "/public/icons/filled/home.svg";
import ExploreIcon from "/public/icons/explore.svg";
import ExploreFilledIcon from "/public/icons/filled/explore.svg";
import NotificationsIcon from "/public/icons/notifications.svg";
import NotificationsFilledIcon from "/public/icons/filled/notifications.svg";
import FeedsIcon from "/public/icons/feeds.svg";
import ProfileIcon from "/public/icons/profile.svg";
import ProfileFilledIcon from "/public/icons/filled/profile.svg";
import SettingsIcon from "/public/icons/settings.svg";
import SettingsFilledIcon from "/public/icons/filled/settings.svg";

const listSidebarItems = [
  { url: "/", svg: HomeIcon, svgFilled: HomeFilledIcon, text: "Home" },
  { url: "/explore", svg: ExploreIcon, svgFilled: ExploreFilledIcon, text: "Explore" },
  { url: "/notifications", svg: NotificationsIcon, svgFilled: NotificationsFilledIcon, text: "Notifications" },
  { url: "/feeds", svg: FeedsIcon, svgFilled: FeedsIcon, text: "Feeds" },
  { url: "/profile/@filipotop.tidal.social", svg: ProfileIcon, svgFilled: ProfileFilledIcon, text: "Profile" },
  { url: "/settings", svg: SettingsIcon, svgFilled: SettingsFilledIcon, text: "Settings" },
];

export default listSidebarItems;
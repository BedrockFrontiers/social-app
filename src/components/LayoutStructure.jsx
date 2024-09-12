/**
 * LayoutStructure component responsible for managing the layout of the application, 
 * including conditional rendering of sidebars and loading screen based on the current route.
 * 
 * The component renders:
 * - A top loader (`NextTopLoader`) to indicate loading progress.
 * - A loading screen (`LoadingScreen`) only if the user is not on authentication routes (`/auth/signin` or `/auth/signout`).
 * - A left sidebar (`LeftSideBar`) and right sidebar (`RightSideBar`), also hidden on authentication routes.
 * - The main content area wrapped in a `ThemeProvider` for theme management.
 * 
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The children components to be rendered inside the main content area.
 * 
 * @returns {JSX.Element} The JSX layout structure.
 * 
 * Behavior:
 * - If the user is on `/auth/signin` or `/auth/signout`, the sidebars and loading screen are hidden.
 * - The main content area will always be rendered.
 */


"use client";

import NextTopLoader from "nextjs-toploader";
import LoadingScreen from "@/components/Screens/LoadingScreen";
import BottomSideBar from "@/components/Sidebars/BottomSideBar";
import LeftSideBar from "@/components/Sidebars/LeftSideBar";
import RightSideBar from "@/components/Sidebars/RightSideBar";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

export default function LayoutStructure({ user, children }) {
  const pathname = usePathname();
  const hideSidebars = pathname === "/auth/signin" || pathname === "/auth/signup"; //we will implement this in a better way in the very near future (probably we'll not, but I just want to let you know that we know this isnt the best way!!)

	return (
		<>
			<NextTopLoader showSpinner={false} zIndex="9999" />
			{!hideSidebars && <LeftSideBar user={user} />}
			
			<div className="bg-transparent flex-1 lg:pl-4 max-lg:pl-0 min-h-screen">
			  <ThemeProvider defaultTheme="light" attribute="class">
			    {children}
			    {!hideSidebars && (
			    	<div className="lg:hidden min-h-[50px] max-[1089px]:visible">
			    	  <BottomSideBar user={user} />
			    	</div>
			    )}
			  </ThemeProvider>
			</div>
			{!hideSidebars && (
			  <div className="pt-4 max-lg:pt-4">
			    <RightSideBar />
			  </div>
			)}
		</>
	);
}
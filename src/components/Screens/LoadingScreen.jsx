/**
 * LoadingScreen Component
 * 
 * This component displays a full-screen loading overlay for 3 seconds before
 * disappearing. It uses a logo image as a loading indicator. The overlay is
 * shown on top of the page content and hides automatically after the timeout.
 * 
 * State:
 * - loaded (boolean): Determines if the loading screen should be displayed
 *   or not. Initially false and changes to true after 3 seconds.
 * 
 * Effects:
 * - A `useEffect` hook starts a timer when the component is mounted, setting
 *   `loaded` to true after 3 seconds. The timer is cleared when the component
 *   is unmounted.
 * 
 * Usage:
 * <LoadingScreen />
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoadingScreen() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoaded(true);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			{!loaded && (
				<div className="z-[9999] fixed top-0 left-0 w-full h-full bg-gray-100 dark:bg-black flex items-center justify-center">
					<Image className="select-none" src="/icon.png" width={100} height={100} alt="Social App Logo" />
				</div>
			)}
		</div>
	);
}
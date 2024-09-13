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
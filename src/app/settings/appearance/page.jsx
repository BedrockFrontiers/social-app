"use client";

import { useTheme } from "next-themes";
import { FaCircleCheck } from "react-icons/fa6";
import MainStructure from "@/components/MainStructure";

export default function AppearanceSettings() {
	const { theme, setTheme } = useTheme();

	return (
		<MainStructure>
			<div className="p-4 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
				<h3 className="select-none font-bold text-xl">Settings (Appearance)</h3>
			</div>
			<div className="p-4 mt-5">
				<p>The current theme is: {theme}</p>
				<div className="relative flex flex-col gap-1 items-start mt-5">
					<div onClick={() => setTheme("light")} className={`absolute bg-white rounded-full p-[30px] ${theme === "light" && "border-2 border-blue-500"}`}>
						{theme === "light" && (
							<FaCircleCheck size={25} className="absolute top-0 right-0 text-blue-500" />
						)}
					</div>
					<div onClick={() => setTheme("dark")} className={`absolute bg-zinc-700 rounded-full p-[30px] ${theme === "dark" && "border-2 border-blue-500"}`}>
						{theme === "dark" && (
							<FaCircleCheck size={25} className="absolute top-0 right-0 text-blue-500" />
						)}
					</div>
				</div>
			</div>
		</MainStructure>
	);
}
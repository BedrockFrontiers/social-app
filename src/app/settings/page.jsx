import Link from "next/link";
import MainStructure from "@/components/MainStructure";
import { FaBrush } from "react-icons/fa6";

export default function ProfileSettings() {
	return (
		<MainStructure>
			<div className="p-4 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
				<h3 className="select-none font-bold text-xl">Settings</h3>
			</div>
			<div className="p-4 mt-5 h-full">
				<p className="font-semibold text-md select-none">Basics</p>
				<div className="mt-5" >
					<Link className="flex items-center gap-2 w-[max-content]" href="/settings/appearance">
						<div className="bg-black bg-opacity-15 p-3 rounded-full">
							<FaBrush />
						</div>
						appearance
					</Link>
				</div>
				<div className="absolute left-0 bottom-0 px-4">
					<span className="text-zinc-300 dark:text-zinc-700 text-xs">Working to improve settings better.</span>
				</div>
			</div>
		</MainStructure>
	);
}
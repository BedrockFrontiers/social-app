import Link from "next/link";

export default function SettingItem({ icon: Icon, content, url }) {
	return (
		<Link className="flex items-center gap-2 w-[max-content]" href={url}>
			<div className="bg-gray-200 dark:bg-zinc-800 p-3 rounded-full">
				{ Icon }
			</div>
			{ content }
		</Link>
	);
}
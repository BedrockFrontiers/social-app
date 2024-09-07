import Image from "next/image";
import ViewProfileActions from "@/components/Profile/ViewProfileActions";
import MediaModal from "../Media/MediaModal";

export default function ProfileCard({ className }) {
	return (
		<div className={`absolute shadow-xl z-10 bg-white dark:bg-zinc-950 min-h-[300px] w-[93vw] sm:w-[400px] rounded-xl border border-gray-200 dark:border-zinc-800 ${className}`}>
			<div className="relative z-0 min-h-[100px]">
				<Image className="rounded-t-xl object-cover select-none" src="https://cdn.bsky.app/img/banner/plain/did:plc:bokcpbnh774esg2ufsuv5pll/bafkreiaonxfzhryxgw2ixodpen5kfqo3fmu362h36t7qizjznmdacqvxci@jpeg" fill={true} alt="Profile Banner" />
			</div>
			<div className="relative">
				<div className="flex justify-between p-4">
					<div>
						<Image
							className="rounded-full -mt-10 select-none"
							src="https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:bokcpbnh774esg2ufsuv5pll/bafkreib77mjbyizqewnkoyjgyhrg42l2zhr2vw4x2spxp6nr6mrvcrlpmi@jpeg"
							width={80}
							height={80}
							alt="Profile Picture"
						/>
					</div>
					<div>
						<ViewProfileActions />
					</div>
				</div>
				<div className="-mt-5 p-4">
					<div>
						<div className="flex items-center gap-1">
							<p id="user:name" className="text-md font-bold cursor-pointer transition duration-200 hover:underline w-[max-content]">LINE</p>
							<Image
								id="user:verified"
								className="select-none"
								src="/badges/verified.png"
								width={20}
								height={20}
								alt="Verified"
							/>
						</div>
						<p id="user:identifier" className="text-md font-semibold text-zinc-500 max-w-[130px] truncate">@lineshark</p>
					</div>
					<div className="flex mt-3 gap-4">
						<span className="text-gray-700 transition duration-200 hover:underline cursor-pointer dark:text-zinc-400 text-sm"><strong>224M</strong> followers</span>
						<span className="text-gray-700 transition duration-200 hover:underline cursor-pointer dark:text-zinc-400 text-sm"><strong>1.805</strong> following</span>
						<span className="text-gray-700 dark:text-zinc-400 text-sm"><strong>5.664</strong> posts</span>
					</div>
					<div className="mt-5">
						<p className="text-sm">
							🩸Artist🩸<br/>
							🦇Dracula enthusiast🦇<br/>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
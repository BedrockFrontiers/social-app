import Image from "next/image";
import Post from "@/interfaces/web/components/Post";
import ViewProfileActions from "@/interfaces/web/components/Profile/ViewProfileActions";
import MainStructure from "@/interfaces/web/components/MainStructure";
import MediaModal from "@/interfaces/web/components/Media/MediaModal";
import getUserAccount from "@/shared/utils/getUserAccount";
import accountCache from "@/shared/utils/accountCache";
import getVerifiedLevelName from "@/shared/utils/getVerifiedLevelName";
import { BsFillPrinterFill } from "react-icons/bs";

export default async function Profile({ params }) {
	const identifier = decodeURIComponent(params.identifier);
	const me = await accountCache();
	let user = await getUserAccount(identifier);

	if (!user)
		return (
			<MainStructure className="p-4">
				<p className="text-sm">Account <strong>{identifier}</strong> doesn&apos;t exist.</p>
				<p className="text-sm">Probably the format of identifier is wrong, e.g. (@fulano)</p>
				<p className="text-sm">Or really this account is deleted, inactive or not created yet.</p>
			</MainStructure>
		);

	if (identifier === "@me")
		user = user.prisma;

	const verifiedName = getVerifiedLevelName(user.verified);

	const posts = {
	  post1: {
	    "username": "datcravat クラバット🍷",
	    "identifier": "@datcravat",
	    "profileImage": "https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:knkltoiapkt336rr335ztt3p/bafkreie4jefbhqhnhh5gm4w335tkurvbwxa2orcfb4lcw7zvdikpm4onl4@jpeg",
	    "content": "💕",
	    "attachments": ["https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:knkltoiapkt336rr335ztt3p/bafkreicbfna23ghip366e65pwk7lomsfvgq2enywclwt4wrvg5k6x6gk5a@jpeg"],
	    "uploadedAt": "7d",
	    "likes": "2K",
	    "reposts": "575",
	    "comments": "25",
	    "verified": 1,
	    "reposted": true
	  },
	  post2: {
	    "username": "LINE",
	    "identifier": "@lineshark",
	    "profileImage": "https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:bokcpbnh774esg2ufsuv5pll/bafkreib77mjbyizqewnkoyjgyhrg42l2zhr2vw4x2spxp6nr6mrvcrlpmi@jpeg",
	    "content": '',
	    "attachments": ["https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:bokcpbnh774esg2ufsuv5pll/bafkreigsc6uaxkz4ifivzmigt2n2y4tzehctroppqsxo2fflsq6pyjkxha@jpeg"],
	    "uploadedAt": "6d",
	    "likes": "2K",
	    "reposts": "441",
	    "comments": "9",
	    "verified": 1,
	    "reposted": true
	  },
	  post3: {
	    "username": "Pablo .",
	    "identifier": "@pablosinistro",
	    "profileImage": "https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:mcj4fbvybjqnmzmy6o2wvozp/bafkreicad7svkswyknyrukcaajhptawaamc7siqkxyrz2rnmjnoemgcsiy@jpeg",
	    "content": "MF DOOM *drop the mic*",
	    "attachments": ["https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:mcj4fbvybjqnmzmy6o2wvozp/bafkreih5weuxqqw7lsxuk7d6nnhllbq6cc5ejjidpmy5rptridom2w4fzq@jpeg"],
	    "uploadedAt": "7d",
	    "likes": "109",
	    "reposts": "27",
	    "comments": "6",
	    "verified": 2,
	    "reposted": true
	  }
	}
	return (
		<MainStructure>
			<div>
				<div className={`relative min-h-[200px] ${!user.bannerUrl && "bg-blue-500"}`}>
					{user.bannerUrl && (<MediaModal className="rounded-l-t-xl object-cover select-none cursor-pointer" quality={100} src={user.bannerUrl} fill={true} alt="Profile Banner" />)}				
				</div>
				<div className="relative border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-black">
					<div className="px-4">
						<div className="flex max-lg:flex-col gap-3">
							<div className="z-10 -mt-10 flex justify-between">
								<div>
									<MediaModal className="relative rounded-full object-cover select-none cursor-pointer" src={user.avatarUrl} width={150} height={150} quality={100} alt="Profile Picture" />
								</div>
								<div className="lg:hidden mt-[60px]">
									<ViewProfileActions user={user} me={me} />
								</div>
							</div>
							<div className="mt-2 w-full">
								<div className="flex gap-4 w-full items-center max-lg:items-start justify-between">
									<div>
										<div className="flex items-center gap-4">
											<h3 className="font-bold text-gray-800 dark:text-white text-2xl">{user.name}</h3>
											{verifiedName.length > 0 && (<Image className="select-none" src={`/badges/${verifiedName}.png`} width={25} height={25} alt={verifiedName} />)}
										</div>
										<p className="text-sm font-semibold text-zinc-500">{user.identifier}</p>
									</div>
									<div className="lg:visible max-lg:hidden">
										<ViewProfileActions user={user} me={me} />
									</div>
								</div>
								<div className="flex mt-3 max-lg:mt-2 gap-4">
									<span className="text-gray-700 transition duration-200 hover:underline cursor-pointer dark:text-white text-sm"><strong>{user.followers.length}</strong> followers</span>
									<span className="text-gray-700 transition duration-200 hover:underline cursor-pointer dark:text-white text-sm"><strong>{user.following.length}</strong> following</span>
									<span className="text-gray-700 dark:text-white text-sm"><strong>{user.posts.length}</strong> posts</span>
								</div>
							</div>
						</div>
						<div className="mt-3">
							<div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 w-full">
								<h3 className="text-xs text-zinc-600 font-bold select-none border-b border-gray-200 dark:border-zinc-800">About Me</h3>
								<div className="mt-5">
									<p className="text-sm">{user.bio || "Nothing about me."}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex px-4 mt-10 flex-wrap gap-2 items-center mt-auto">
						<p className="font-semibold select-none text-sm p-2 transition duration-200 hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer border-b-4 border-blue-500">Tides</p>
						<p className="font-semibold text-zinc-500 select-none text-sm p-2 transition duration-200 hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer">Replies</p>
					</div>
				</div>
				<div>
					
				</div>
			</div>
		</MainStructure>
	);
}

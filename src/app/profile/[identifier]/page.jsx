import Image from "next/image";
import Post from "@/components/Post";
import ViewProfileActions from "@/components/Profile/ViewProfileActions";
import MainStructure from "@/components/MainStructure";
import MediaModal from "@/components/Media/MediaModal";
import { BsFillPrinterFill } from "react-icons/bs";

export default function Profile({ params }) {
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
				<div className="relative min-h-[200px]">
					<MediaModal className="rounded-l-t-xl object-cover select-none cursor-pointer" src="https://cdn.bsky.app/img/banner/plain/did:plc:75khwetbovmfeylwszpvobu6/bafkreiezxt4btxty5r32zkqczs3jarjmtkhillgijvaoi6rm6gyn3ey3zi@jpeg" fill={true} alt="Profile Banner" />
				</div>
				<div className="relative border-b dark:border-zinc-800 bg-white dark:bg-black">
					<div className="px-4">
						<div className="flex max-lg:flex-col gap-3">
							<div className="z-10 -mt-10 flex justify-between">
								<div>
									<MediaModal className="relative rounded-full object-cover select-none cursor-pointer" src="https://cdn.bsky.app/img/avatar/plain/did:plc:75khwetbovmfeylwszpvobu6/bafkreid5xynwkoazg4rres5wxd3fhcw2nbrmv7i3mychx4tni5lv62yovq@jpeg" width={150} height={150} quality={100} alt="Profile Picture" />
								</div>
								<div className="sm:hidden mt-[60px]">
									<ViewProfileActions />
								</div>
							</div>
							<div className="mt-2 w-full">
								<div className="flex gap-4 w-full items-center max-lg:items-start justify-between">
									<div>
										<div className="flex items-center gap-4">
											<h3 className="font-bold text-gray-800 dark:text-white text-2xl">filipotop</h3>
											<Image className="select-none" src="/badges/hallow-verified.png" width={25} height={25} alt="Verified" />
										</div>
										<p className="text-sm font-semibold text-zinc-500">@filipotop</p>
									</div>
									<div className="hidden sm:visible">
										<ViewProfileActions />
									</div>
								</div>
								<div className="flex mt-3 max-lg:mt-2 gap-4">
									<span className="text-gray-700 transition duration-200 hover:underline cursor-pointer dark:text-white text-sm"><strong>224M</strong> followers</span>
									<span className="text-gray-700 transition duration-200 hover:underline cursor-pointer dark:text-white text-sm"><strong>1.805</strong> following</span>
									<span className="text-gray-700 dark:text-white text-sm"><strong>5.664</strong> posts</span>
								</div>
								<div className="mt-3">
									<p className="text-gray-800 dark:text-white text-sm">
										oi meu nome é filipo, curto rpg, jogos de luta e zelda! as vezes desenho tb
									</p>
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
					<Post post={posts.post1} />
					<hr className="border-gray-200 dark:border-zinc-700" />
        	<Post post={posts.post2} />
        	<hr className="border-gray-200 dark:border-zinc-700" />
        	<Post post={posts.post3} />
				</div>
			</div>
		</MainStructure>
	);
}

import Image from "next/image";
import MainStructure from "@/components/MainStructure";

export default function Profile({ params }) {
	return (
		<MainStructure>
			<div>
				<div className="relative z-0 min-h-[230px]">
					<Image className="rounded-l-t-xl object-cover select-none" src="https://cdn.bsky.app/img/banner/plain/did:plc:75khwetbovmfeylwszpvobu6/bafkreiezxt4btxty5r32zkqczs3jarjmtkhillgijvaoi6rm6gyn3ey3zi@jpeg" fill={true} alt="Profile Banner" />
				</div>
				<div className="relative border-b  bg-white">
					<div className="px-4">
						<div className="flex max-[1000px]:flex-col gap-3">
							<div className="z-10 -mt-10 ">
								<Image className="relative rounded-full object-cover select-none border-4 border-white" src="https://cdn.bsky.app/img/avatar/plain/did:plc:75khwetbovmfeylwszpvobu6/bafkreid5xynwkoazg4rres5wxd3fhcw2nbrmv7i3mychx4tni5lv62yovq@jpeg" width={150} height={150} quality={100} alt="Profile Picture" />
							</div>
							<div className="mt-2 w-full">
								<div className="flex gap-4 max-[1000px]:flex-col w-full items-center max-[1000px]:items-start justify-between">
									<div>
										<div className="flex items-center gap-4">
											<h3 className="font-bold text-gray-800 text-2xl">filipotop</h3>
											<Image className="select-none" src="/badges/hallow-verified.png" width={25} height={25} alt="Verified" />
										</div>
										<p className="text-sm font-semibold text-zinc-500">@filipotop.tidal.social</p>
									</div>
									<div className="flex items-center gap-2">
										<button className="py-1 px-5 rounded-full font-bold bg-gray-100 transition duration-200 hover:bg-gray-200">
										  <span className="select-none text-xs text-gray-800 text-center">
										  	Direct Message
										  </span>
										</button>
										<button className="py-1 px-5 rounded-full font-bold text-white bg-blue-500 transition duration-200 hover:opacity-90">
										  <span className="select-none text-xs text-center">
										  	Follow
										  </span>
										</button>
									</div>
								</div>
								<div className="flex mt-3 max-[1000px]:mt-10 gap-4">
									<span className="text-gray-700 text-sm"><strong>224M</strong> followers</span>
									<span className="text-gray-700 text-sm"><strong>1.805</strong> following</span>
									<span className="text-gray-700 text-sm"><strong>5.664</strong> posts</span>
								</div>
								<div className="mt-5">
									<p className="text-gray-800 text-sm">
										oi meu nome é filipo, curto rpg, jogos de luta e zelda! as vezes desenho tb
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex px-4 mt-10 flex-wrap gap-2 items-center mt-auto">
						<p className="font-semibold select-none text-sm p-2 transition duration-200 hover:bg-gray-200 cursor-pointer border-b-4 border-blue-500">Tides</p>
						<p className="font-semibold select-none text-sm p-2 transition duration-200 hover:bg-gray-200 cursor-pointer">Replies</p>
					</div>
				</div>
			</div>
		</MainStructure>
	);
}
import Link from "next/link";
import Image from "next/image";
import MainStructure from "@/presentation/components/MainStructure";
import getAccount from "@/shared/utils/get-account-utils";
import { FaBrush, FaDoorOpen } from "react-icons/fa6";

export default async function ProfileSettings() {
	const me = await getAccount("@me");

	return (
		<MainStructure>
			<div className="p-4 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
				<h3 className="select-none font-bold text-xl">Settings</h3>
			</div>
			<div className="p-4 mt-5 h-full">
				{me && (
					<div>
						<p className="font-semibold text-md select-none">Signed in as</p>
						<Link href="/profile/@me" className="mt-2 flex items-center gap-2">
							<div>
							  <Image className="rounded-full object-cover select-none" src={me.prisma.avatarUrl} width={40} height={40} quality={100} alt="Profile Picture" />
							</div>
							<div>
                <p className="text-sm dark:text-white font-semibold truncate max-w-[130px]">{me.prisma.name}</p>
                <p className="text-xs font-semibold text-zinc-500 max-w-[130px] truncate">{me.prisma.identifier}</p>
              </div>
						</Link>
						<div className="mt-5" >
							<Link className="flex items-center gap-2 w-[max-content]" href="/api/auth/signout">
								<div className="bg-gray-200 dark:bg-zinc-800 p-3 rounded-full">
									<FaDoorOpen />
								</div>
								Sign Out
							</Link>
						</div>
					</div>
				)}
				<p className="font-semibold text-md select-none mt-5">Basics</p>
				<div className="mt-2" >
					<Link className="flex items-center gap-2 w-[max-content]" href="/settings/appearance">
						<div className="bg-gray-200 dark:bg-zinc-800 p-3 rounded-full">
							<FaBrush />
						</div>
						Appearance
					</Link>
				</div>
			</div>
		</MainStructure>
	);
}
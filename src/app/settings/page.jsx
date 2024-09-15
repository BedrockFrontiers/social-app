import Link from "next/link";
import Image from "next/image";
import MainStructure from "@/presentation/components/MainStructure";
import getAccount from "@/shared/utils/account/get-account-util";
import MainHeader from "@/presentation/components/MainHeader";
import SettingItem from "@/presentation/components/Settings/SettingItem";
import { MdDeveloperMode } from "react-icons/md";
import { FaBrush, FaDoorOpen, FaAt } from "react-icons/fa6";

export default async function ProfileSettings() {
	const me = await getAccount("@me");

	return (
		<MainStructure>
			<MainHeader>
				<h3 className="select-none font-bold text-xl">Settings</h3>
			</MainHeader>
			<div className="p-4 mt-5 h-full">
				{me && (
					<div className="my-5">
						<p className="font-semibold text-md select-none">Signed in as</p>
						<Link href="/profile/@me" className="mt-2 flex items-center gap-2">
							<div className="w-[40px] h-[40px]">
							  <Image className="rounded-full object-cover select-none w-[40px] h-[40px]" src={me.prisma.avatarUrl} width={40} height={40} quality={100} alt="Profile Picture" />
							</div>
							<div>
                <p className="text-sm dark:text-white font-semibold truncate max-w-[130px]">{me.prisma.name}</p>
                <p className="text-xs font-semibold text-zinc-500 max-w-[130px] truncate">{me.prisma.identifier}</p>
              </div>
						</Link>
						<div className="mt-5" >
							<SettingItem icon={<MdDeveloperMode />} content="Developer Kit" url="/settings/developer-kit" />
						</div>

						<p className="font-semibold text-md select-none mt-5">Advanced</p>
						<div className="mt-5" >
							<SettingItem icon={<FaAt />} content="Change Identifier" url="/settings/change-identifier" />
						</div>
		      </div>
				)}
				<p className="font-semibold text-md select-none">Basics</p>
				<div className="mt-2" >
					<SettingItem icon={<FaBrush />} content="Appearance" url="/settings/appearance" />
				</div>
			</div>
		</MainStructure>
	);
}

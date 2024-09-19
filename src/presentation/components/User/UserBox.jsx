import Image from "next/image";
import Link from "next/link";
import BuzzText from "@/presentation/components/UI/BuzzText";
import getVerifiedLevelName from "@/shared/utils/user/get-verified-level-name-util";

export default async function UserBox({ me, user, bigger = false, full = false }) {
	const verifiedName = getVerifiedLevelName(user.verified);
	const sizes = {
		"bigger": [50, 20, "md", "sm"],
		"smaller": [30, 15, "sm", "xs"]
	};

	const size = sizes[bigger ? "bigger" : "smaller"];

	return (
		<Link href={`/profile/${user.identifier}`} className="flex gap-2">
		  <div className={`w-[${size[0]}px] h-[${size[0]}px] flex-shrink-0`}>
		    <Image className={`rounded-full object-cover select-none h-[${size[0]}px]`} src={user.avatarUrl} width={size[0]} height={size[0]} quality={100} alt="Profile Picture" />
		  </div>
		  <div>
		    <div className="flex items-center gap-2">
		      <p className={`text-${size[2]} dark:text-white font-semibold truncate max-w-[130px]`}>{user.name}</p>
		      {verifiedName.length > 0 && (<Image className="select-none" src={`/badges/${verifiedName}.png`} width={size[1]} height={size[1]} alt={verifiedName} />)}
		    </div>
		    <p className={`text-${size[3]} text-zinc-500 max-w-[130px] truncate`}>{user.identifier}</p>
		    {full && (
		    	<div className="text-sm mt-2">
		    		<BuzzText content={user.bio || "Nothing about me."} />
		    	</div>
		    )}
		  </div>
		</Link>
	);
}

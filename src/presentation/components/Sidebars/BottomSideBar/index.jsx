import LoggedItems from "@/presentation/components/Sidebars/BottomSideBar/LoggedItems";
import UnloggedItems from "@/presentation/components/Sidebars/BottomSideBar/UnloggedItems";
import isLogged from "@/shared/utils/account/is-logged-util";

export default function BottomSideBar({ me }) {
	const logged = isLogged(me);

	return (
		<div className="fixed z-10 bottom-0 left-0 w-full bg-white dark:bg-black border-t dark:border-zinc-700 py-3 min-h-[50px]">
			<div className="flex gap-4 justify-center h-full overflow-x-auto items-center">
				{(logged) ? <LoggedItems /> : <UnloggedItems />}
			</div>
		</div>
	);
}

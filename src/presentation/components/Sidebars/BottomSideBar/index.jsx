import LoggedItems from "@/presentation/components/Sidebars/BottomSideBar/LoggedItems";
import UnloggedItems from "@/presentation/components/Sidebars/BottomSideBar/UnloggedItems";

export default function BottomSideBar({ user }) {
	const isLogged = Object.keys(user || {}).length > 0;

	return (
		<div className="fixed z-10 bottom-0 left-0 w-full bg-white dark:bg-black border-t dark:border-zinc-700 py-3 min-h-[50px]">
			<div className="flex gap-4 justify-center h-full overflow-x-auto items-center">
				{(isLogged) ? <LoggedItems /> : <UnloggedItems />}
			</div>
		</div>
	);
}

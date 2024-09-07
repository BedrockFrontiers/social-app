import BottomSideBar from "@/components/Sidebars/BottomSideBar";

export default function MainStructure({ children, className }) {
	return (
		<main className={`bg-gray-50 dark:bg-zinc-900 rounded-l-xl border-b border-l border-gray-200 dark:border-zinc-700 max-[1000px]:border-r max-[1000px]:rounded-r-xl border-t dark:border-zinc-800 sm:max-h-[95vh] sm:min-h-[95vh] max-[1000px]:min-h-[90vh] max-[1000px]:max-h-[90vh] overflow-y-auto ${className}`}>
			{children}
			<div className="sm:hidden max-[640px]:visible">
				<BottomSideBar />
			</div>
		</main>
	);
}
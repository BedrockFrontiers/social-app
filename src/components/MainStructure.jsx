import BottomSideBar from "@/components/Sidebars/BottomSideBar";

export default function MainStructure({ children, className }) {
	return (
		<main className={`relative bg-gray-50 rounded-l-xl border-b border-l max-[1000px]:border-r max-[1000px]:rounded-r-xl border-t h-[95vh] overflow-y-auto ${className}`}>
			{children}
			<div className="sm:hidden max-[640px]:visible">
				<BottomSideBar />
			</div>
		</main>
	);
}
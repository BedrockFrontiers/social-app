/**
 * MainStructure Component
 * 
 * This component serves as the main layout structure for the page, providing
 * a styled container for the content passed as children. It includes responsive
 * design features like rounded corners, borders, and background color adjustments
 * based on the screen size and theme (light/dark mode).
 * 
 * Props:
 * - children (ReactNode): The content to be displayed inside the main structure.
 * - className (string): Optional additional class names to be applied to the main container.
 * 
 * Features:
 * - The component applies different styles for varying screen sizes, adjusting 
 *   height, border, and layout responsiveness. 
 * - Displays the `BottomSideBar` component on small screens (hidden on larger screens).
 * 
 * Usage:
 * <MainStructure className="custom-class">
 *   <YourContent />
 * </MainStructure>
 */


import BottomSideBar from "@/components/Sidebars/BottomSideBar";

export default function MainStructure({ children, className }) {
	return (
		<main className={`bg-gray-50 dark:bg-zinc-900 sm:rounded-l-xl sm:border-b sm:border-l border-gray-200 sm:max-[1000px]:border-r sm:max-[1000px]:rounded-r-xl sm:border-t dark:border-zinc-800 sm:max-h-[100vh] sm:min-h-[100vh] max-[1000px]:min-h-[90vh] max-[1000px]:max-h-[90vh] overflow-y-auto ${className}`}>
			{children}
			<div className="sm:hidden mt-10 max-[640px]:visible">
				<BottomSideBar />
			</div>
		</main>
	);
}

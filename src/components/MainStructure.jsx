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
        <main className={`bg-gray-50 dark:bg-zinc-900 lg:border-l max-lg:border-l-0 border-gray-200 dark:border-zinc-800 h-full ${className}`}>
            {children}
            <div className="lg:hidden min-h-[50px] mt-10 max-[1089px]:visible">
                <BottomSideBar />
            </div>
        </main>
    );

}


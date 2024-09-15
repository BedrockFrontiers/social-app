import { IoCaretBackOutline } from "react-icons/io5";
import Link from "next/link";

export default function MainHeader({ children, returnRoute = '/' }) {
	return (
		<div className="p-4 bg-white dark:bg-zinc-950 themed-border !border-x-0 !border-t-0">
			<div className="flex items-center gap-2">
				<Link href={returnRoute}>
					<IoCaretBackOutline size={20} />
				</Link>
				{ children }
			</div>
		</div>
	);
}
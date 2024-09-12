/**
 * BottomSidebar Component
 * 
 * This component represents the sidebar located on the bottom side of the layout.
 * It is used to display navigation links, user information, or any other
 * relevant content specific to the bottom side of the page.
 * 
 * Usage:
 * <LoggedInBottomSideBar />
 */

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import LoggedItems from "@/components/Sidebars/BottomSideBar/LoggedItems";
import UnloggedItems from "@/components/Sidebars/BottomSideBar/UnloggedItems";

export default function BottomSideBar() {
  const [isLogged, setIsLogged] = useState(false);
  const supabase = createClient();
  
  useEffect(() => {
    async function checkIsLogged() {
      const { error } = await supabase.auth.getUser();
      setIsLogged(!error);
    }

    checkIsLogged();
  }, [supabase]);

	return (
		<div className="fixed z-50 bottom-0 left-0 w-full bg-white dark:bg-black border-t dark:border-zinc-700 py-3 min-h-[50px]">
			<div className="flex gap-4 justify-center h-full overflow-x-auto items-center">
				{(isLogged) ? <LoggedItems /> : <UnloggedItems />}
			</div>
		</div>
	);
}

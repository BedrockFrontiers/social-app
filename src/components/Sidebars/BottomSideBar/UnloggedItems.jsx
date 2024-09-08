/**
 * UnloggedItems Component
 * 
 * This component show items when user is unlogged.
 * 
 * Usage:
 * <UnloggedItems />
 */

import Link from "next/link";

export default function UnloggedItems() {
	return (
		<div>
      <p className="dark:text-white w-full text-center">
        Log in to join the conversation and enjoy Tidal. It's free!
      </p>
      <button className="p-2 mt-2 w-full rounded-full font-bold bg-blue-500 text-white transition duration-200 hover:opacity-90">
        <Link href="/auth/login" className="visible select-none text-sm text-center">
          Log In
        </Link>
      </button>
    </div>
	);
}
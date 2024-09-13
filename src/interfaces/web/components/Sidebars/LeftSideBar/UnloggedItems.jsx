import Link from "next/link";
import Image from "next/image";

export default function UnloggedItems() {
	return (
		<div className="p-10">
      <div className="mb-3">
        <Image className="select-none" src="/icon.png" width={50} height={50} alt="Social App Logo" />
      </div>
      <div className="mb-4 text-black dark:text-white">
        <p className="font-semibold">Sign up or sign in to join the conversation</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Link href="/auth/signin" className="py-2 px-4 max-lg:p-3 w-full rounded-full font-bold bg-blue-500 text-white transition duration-200 hover:opacity-90 select-none text-sm text-center">
          Sign In
        </Link>
        <Link href="/auth/signup" className="py-2 px-4 max-lg:p-3 w-full rounded-full font-bold bg-zinc-400 dark:bg-zinc-700 text-white transition duration-200 hover:opacity-90 select-none text-sm text-center">
          Sign Up
        </Link>
      </div>
    </div>
	);
}

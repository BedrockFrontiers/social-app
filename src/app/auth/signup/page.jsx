import { MdOutlineAlternateEmail, MdLockOutline, MdOutlineArrowRight } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import Image from "next/image";

export default function SignUp() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<svg className="absolute bottom-0 left-0 w-full z-0" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill="currentColor" fillOpacity="0.2" d="M0,256L30,245.3C60,235,120,213,180,181.3C240,149,300,107,360,96C420,85,480,107,540,133.3C600,160,660,181,720,186.7C780,192,840,181,900,149.3C960,117,1020,64,1080,64C1140,64,1200,117,1260,160C1320,203,1380,235,1410,245.3L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z" />
	    </svg>

			<div className="z-10 bg-white dark:bg-zinc-900 lg:rounded-l-xl lg:border-l lg:border-t lg:border-b lg:border-gray-200 lg:dark:border-zinc-800 lg:min-h-[500px] max-lg:h-full lg:w-[500px] max-lg:w-full lg:p-6 max-lg:p-10 shadow-lg flex flex-col">
				<div className="mb-6">
					<Image className="select-none mx-auto" src="/icon.png" width={50} height={50} alt="Social App Logo" />
				</div>
				<div className="text-center mb-6">
					<p className="text-xs text-gray-500 dark:text-gray-400">Let&apos;s Start!</p>
					<h1 className="font-bold text-3xl text-gray-900 dark:text-white">Sign Up</h1>
				</div>
				<hr className="my-4 border-gray-200 dark:border-zinc-800" />
				<div>
					<h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Account</h3>
					<div className="flex flex-col gap-4">
						<div className="bg-gray-100 dark:bg-zinc-800 py-3 px-4 rounded-lg flex items-center gap-3 border border-transparent focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
							<MdOutlineAlternateEmail className="text-gray-600 dark:text-gray-400" />
							<input
								className="bg-transparent dark:text-white placeholder-gray-500 outline-none w-full text-sm focus:outline-none focus:ring-0"
								type="email"
								placeholder="Email address"
							/>
						</div>
						<div className="bg-gray-100 dark:bg-zinc-800 py-3 px-4 rounded-lg flex items-center gap-3 border border-transparent focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
							<IoTicketOutline className="text-gray-600 dark:text-gray-400" />
							<input
								className="bg-transparent dark:text-white placeholder-gray-500 outline-none w-full text-sm focus:outline-none focus:ring-0"
								type="text"
								placeholder="Username"
							/>
						</div>
						<div className="bg-gray-100 dark:bg-zinc-800 py-3 px-4 rounded-lg flex items-center gap-3 border border-transparent focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
							<MdLockOutline className="text-gray-600 dark:text-gray-400" />
							<input
								className="bg-transparent dark:text-white placeholder-gray-500 outline-none w-full text-sm focus:outline-none focus:ring-0"
								type="password"
								placeholder="Password"
							/>
						</div>
					</div>
				</div>
				<div className="mt-6 flex justify-center">
					<button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition font-semibold w-full flex items-center justify-center gap-1">
						<p>Next</p>
						<MdOutlineArrowRight />
					</button>
				</div>
			</div>
			<div className="relative max-lg:hidden max-lg:w-0 max-lg:h-0 bg-blue-600 rounded-r-xl min-h-[519px] w-[300px] border-b border-t border-r border-gray-200 dark:border-zinc-800 shadow-lg">
			</div>
		</div>
	);
}

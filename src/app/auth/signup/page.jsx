"use client";

import { useState } from "react";
import { MdOutlineAlternateEmail, MdLockOutline, MdOutlineArrowRight } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { isValidEmail, isValidPassword, isValidUsername, USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from "@/shared/utils/validation/validation-util";
import createIdentifier from "@/shared/utils/identifier/create-identifier-util";
import Input from "@/presentation/components/UI/Input";
import Image from "next/image";

export default function SignUp() {
	const [invalidIdentifier, setInvalidIdentifier] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [username, setUsername] = useState('');
	const [identifier, setIdentifier] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSignUp() {
		if (invalidIdentifier)
			return;

		setError('');

		if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidUsername(username)) {
      setError(`Username must be at least ${USERNAME_MIN_LENGTH} characters long.`);
      return;
    }

    if (!isValidPassword(password)) {
      setError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`);
      return;
    }

		const req = await fetch("/api/account/create", {
			method: "post",
			body: JSON.stringify({
				username,
				identifier,
				email,
				password
			})
		});

		if (!req.ok) {
			const res = await req.json();
			setError(res.error);
		} else {
			const res = await req.json();
			setSuccess(res.message);
		}
	}

	function handleChangeUsername(value) {
		const PRE_IDENTIFIER = createIdentifier(value);
		setIdentifier(PRE_IDENTIFIER);

		if (PRE_IDENTIFIER === "@me")
			setInvalidIdentifier(true);
		else
			setInvalidIdentifier(false);

		setUsername(value);
	}

	return (
		<div className="w-full h-full flex items-center justify-center">
			<svg className="absolute bottom-0 left-0 w-full z-0" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill="currentColor" fillOpacity="0.2" d="M0,256L30,245.3C60,235,120,213,180,181.3C240,149,300,107,360,96C420,85,480,107,540,133.3C600,160,660,181,720,186.7C780,192,840,181,900,149.3C960,117,1020,64,1080,64C1140,64,1200,117,1260,160C1320,203,1380,235,1410,245.3L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z" />
	    </svg>

	    <div className="flex items-stretch w-full max-lg:h-full justify-center">
				<div className="z-10 bg-white dark:bg-zinc-900 lg:rounded-l-xl lg:border-l lg:border-t lg:border-b lg:border-gray-200 lg:dark:border-zinc-800 lg:min-h-[500px] max-lg:h-full lg:w-[500px] max-lg:w-full lg:p-6 max-lg:p-10 shadow-lg flex flex-col">
					<div className="mb-6">
						<Image className="select-none mx-auto" src="/icon.png" width={50} height={50} alt="Social App Logo" />
					</div>
					<div className="text-center mb-6">
						<p className="text-xs text-gray-500 dark:text-gray-400">Let&apos;s Start!</p>
						<h1 className="font-bold text-3xl text-gray-900 dark:text-white">Sign Up</h1>
					</div>
					<div>
						<p className={`text-center text-${success ? "blue" : "red"}-500 font-semibold text-xs select-none`}>{ error || success }</p>
						{invalidIdentifier && (
							<div className="rounded-xl bg-amber-100 border border-amber-300 p-4 mt-5">
								<TbAlertTriangleFilled className="text-amber-600 mx-auto" size={20} />
								<p className="text-xs text-center text-amber-600 font-bold select-none">Alert: You can&apos;t use &quot;@me&quot; as a user identifier.</p>
							</div>
						)}
					</div>
					<hr className="my-4 border-gray-200 dark:border-zinc-800" />
					<div>
						<h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Account</h3>
						<div className="flex flex-col gap-4">
							<Input 
								icon={<MdOutlineAlternateEmail className="text-gray-600 dark:text-gray-400" />} 
								type="text" 
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email address" 
							/>
							<Input 
								icon={<IoTicketOutline className="text-gray-600 dark:text-gray-400" />} 
								type="text" 
								value={username}
								onChange={(e) => handleChangeUsername(e.target.value)}
								placeholder="Username" 
							/>
							{identifier.trim().length > 1 && (<p className="text-zinc-600 font-semibold text-xs -mt-3 select-none">{identifier}</p>)}
							<Input 
								icon={<MdLockOutline className="text-gray-600 dark:text-gray-400" />} 
								type="password" 
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Password" 
							/>
						</div>
					</div>
					<div className="mt-6 flex justify-center">
						<button onClick={handleSignUp} className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition font-semibold w-full flex items-center justify-center gap-1">
							<p>Next</p>
							<MdOutlineArrowRight />
						</button>
					</div>
				</div>
				<div className="relative max-lg:hidden max-lg:w-0 max-lg:h-0 bg-blue-600 flex-1 rounded-r-xl max-w-[300px] min-h-auto lg:border-t lg:border-b lg:border-r lg:border-gray-200 lg:dark:border-zinc-800 shadow-lg">
				</div>
			</div>
		</div>
	);
}

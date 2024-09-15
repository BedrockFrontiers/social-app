import { redirect } from "next/navigation";
import MainStructure from "@/presentation/components/MainStructure";
import getAccount from "@/shared/utils/get-account-util";

export default async function APISettings() {
	const me = await getAccount("@me");
	const isLogged = Object.keys(me || {}).length > 0;

	if (!isLogged)
		redirect('/');

	return (
		<MainStructure>
			<div className="p-4 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
				<h3 className="select-none font-bold text-xl">Settings (API)</h3>
			</div>
			<div className="p-4 mt-5">
				<p className="font-semibold">Application</p>
				<div className="mt-5">
					<p className="text-sm">
						<strong>G-ID</strong>: { me.id }
					</p>
					<p className="text-xs text-zinc-700 select-none">
					  Your G-ID is crucial for account security. It grants access to your API requests, including posting content, updating your profile, and more. 
					  Never share your G-ID to protect your account from unauthorized actions.
					</p>
				</div>
			</div>
		</MainStructure>
	);
}
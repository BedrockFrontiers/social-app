import MainHeader from "@/presentation/components/MainHeader";
import MainStructure from "@/presentation/components/MainStructure";
import isLogged from "@/shared/utils/account/is-logged-util";
import getAccount from "@/shared/utils/account/get-account-util";

export default async function DeveloperSettings() {
	const me = await getAccount("@me");
	const logged = isLogged(me);

	if (!logged) {
		return (
			<MainStructure className="p-4">
			  <p className="font-semibold text-sm">You need to be logged.</p>
			</MainStructure>
		);
	}

	return (
		<MainStructure>
			<MainHeader returnRoute="/settings">
				<h3 className="select-none font-bold text-xl">Settings (Developer Kit)</h3>
			</MainHeader>
			<div className="p-4 mt-5">
				<p className="font-semibold">Application</p>
				<div className="mt-5">
					<p className="text-sm">
						<strong>G-ID</strong>: { me.id }
					</p>
					<p className="text-xs text-zinc-500 select-none">
					  Your G-ID is crucial for account security. It grants access to your API requests, including posting content, updating your profile, and more. 
					  Never share your G-ID to protect your account from unauthorized actions.
					</p>
				</div>
			</div>
		</MainStructure>
	);
}

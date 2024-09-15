import MainHeader from "@/presentation/components/MainHeader";
import MainStructure from "@/presentation/components/MainStructure";
import isLogged from "@/shared/utils/account/is-logged-util";
import getAccount from "@/shared/utils/account/get-account-util";
import isValidIdentifier from "@/shared/utils/identifier/is-valid-identifier-util";
import ChangeIdentifier from "@/presentation/components/Settings/ChangeIdentifier";
import UpdateUserIdentifierUseCase from "@/domain/usecases/user/update-user-identifier-usecase";
import UserRepository from "@/infrastructure/repositories/user-repository";

export default async function ChangeIdentifierSettings() {
	const me = await getAccount("@me");
	const logged = isLogged(me);

	async function validateIdentifier(identifier) {
		"use server";
		return await isValidIdentifier(identifier);
	}

	async function applyChangeIdentifier(gid, identifier) {
		"use server";
		const userRepository = new UserRepository();
		const updateUserIdentifierUseCase = new UpdateUserIdentifierUseCase(userRepository);

		try {
			return await updateUserIdentifierUseCase.execute({ gid, identifier });
		} catch (error) {
			return null;
		}
	}

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
				<h3 className="select-none font-bold text-xl">Settings (Change Identifier)</h3>
			</MainHeader>
			<div className="p-4 mt-5">
				<ChangeIdentifier me={me} validateIdentifier={validateIdentifier} applyChangeIdentifier={applyChangeIdentifier} />
			</div>
		</MainStructure>
	);
}

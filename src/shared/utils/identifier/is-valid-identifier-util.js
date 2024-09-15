import UserRepository from "@/infrastructure/repositories/user-repository";

export default async function isValidIdentifier(identifier) {
	const userRepository = new UserRepository();

	return !(await userRepository.findByIdentifier(identifier));
}
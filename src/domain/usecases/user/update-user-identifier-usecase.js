export default class UpdateUserIdentifierUseCase {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute({ gid, identifier }) {
		const existingGID = await this.userRepository.findByGID(gid);

    if (!existingGID) {
      throw new Error("G-ID invalid.");
    }

    const updatedUser = await this.userRepository.update(gid, { identifier });
    return updatedUser.toJSON();
	}
}
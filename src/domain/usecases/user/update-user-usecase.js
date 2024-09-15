export default class UpdateUserUseCase {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute({ gid, username, bio, avatarUrl, bannerUrl }) {
    const existingGID = await this.userRepository.findByGID(gid);

    if (!existingGID) {
      throw new Error("G-ID invalid.");
    }

    const updatedUser = await this.userRepository.update(gid, {
    	name: username,
    	bio: bio,
    	avatarUrl: avatarUrl || existingGID.avatarUrl,
    	bannerUrl: bannerUrl || existingGID.bannerUrl
    });

    return updatedUser;
	}
}
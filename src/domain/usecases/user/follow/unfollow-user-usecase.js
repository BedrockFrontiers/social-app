export default class UnfollowUserUseCase {
	constructor(userRepository, followerRepository) {
		this.userRepository = userRepository;
		this.followerRepository = followerRepository;
	}

	async execute({ gid, identifier, toFollowIdentifier }) {
    if (identifier.trim() === toFollowIdentifier.trim())
      throw new Error("You can't unfollow you.");

    const existingUser = await this.userRepository.findByGID(gid);
    if (!existingUser)
      throw new Error("G-ID invalid.");

    const existingToFollowGID = await this.userRepository.findByIdentifier(toFollowIdentifier);
    if (!existingToFollowGID)
      throw new Error("User to follow doesn't exist.");

    const isFollowing = await this.followerRepository.exists(existingUser.id, existingToFollowGID.id);
    if (!isFollowing)
    	throw new Error("You are not following him.");

    await this.followerRepository.remove(existingUser.id, existingToFollowGID.id);
  }
}
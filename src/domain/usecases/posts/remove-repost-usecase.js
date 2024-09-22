export default class RemoveRepostUseCase {
  constructor(userRepository, repostRepository, postRepository) {
    this.userRepository = userRepository;
    this.repostRepository = repostRepository;
    this.postRepository = postRepository;
  }

  async execute({ gid, postId }) {
    const existingUser = await this.userRepository.findByGID(gid);
    if (!existingUser) {
      throw new Error("G-ID invalid.");
    }

    const existingPost = await this.postRepository.findById(postId);
    if (!existingPost) {
      throw new Error("Post ID invalid.");
    }

    const existingRepost = await this.repostRepository.exists(existingUser.id, postId);
    if (!existingRepost) {
      throw new Error("You are not reposted this post.");
    }

    await this.repostRepository.remove(existingUser.id, postId);
  }
}

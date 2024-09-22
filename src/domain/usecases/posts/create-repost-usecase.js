export default class CreateRepostUseCase {
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
    if (existingRepost) {
      throw new Error("You already reposted this post.");
    }

    const newRepost = await this.repostRepository.create(existingUser.id, postId);

    return newRepost;
  }
}

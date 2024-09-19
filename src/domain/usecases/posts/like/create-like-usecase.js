export default class CreateLikeUseCase {
  constructor(userRepository, likeRepository, postRepository) {
    this.userRepository = userRepository;
    this.likeRepository = likeRepository;
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

    const existingLike = await this.likeRepository.exists(existingUser.id, postId);
    if (existingLike) {
      throw new Error("You already liked this post.");
    }

    const newLike = await this.likeRepository.create(existingUser.id, postId);

    return newLike;
  }
}

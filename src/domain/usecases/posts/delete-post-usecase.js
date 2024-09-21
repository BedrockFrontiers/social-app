export default class DeletePostUseCase {
  constructor(userRepository, postRepository) {
    this.userRepository = userRepository;
    this.postRepository = postRepository;
  }

  async execute({ gid, postId }) {
    const existingUser = await this.userRepository.findByGID(gid);
    if (!existingUser) {
      throw new Error("G-ID invalid.");
    }

    await this.postRepository.delete(postId);
  }
}

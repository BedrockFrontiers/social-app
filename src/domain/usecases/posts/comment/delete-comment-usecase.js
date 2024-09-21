export default class DeleteCommentUseCase {
  constructor(userRepository, commentRepository) {
    this.userRepository = userRepository;
    this.commentRepository = commentRepository;
  }

  async execute({ gid, commentId }) {
    const existingUser = await this.userRepository.findByGID(gid);
    if (!existingUser) {
      throw new Error("G-ID invalid.");
    }

    await this.commentRepository.delete(commentId);
  }
}

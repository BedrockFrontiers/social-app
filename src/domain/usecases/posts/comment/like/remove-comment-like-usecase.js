export default class RemoveCommentLikeUseCase {
  constructor(userRepository, commentLikeRepository, commentRepository) {
    this.userRepository = userRepository;
    this.commentLikeRepository = commentLikeRepository;
    this.commentRepository = commentRepository;
  }

  async execute({ gid, commentId }) {
    const existingUser = await this.userRepository.findByGID(gid);
    if (!existingUser) {
      throw new Error("G-ID invalid.");
    }

    const existingComment = await this.commentRepository.findById(commentId);
    if (!existingComment) {
      throw new Error("Comment ID invalid.");
    }

    const existingLike = await this.commentLikeRepository.exists(existingUser.id, commentId);
    if (!existingLike) {
      throw new Error("You are not liked this comment.");
    }

    await this.commentLikeRepository.remove(existingUser.id, commentId);
  }
}

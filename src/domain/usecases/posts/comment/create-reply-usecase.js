export default class CreateCommentUseCase {
  constructor(userRepository, commentRepository) {
    this.userRepository = userRepository;
    this.commentRepository = commentRepository;
  }

  async execute({ gid, content, commentId, attachments }) {
    const existingUser = await this.userRepository.findByGID(gid);
    if (!existingUser) {
      throw new Error("G-ID invalid.");
    }

    const existingComment = await this.commentRepository.findById(commentId);
    if (!existingComment) {
      throw new Error("Comment not found.");
    }

    const newReply = await this.commentRepository.create({
      content: content,
      postId: existingComment.postId,
      authorId: existingUser.id,
      parentId: commentId,
      attachments: attachments,
    });

    return newReply;
  }
}

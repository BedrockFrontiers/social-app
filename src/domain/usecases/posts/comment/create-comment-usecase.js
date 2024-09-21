export default class CreateCommentUseCase {
  constructor(userRepository, commentRepository, postRepository) {
    this.userRepository = userRepository;
    this.commentRepository = commentRepository;
    this.postRepository = postRepository;
  }

  async execute({ gid, content, postId, attachments }) {
    const existingUser = await this.userRepository.findByGID(gid);
    if (!existingUser) {
      throw new Error("G-ID invalid.");
    }

    const existingPost = await this.postRepository.findById(postId);
    if (!existingPost) {
      throw new Error("Post not found.");
    }

    const newComment = await this.commentRepository.create({
      content: content,
      postId: postId,
      authorId: existingUser.id,
      attachments: attachments,
    });

    return newComment;
  }
}

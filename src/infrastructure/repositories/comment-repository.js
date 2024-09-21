import prisma from "@/db.js";

export default class CommentRepository {
  async create(comment) {
    const newComment = await prisma.comment.create({
      data: {
        content: comment.content,
        postId: comment.postId,
        authorId: comment.authorId,
        attachments: comment.attachments
      }
    });

    return newComment;
  }
  
  async findById(commentId) {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        author: true,
        post: true,
        parent: true,
        replies: true
      },
    });

    return comment ? comment : null;
  }

  async delete(commentId) {
    await prisma.comment.delete({
      where: { id: commentId },
    });
  }
}

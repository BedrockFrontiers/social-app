import prisma from "@/db.js";
import getUserFields from "@/domain/fields/user";

export default class CommentRepository {
  async create(comment) {
    const newComment = await prisma.comment.create({
      data: {
        content: comment.content,
        postId: comment.postId,
        authorId: comment.authorId,
        parentId: comment.parentId,
        attachments: comment.attachments
      }
    });

    return newComment;
  }
  
  async findById(commentId, userId = null) {
    const userFields = await getUserFields();
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        author: {
          select: userFields
        },
        post: true,
        parent: true,
        likes: true,
        replies: {
          include: {
            author: {
              select: userFields
            },
            post: true,
            parent: true,
            likes: true,
            replies: true
          }
        }
      },
    });

    if (comment) {
      const repliesWithLikesStatus = comment.replies.map(reply => ({
        ...reply,
        hasLiked: reply.likes.some(like => like.userId === userId),
      }));

      return {
        ...comment,
        hasLiked: comment.likes.some(like => like.userId === userId),
        replies: repliesWithLikesStatus,
      };
    }

    return null;
  }

  async delete(commentId) {
    await prisma.comment.delete({
      where: { id: commentId },
    });
  }
}

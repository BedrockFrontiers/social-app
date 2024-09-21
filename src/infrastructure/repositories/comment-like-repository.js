import prisma from "@/db.js";

export default class CommentLikeRepository {
	async create(userId, commentId) {
		const newLike = await prisma.commentLike.create({
			data: {
				user: {
					connect: { id: userId }
				},
				comment: {
					connect: { id: commentId }
				}
			}
		});

		return newLike;
	}

	async exists(userId, commentId) {
		const existingLike = await prisma.commentLike.findFirst({
      where: {
        userId,
        commentId
      },
    });

    return existingLike !== null;
	}

	async remove(userId, commentId) {
    await prisma.commentLike.deleteMany({
      where: {
        userId,
        commentId
      },
    });
  }
}
import prisma from "@/db.js";
import Like from "@/domain/entities/post/like";

export default class LikeRepository {
	async create(userId, postId) {
		const newLike = await prisma.like.create({
			data: {
				user: {
					connect: { id: userId }
				},
				post: {
					connect: { id: postId }
				}
			}
		});

		return new Like(newLike);
	}

	async exists(userId, postId) {
		const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        postId
      },
    });

    return existingLike !== null;
	}

	async remove(userId, postId) {
    await prisma.like.deleteMany({
      where: {
        userId,
        postId
      },
    });
  }
}
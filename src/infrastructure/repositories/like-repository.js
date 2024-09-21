import prisma from "@/db.js";

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

		return newLike;
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
import prisma from "@/db.js";

export default class RepostRepository {
	async create(userId, postId) {
		const newRepost = await prisma.repost.create({
			data: {
				user: {
					connect: { id: userId }
				},
				post: {
					connect: { id: postId }
				}
			}
		});

		return newRepost;
	}

	async exists(userId, postId) {
		const existingRepost = await prisma.repost.findFirst({
      where: {
        userId,
        postId
      },
    });

    return existingRepost !== null;
	}

	async remove(userId, postId) {
    await prisma.repost.deleteMany({
      where: {
        userId,
        postId
      },
    });
  }
}
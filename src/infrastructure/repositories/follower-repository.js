import prisma from "@/db.js";
import Follower from "@/domain/entities/user/follower";

export default class FollowerRepository {
	async create(followingId, followerId) {
		const newFollower = await prisma.follower.create({
			data: {
				followingId,
				followerId
			}
		});

		return new Follower(newFollower);
	}

	async exists(followingId, followerId) {
		const existingFollow = await prisma.follower.findFirst({
      where: {
        followingId,
        followerId
      },
    });

    return existingFollow !== null;
	}

	async remove(followingId, followerId) {
    await prisma.follower.deleteMany({
      where: {
        followingId,
        followerId
      },
    });
  }
}
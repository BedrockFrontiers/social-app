import prisma from "@/db.js";
import User from "@/domain/entities/user/user";

export default class UserRepository {
  async create(user) {
    const newUser = await prisma.user.create({
      data: {
        gid: user.gid,
        identifier: user.identifier,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        bannerUrl: user.bannerUrl,
        website: user.website,
        location: user.location,
        verified: user.verified
      }
    });
    
    return new User(newUser);
  }

  async update(gid, user) {
    const updatedUser = await prisma.user.update({
      where: { gid },
      data: user
    });

    return new User(updatedUser);
  }

  async findByEmail(email) {
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
        posts: true,
        followers: {
          include: {
            following: true,
          },
        },
        following: {
          include: {
            follower: true,
          },
        },
        likes: true,
        reposts: true
      }
    });
    return user ? new User(user).toJSON() : null;
  }

  async findByIdentifier(identifier) {
    const user = await prisma.user.findUnique({ 
      where: { identifier },
      include: {
        posts: true,
        followers: {
          include: {
            following: true,
          },
        },
        following: {
          include: {
            follower: true,
          },
        },
        likes: true,
        reposts: true
      }
    });
    return user ? new User(user).toJSON() : null;
  }

  async findByGID(gid) {
    const user = await prisma.user.findUnique({ 
      where: { gid },
      include: {
        posts: true,
        followers: {
          include: {
            following: true,
          },
        },
        following: {
          include: {
            follower: true,
          },
        },
        likes: true,
        reposts: true
      }
    });
    return user ? new User(user).toJSON() : null;
  }
}
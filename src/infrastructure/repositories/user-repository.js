import prisma from "@/db.js";

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
    
    return newUser;
  }

  async update(gid, user) {
    const updatedUser = await prisma.user.update({
      where: { gid },
      data: user
    });

    return updatedUser;
  }

  async findByEmail(email) {
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
        posts: {
          include: {
            author: true,
            likes: true,
            reposts: true,
            comments: true
          },
          orderBy: {
            createdAt: "desc", 
          },
        },
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
        commentLikes: true,
        reposts: {
          include: {
            post: {
              include: {
                author: true,
                likes: true,
                comments: true,
                reposts: true
              }
            }
          },
          orderBy: {
            createdAt: "desc",
          }
        }
      }
    });

    if (user) {
      user.posts = user.posts.map(post => {
        return {
          ...post,
          hasLiked: post.likes.some(like => like.userId === user.id),
          hasReposted: post.reposts.some(repost => repost.userId === user.id)
        };
      });

      user.reposts = user.reposts.map(repost => {
        return {
          ...repost,
          hasLiked: repost.post.likes.some(like => like.userId === user.id),
          hasReposted: repost.post.reposts.some(rp => rp.userId === user.id)
        };
      });
    }

    return user ? user : null;
  }

  async findByIdentifier(identifier) {
    const user = await prisma.user.findUnique({ 
      where: { identifier },
      include: {
        posts: {
          include: {
            author: true,
            likes: true,
            reposts: true,
            comments: true
          },
          orderBy: {
            createdAt: "desc", 
          },
        },
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
        commentLikes: true,
        reposts: {
          include: {
            post: {
              include: {
                author: true,
                likes: true,
                comments: true,
                reposts: true
              }
            }
          },
          orderBy: {
            createdAt: "desc",
          }
        }
      }
    });

    if (user) {
      user.posts = user.posts.map(post => {
        return {
          ...post,
          hasLiked: post.likes.some(like => like.userId === user.id),
          hasReposted: post.reposts.some(repost => repost.userId === user.id)
        };
      });

      user.reposts = user.reposts.map(repost => {
        return {
          ...repost,
          hasLiked: repost.post.likes.some(like => like.userId === user.id),
          hasReposted: repost.post.reposts.some(rp => rp.userId === user.id)
        };
      });
    }

    return user ? user : null;
  }

  async findByGID(gid) {
    const user = await prisma.user.findUnique({ 
      where: { gid },
      include: {
        posts: {
          include: {
            author: true,
            likes: true,
            reposts: true,
            comments: true
          },
          orderBy: {
            createdAt: "desc", 
          },
        },
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
        commentLikes: true,
        reposts: {
          include: {
            post: {
              include: {
                author: true,
                likes: true,
                comments: true,
                reposts: true
              }
            }
          },
          orderBy: {
            createdAt: "desc",
          }
        }
      }
    });

    if (user) {
      user.posts = user.posts.map(post => {
        return {
          ...post,
          hasLiked: post.likes.some(like => like.userId === user.id),
          hasReposted: post.reposts.some(repost => repost.userId === user.id)
        };
      });

      user.reposts = user.reposts.map(repost => {
        return {
          ...repost,
          hasLiked: repost.post.likes.some(like => like.userId === user.id),
          hasReposted: repost.post.reposts.some(rp => rp.userId === user.id)
        };
      });
    }
    
    return user ? user : null;
  }
}
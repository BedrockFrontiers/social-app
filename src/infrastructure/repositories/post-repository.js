import prisma from "@/db.js";
import getUserFields from "@/domain/fields/user";

export default class PostRepository {
  async create(post) {
    const newPost = await prisma.post.create({
      data: {
        content: post.content,
        nsfw: post.nsfw,
        authorId: post.authorId,
        attachments: post.attachments
      }
    });

    return newPost;
  }
  
  async findById(postId, userId = null) {
    const userFields = await getUserFields();
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: userFields,
        },
        likes: true, 
        reposts: true, 
        comments: {
          include: {
            author: {
              select: userFields,
            },
            post: true,
            parent: true,
            replies: true,
            likes: true
          },
          orderBy: {
            createdAt: "desc", 
          },
        }
      },
    });

    if (post) {
      const commentsWithLikesStatus = post.comments.map(comment => ({
        ...comment,
        hasLiked: comment.likes.some(like => like.userId === userId),
      }));

      return {
        ...post,
        hasLiked: post.likes.some(like => like.userId === userId),
        hasReposted: post.reposts.some(repost => repost.userId === userId),
        comments: commentsWithLikesStatus,
      };
    }

    return null;
  }

  async delete(postId) {
    await prisma.post.delete({
      where: { id: postId },
    });
  }

  async findAll(userId = null) {
    const userFields = await getUserFields();
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: userFields,
        },
        likes: true, 
        reposts: true, 
        comments: {
          include: {
            author: {
              select: userFields,
            },
            post: true,
            parent: true,
            replies: true,
            likes: true
          },
          orderBy: {
            createdAt: "desc", 
          },
        }
      },
      orderBy: {
        createdAt: "desc", 
      },
    });

    return posts.map(post => ({
      ...post,
      hasLiked: post.likes.some(like => like.userId === userId),
      hasReposted: post.reposts.some(repost => repost.userId === userId),
    }));
  }
}

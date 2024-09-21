import prisma from "@/db.js";

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
  
  async findById(postId) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: true, 
        likes: true, 
        reposts: true, 
        comments: {
          include: {
            author: true,
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

    return post ? post : null;
  }

  async delete(postId) {
    await prisma.post.delete({
      where: { id: postId },
    });
  }

  async findAll() {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        likes: true, 
        reposts: true, 
        comments: {
          include: {
            author: true,
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

    return posts.map(post => post);
  }
}

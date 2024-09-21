export default class Post {
  constructor(postObject) {
    this.id = postObject.id;
    this.content = postObject.content;
    this.attachments = postObject.attachments;
    this.createdAt = postObject.createdAt;
    this.updatedAt = postObject.updatedAt;
    this.nsfw = postObject.nsfw;
    this.author = postObject.author;
    this.likes = postObject.likes;
    this.reposts = postObject.reposts;
    this.comments = postObject.comments;
  }

  toJSON() {
    return {
      id: this.id,
      content: this.content,
      attachments: this.attachments,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      nsfw: this.nsfw,
      author: this.author,
      likes: this.likes,
      reposts: this.reposts,
      comments: this.comments
    };
  }
}

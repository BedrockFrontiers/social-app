export default class CreatePostUseCase {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute({ gid, content, attachments }) {
    const user = await this.postRepository.findByGID(gid);
    if (!user) {
      throw new Error("Invalid G-ID.");
    }

    const newPost = await this.postRepository.create({
      gid: gid,
      content: content,
      attachments: attachments,
      createdAt: new Date(),
    });

    return newPost;
  }
}

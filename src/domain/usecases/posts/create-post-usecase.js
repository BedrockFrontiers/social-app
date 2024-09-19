export default class CreatePostUseCase {
  constructor(userRepository, postRepository) {
    this.userRepository = userRepository;
    this.postRepository = postRepository;
  }

  async execute({ gid, content, attachments }) {
    const user = await this.userRepository.findByGID(gid);
    if (!user) {
      throw new Error("Invalid G-ID.");
    }

    const newPost = await this.postRepository.create({
      gid: gid,
      content: content,
      attachments: attachments,
    });

    return newPost;
  }
}

export default class CreatePostUseCase {
  constructor(userRepository, postRepository) {
    this.userRepository = userRepository;
    this.postRepository = postRepository;
  }

  async execute({ gid, content, nsfw, attachments }) {
    const existingUser = await this.userRepository.findByGID(gid);
    if (!existingUser) {
      throw new Error("G-ID invalid.");
    }

    const newPost = await this.postRepository.create({
      content: content,
      nsfw: nsfw,
      authorId: existingUser.id,
      attachments: attachments,
    });

    return newPost;
  }
}

export default class CreateMessageUseCase {
	constructor(messageRepository, userRepository) {
		this.messageRepository = messageRepository;
		this.userRepository = userRepository;
	}

	async execute({ gid, content, attachments, recipientId }) {
		const existingUser = await this.userRepository.findBy(gid);
    if (!existingUser)
      throw new Error("G-ID invalid.");

    const existingRecipient = await this.userRepository.findById(recipientId);
    if (!recipientId)
      throw new Error("User to send message doesn't exist.");

		await this.messageRepository.create({ content: content, attachments: attachments, senderId: existingUser.id, recipientId: recipientId });
	}
}

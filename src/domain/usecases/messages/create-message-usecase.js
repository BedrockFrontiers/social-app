export default class CreateMessageUseCase {
	constructor(messageRepository, userRepository) {
		this.messageRepository = messageRepository;
		this.userRepository = userRepository;
	}

	async execute({ gid, content, attachments, recipientId }) {
		const existingUser = await this.userRepository.findByGID(gid);
    if (!existingUser)
      throw new Error("G-ID invalid.");

    const existingRecipient = await this.userRepository.findById(recipientId);
    if (!existingRecipient)
      throw new Error("User to send message doesn't exist.");

		if (existingUser.id === existingRecipient.if)
			throw new Error("You can't send message to yourself.");

		await this.messageRepository.create({ content: content, attachments: attachments, senderId: existingUser.id, recipientId: recipientId });
	}
<<<<<<< HEAD
}
=======
}
>>>>>>> 66f6192649d6e52d00f4cf39fa7a5f26d72c5c4c

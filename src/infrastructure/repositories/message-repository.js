import prisma from "@/db.js";
import getUserFields from "@/domain/fields/user";

export default class MessageRepository {
  async create(message) {
    const newMessage = await prisma.message.create({
      data: {
        content: message.content,
        attachments: message.attachments,
        senderId: message.senderId,
        recipientId: message.recipientId
      }
    });

    return newMessage;
  }

  async findById(messageId) {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: {
        sender: {
          select: await getUserFields(),
        },
        recipient: {
          select: await getUserFields(),
        }
      },
    });

    return message;
  }

  async delete(messageId) {
    await prisma.message.delete({
      where: { id: messageId },
    });
  }

  async findAllByUserId(userId) {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { recipientId: userId },
        ]
      },
      include: {
        sender: {
          select: await getUserFields(),
        },
        recipient: {
          select: await getUserFields(),
        }
      }
    });

    return messages;
  }

  async getMessagesWithUser(senderId, recipientId) {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId, recipientId },
          { senderId: recipientId, recipientId: senderId }
        ]
      },
      include: {
        sender: {
          select: await getUserFields(),
        },
        recipient: {
          select: await getUserFields(),
        }
      }
    });

    return messages;
  }
}

import AuthenticateUserUseCase from "@/domain/usecases/user/authenticate-user-usecase";
import UserRepository from "@/infrastructure/repositories/user-repository";
import ImgurRepository from "@/infrastructure/repositories/imgur-repository";
import MessageRepository from "@/infrastructure/repositories/message-repository";
import CreateMessageUseCase from "@/domain/usecases/messages/create-message-usecase";

export async function POST(request) {
  const authenticateUserUseCase = new AuthenticateUserUseCase();
  let gid;

  try {
    const accessGID = request.headers.get("Authorization");
    gid = await authenticateUserUseCase.execute(accessGID);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }

  const { recipientId, content, attachments } = await request.json();

  if (!recipientId && !content && !attachments)
    return Response.json({ error: "Missing fields." }, { status: 401 });

  if (isNaN(recipientId))
    return Response.json({ error: "recipientId field must be a number." }, { status: 400 });

  const messageRepository = new MessageRepository();
  const userRepository = new UserRepository();
  const imgurRepository = new ImgurRepository();

  const uploadedUrls = [];

  for (const attachment of attachments) {
    const attachmentBase64 = attachment;
    const uploadResponse = await imgurRepository.uploadImage(attachmentBase64);

    if (uploadResponse.error) {
      return Response.json({ error: uploadResponse.error }, { status: 400 });
    }

    uploadedUrls.push(uploadResponse.link);
  }

  const createMessageUseCase = new CreateMessageUseCase(messageRepository, userRepository);
  try {
    await createMessageUseCase.execute({
      gid,
      content,
      recipientId,
      attachments: uploadedUrls,
    });

    return Response.json({ message: "Message created successfully." }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  
  return Response.json({ messages }, { status: 200 });
}
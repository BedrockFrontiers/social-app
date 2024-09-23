import AuthenticateUserUseCase from "@/domain/usecases/user/authenticate-user-usecase";
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

  const { senderId, recipientId } = await request.json();

  if (!senderId && !recipientId)
    return Response.json({ error: "Missing fields." }, { status: 401 });

  if (isNaN(senderId))
  	return Response.json({ error: "senderId field must be a number." }, { status: 400 });

  if (isNaN(recipientId))
  	return Response.json({ error: "recipientId field must be a number." }, { status: 400 });

  const messageRepository = new MessageRepository();

  return Response.json({ messages }, { status: 200 });
}
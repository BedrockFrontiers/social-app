import AuthenticateUserUseCase from "@/domain/usecases/user/authenticate-user-usecase";
import UserRepository from "@/infrastructure/repositories/user-repository";
import MessageRepository from "@/infrastructure/repositories/message-repository";

export async function POST(request) {
  const authenticateUserUseCase = new AuthenticateUserUseCase();
  let gid;

  try {
    const accessGID = request.headers.get("Authorization");
    gid = await authenticateUserUseCase.execute(accessGID);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }

  const { recipientId } = await request.json();

  if (!recipientId)
    return Response.json({ error: "Missing fields." }, { status: 401 });

  if (isNaN(recipientId))
    return Response.json({ error: "recipientId field must be a number." }, { status: 400 });

  const messageRepository = new MessageRepository();
  const userRepository = new UserRepository();

  const existingUser = await userRepository.findByGID(gid);
  if (!existingUser)
    return Response.json({ error: "G-ID invalid." }, { status: 400 });
  
  const messages = await messageRepository.getMessagesWithUser(existingUser.id, parseInt(recipientId));

  return Response.json({ messages }, { status: 200 });
}
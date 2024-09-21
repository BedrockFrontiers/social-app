import AuthenticateUserUseCase from "@/domain/usecases/user/authenticate-user-usecase";
import CommentRepository from "@/infrastructure/repositories/comment-repository";
import UserRepository from "@/infrastructure/repositories/user-repository";
import ImgurRepository from "@/infrastructure/repositories/imgur-repository";
import CreateReplyUseCase from "@/domain/usecases/posts/comment/create-reply-usecase";

export async function POST(request) {
  const authenticateUserUseCase = new AuthenticateUserUseCase();
  let gid;

  try {
    const accessGID = request.headers.get("Authorization");
    gid = await authenticateUserUseCase.execute(accessGID);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }

  const { content, commentId, attachments } = await request.json();

  if (!content && !attachments)
    return Response.json({ error: "Missing fields." }, { status: 401 });

  const commentRepository = new CommentRepository();
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

  const createReplyUseCase = new CreateReplyUseCase(userRepository, commentRepository);

  try {
    await createReplyUseCase.execute({
      gid,
      content,
      commentId,
      attachments: uploadedUrls,
    });

    return Response.json({ message: "Reply created successfully." }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
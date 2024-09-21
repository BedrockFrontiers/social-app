import AuthenticateUserUseCase from "@/domain/usecases/user/authenticate-user-usecase";
import PostRepository from "@/infrastructure/repositories/post-repository";
import CommentRepository from "@/infrastructure/repositories/comment-repository";
import UserRepository from "@/infrastructure/repositories/user-repository";
import ImgurRepository from "@/infrastructure/repositories/imgur-repository";
import CreateCommentUseCase from "@/domain/usecases/posts/comment/create-comment-usecase";
import DeleteCommentUseCase from "@/domain/usecases/posts/comment/delete-comment-usecase";

export async function POST(request) {
  const authenticateUserUseCase = new AuthenticateUserUseCase();
  let gid;

  try {
    const accessGID = request.headers.get("Authorization");
    gid = await authenticateUserUseCase.execute(accessGID);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }

  const { content, postId, attachments } = await request.json();

  if (!content && !attachments)
    return Response.json({ error: "Missing fields." }, { status: 401 });

  const postRepository = new PostRepository();
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

  const createCommentUseCase = new CreateCommentUseCase(userRepository, commentRepository, postRepository);

  try {
    await createCommentUseCase.execute({
      gid,
      content,
      postId,
      attachments: uploadedUrls,
    });

    return Response.json({ message: "Comment created successfully." }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const authenticateUserUseCase = new AuthenticateUserUseCase();
  let gid;

  try {
    const accessGID = request.headers.get("Authorization");
    gid = await authenticateUserUseCase.execute(accessGID);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }

  const { commentId } = await request.json();

  if (!commentId)
    return Response.json({ error: "Missing fields." }, { status: 401 });

  const commentRepository = new CommentRepository();
  const userRepository = new UserRepository();

  const deleteCommentUseCase = new DeleteCommentUseCase(userRepository, commentRepository);

  try {
    await deleteCommentUseCase.execute({
      gid,
      commentId
    });

    return Response.json({ message: "Comment deleted successfully." }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
import AuthenticateUserUseCase from "@/domain/usecases/user/authenticate-user-usecase";
import PostRepository from "@/infrastructure/repositories/post-repository";
import UserRepository from "@/infrastructure/repositories/user-repository";
import ImgurRepository from "@/infrastructure/repositories/imgur-repository";
import CreatePostUseCase from "@/domain/usecases/posts/create-post-usecase";
import DeletePostUseCase from "@/domain/usecases/posts/delete-post-usecase";

export async function POST(request) {
  const authenticateUserUseCase = new AuthenticateUserUseCase();
  let gid;

  try {
    const accessGID = request.headers.get("Authorization");
    gid = await authenticateUserUseCase.execute(accessGID);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }

  const { content, nsfw, attachments } = await request.json();

  if (!content && !attachments)
    return Response.json({ error: "Missing fields." }, { status: 401 });

  const postRepository = new PostRepository();
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

  const createPostUseCase = new CreatePostUseCase(userRepository, postRepository);

  try {
    const data = await createPostUseCase.execute({
      gid,
      content,
      nsfw,
      attachments: uploadedUrls,
    });

    return Response.json({ message: "Post created successfully.", data }, { status: 201 });
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

  const { postId } = await request.json();

  if (!postId)
    return Response.json({ error: "Missing fields." }, { status: 401 });

  const postRepository = new PostRepository();
  const userRepository = new UserRepository();

  const deletePostUseCase = new DeletePostUseCase(userRepository, postRepository);

  try {
    await deletePostUseCase.execute({
      gid,
      postId
    });

    return Response.json({ message: "Post deleted successfully." }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
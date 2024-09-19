import AuthenticateUserUseCase from "@/domain/usecases/user/authenticate-user-usecase";
import PostRepository from "@/infrastructure/repositories/post-repository";
import ImgurRepository from "@/infrastructure/repositories/imgur-repository";
import CreatePostUseCase from "@/domain/usecases/post/create-post-usecase";

export async function POST(request) {
  const authenticateUserUseCase = new AuthenticateUserUseCase();
  let gid;

  try {
    const accessGID = request.headers.get("Authorization");
    gid = await authenticateUserUseCase.execute(accessGID);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }

  const formData = await request.formData();
  const postRepository = new PostRepository();
  const imgurRepository = new ImgurRepository();

  const content = formData.get("content");
  const attachments = formData.getAll("attachments");

  const uploadedUrls = [];

  // Upload all attachments to Imgur
  for (const attachment of attachments) {
    const attachmentBase64 = attachment;
    const uploadResponse = await imgurRepository.uploadImage(attachmentBase64);

    if (uploadResponse.error) {
      return Response.json({ error: uploadResponse.error }, { status: 400 });
    }

    uploadedUrls.push(uploadResponse.link);
  }

  const createPostUseCase = new CreatePostUseCase(postRepository);

  try {
    await createPostUseCase.execute({
      gid,
      content,
      attachments: uploadedUrls,
    });

    return Response.json({ message: "Post created successfully." }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

import AuthenticateUserUseCase from "@/domain/usecases/user/authenticate-user-usecase";
import UserRepository from "@/infrastructure/repositories/user-repository";
import ImgurRepository from "@/infrastructure/repositories/imgur-repository";
import UpdateUserUseCase from "@/domain/usecases/user/update-user-usecase";

export async function PATCH(request) {
	const authenticateUserUseCase = new AuthenticateUserUseCase();
	let gid;

	try {
		const accessGID = request.headers.get("Authorization");
		gid = await authenticateUserUseCase.execute(accessGID);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 401 })
	}

	const { displayName, bio, avatar, banner } = await request.json();

	let avatarUrl = null;
	let bannerUrl = null;

	if (avatar) {
    const avatarUpload = await imgurRepository.uploadImage(avatar);
    if (avatarUpload.error) {
      return Response.json({ error: avatarUpload.error }, { status: 400 });
    }
    avatarUrl = avatarUpload.link;
  }

  if (banner) {
    const bannerUpload = await imgurRepository.uploadImage(banner);
    if (bannerUpload.error) {
      return Response.json({ error: bannerUpload.error }, { status: 400 });
    }
    bannerUrl = bannerUpload.link;
  }

  const userRepository = new UserRepository();
  const updateUserUseCase = new UpdateUserUseCase(userRepository);

	try {
    await updateUserUseCase.execute({
      gid,
      username: displayName,
      bio,
      avatarUrl,
      bannerUrl,
    });

    return Response.json({ message: "Account updated successfully." }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

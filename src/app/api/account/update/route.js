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

	const formData = await request.formData();
	const userRepository = new UserRepository();
	const imgurRepository = new ImgurRepository();

	const avatarBase64 = formData.get("avatar");
  const bannerBase64 = formData.get("banner");

	const avatarUrl = await imgurRepository.uploadImage(avatarBase64);
	const bannerUrl = await imgurRepository.uploadImage(bannerBase64);

	if (avatarUrl.error || bannerUrl.error)
		return Response.json({ error: avatarUrl.error }, { status: 400 });

	const updateUserUseCase = new UpdateUserUseCase(userRepository);
	await updateUserUseCase.execute({ gid, username: formData.get("displayName"), bio: formData.get("bio"), avatarUrl: avatarUrl.link, bannerUrl: bannerUrl.link });

	return Response.json({ message: "Account updated successfully." }, { status: 200 });
}

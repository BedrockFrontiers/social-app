import AuthenticateUserUseCase from "@/domain/usecases/user/authenticate-user-usecase";
import UploadImageUseCase from "@/domain/usecases/imgur/upload-image-usecase";

export async function POST(request) {
	const authenticateUserUseCase = new AuthenticateUserUseCase();

	try {
		const accessGID = request.headers.get("Authorization");
		await authenticateUserUseCase.execute(accessGID);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 401 })
	}

	const formData = await request.formData();
	const image = formData.get("attachment");

	if (!image)
		return Response.json({ error: "No image provided." }, { status: 400 });

	if (!image.type.startsWith("image/"))
		return Response.json({ error: "File is not an image." }, { status: 400 });

	const imgurUseCase = new UploadImageUseCase();
	const result = await imgurUseCase.execute(image);

	return Response.json({ message: "Image uploaded successfully.", result }, { status: 200 });
}
import UploadImageUseCase from "@/domain/usecases/imgur/upload-image-usecase";
import SessionRepository from "@/infrastructure/repositories/session-repository";

export async function GET(request) {
	const sessionRepository = new SessionRepository();
	const accessGID = request.headers.get("Authorization");

  if (!accessGID || !accessGID.startsWith("G-ID"))
    return Response.json({ error: "Invalid or missing G-ID." }, { status: 401 });

  const gid = accessGID.replace("G-ID ", '');
	const isValid = await sessionRepository.validate(gid);

	if (!isValid)
		return Response.json({ error: "Invalid G-ID." }, { status: 401 });

	return new Response("hi!");
}
import AuthenticateUserUseCase from "@/domain/usecases/user/authenticate-user-usecase";
import UserRepository from "@/infrastructure/repositories/user-repository";
import RepostRepository from "@/infrastructure/repositories/repost-repository";
import PostRepository from "@/infrastructure/repositories/post-repository";
import CreateRepostUseCase from "@/domain/usecases/posts/create-repost-usecase";
import RemoveRepostUseCase from "@/domain/usecases/posts/remove-repost-usecase";

export async function POST(request) {
	const { postId } = await request.json();
	const authenticateUserUseCase = new AuthenticateUserUseCase();
	let gid;

	if (!postId)
		return Response.json({ error: "Missing required fields." }, { status: 400 });

	try {
		const accessGID = request.headers.get("Authorization");
		gid = await authenticateUserUseCase.execute(accessGID);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 401 })
	}

	const userRepository = new UserRepository();
	const postRepository = new PostRepository();
	const repostRepository = new RepostRepository();
	const createRepostUseCase = new CreateRepostUseCase(userRepository, repostRepository, postRepository);

	try {
		await createRepostUseCase.execute({ gid, postId });
		return Response.json({ message: "Repost created successfully." }, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 400 });
	}
}

export async function DELETE(request) {
	const { postId } = await request.json();
	const authenticateUserUseCase = new AuthenticateUserUseCase();
	let gid;

	if (!postId)
		return Response.json({ error: "Missing required fields." }, { status: 400 });

	try {
		const accessGID = request.headers.get("Authorization");
		gid = await authenticateUserUseCase.execute(accessGID);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 401 })
	}

	const userRepository = new UserRepository();
	const postRepository = new PostRepository();
	const repostRepository = new RepostRepository();
	const removeRepostUseCase = new RemoveRepostUseCase(userRepository, repostRepository, postRepository);

	try {
		await removeRepostUseCase.execute({ gid, postId });
		return Response.json({ message: "Repost removed successfully." }, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 400 });
	}
}
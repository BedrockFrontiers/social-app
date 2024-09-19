import AuthenticateUserUseCase from "@/domain/usecases/user/authenticate-user-usecase";
import UserRepository from "@/infrastructure/repositories/user-repository";
import LikeRepository from "@/infrastructure/repositories/like-repository";
import PostRepository from "@/infrastructure/repositories/post-repository";
import CreateLikeUserUseCase from "@/domain/usecases/posts/like/create-like-usecase";
import RemoveLikeUserUseCase from "@/domain/usecases/posts/like/remove-like-usecase";

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
	const likeRepository = new LikeRepository();
	const createLikeUseCase = new CreateLikeUserUseCase(userRepository, likeRepository, postRepository);

	try {
		await createLikeUseCase.execute({ gid, postId });
		return Response.json({ message: "Post liked successfully." }, { status: 200 });
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
	const likeRepository = new LikeRepository();
	const removeLikeUseCase = new RemoveLikeUserUseCase(userRepository, likeRepository, postRepository);

	try {
		await removeLikeUseCase.execute({ gid, postId });
		return Response.json({ message: "Post like removed successfully." }, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 400 });
	}
}
import AuthenticateUserUseCase from "@/domain/usecases/user/authenticate-user-usecase";
import UserRepository from "@/infrastructure/repositories/user-repository";
import CommentLikeRepository from "@/infrastructure/repositories/comment-like-repository";
import CommentRepository from "@/infrastructure/repositories/comment-repository";
import CreateCommentLikeUseCase from "@/domain/usecases/posts/comment/like/create-comment-like-usecase";
import RemoveCommentLikeUseCase from "@/domain/usecases/posts/comment/like/remove-comment-like-usecase";

export async function POST(request) {
	const { commentId } = await request.json();
	const authenticateUserUseCase = new AuthenticateUserUseCase();
	let gid;

	if (!commentId)
		return Response.json({ error: "Missing required fields." }, { status: 400 });

	try {
		const accessGID = request.headers.get("Authorization");
		gid = await authenticateUserUseCase.execute(accessGID);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 401 })
	}

	const userRepository = new UserRepository();
	const commentRepository = new CommentRepository();
	const commentLikeRepository = new CommentLikeRepository();
	const createCommentLikeUseCase = new CreateCommentLikeUseCase(userRepository, commentLikeRepository, commentRepository);

	try {
		await createCommentLikeUseCase.execute({ gid, commentId });
		return Response.json({ message: "Comment liked successfully." }, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 400 });
	}
}

export async function DELETE(request) {
	const { commentId } = await request.json();
	const authenticateUserUseCase = new AuthenticateUserUseCase();
	let gid;

	if (!commentId)
		return Response.json({ error: "Missing required fields." }, { status: 400 });

	try {
		const accessGID = request.headers.get("Authorization");
		gid = await authenticateUserUseCase.execute(accessGID);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 401 })
	}

	const userRepository = new UserRepository();
	const commentRepository = new CommentRepository();
	const commentLikeRepository = new CommentLikeRepository();
	const removeCommentLikeUseCase = new RemoveCommentLikeUseCase(userRepository, commentLikeRepository, commentRepository);

	try {
		await removeCommentLikeUseCase.execute({ gid, commentId });
		return Response.json({ message: "Comment like removed successfully." }, { status: 200 });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 400 });
	}
}

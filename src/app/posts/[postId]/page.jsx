import MainHeader from "@/presentation/components/MainHeader";
import MainStructure from "@/presentation/components/MainStructure";
import PostRepository from "@/infrastructure/repositories/post-repository";
import LikeRepository from "@/infrastructure/repositories/like-repository";
import Post from "@/presentation/components/Post";
import getAccount from "@/shared/utils/account/get-account-util";

export default async function ViewPost({ params }) {
	const { postId } = params;
	const me = await getAccount("@me");
	const postRepository = new PostRepository();
	const likeRepository = new LikeRepository();
	const post = await postRepository.findById(parseInt(postId));

	if (!post) {
		return (
		  <MainStructure className="p-4">
		    <p className="text-sm">Post <strong>{postId}</strong> doesn&apos;t exist.</p>
		    <p className="text-sm">Probably the id of post is wrong, e.g. (2)</p>
		    <p className="text-sm">Or really this post is deleted or not created yet.</p>
		  </MainStructure>
		);
	}

	const isLiked = await likeRepository.exists(me?.prisma.id, post.id);

	return (
		<MainStructure>
			<MainHeader returnRoute={`/profile/${post.author.identifier}`}>
				<h3 className="select-none font-bold text-xl">{post.author.identifier} post</h3>
			</MainHeader>
			<div>
				<Post post={post} me={me} isLiked={isLiked} linkable={false} />
			</div>
		</MainStructure>
	);
}
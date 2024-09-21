import MainHeader from "@/presentation/components/MainHeader";
import MainStructure from "@/presentation/components/MainStructure";
import PostRepository from "@/infrastructure/repositories/post-repository";
import LikeRepository from "@/infrastructure/repositories/like-repository";
import CommentLikeRepository from "@/infrastructure/repositories/comment-like-repository";
import PagePost from "@/presentation/components/PagePost";
import Comment from "@/presentation/components/UI/Post/Comment";
import getAccount from "@/shared/utils/account/get-account-util";
import Image from "next/image";

export async function generateMetadata({ params }) {
	const { postId } = params;
	const postRepository = new PostRepository();
	const post = await postRepository.findById(parseInt(postId));

	if (!post) {
		return {
      title: `Post ${postId} Not Found`,
      description: `The post with ID ${postId} does not exist or is not active.`,
    };
	}

	const images = post.attachments.map((url) => ({
    url: url,
    width: 800,
    height: 800,
    alt: `Attachment from ${post.author.identifier} post`,
  }));

	return {
		title: `${post.author.identifier} post`,
		description: post.content,
		openGraph: {
			title: `${post.author.identifier} post`,
			description: post.content,
			images
		},
		twitter: {
			card: "summary_large_image",
			title: `${post.author.identifier} post`,
			description: post.content,
			image: images.length > 0 ? images[0] : ''
		}
	};
}

export default async function ViewPost({ params }) {
	const { postId } = params;
	const me = await getAccount("@me");
	const postRepository = new PostRepository();
	const likeRepository = new LikeRepository();
	const commentLikeRepository = new CommentLikeRepository();
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

	async function addIsLikedToComments() {
	  for (let i = 0; i < post.comments.length; i++) {
	    post.comments[i].isLiked = await commentLikeRepository.exists(me?.prisma.id, post.comments[i].id);
	  }
	}

	await addIsLikedToComments();

	return (
		<MainStructure>
			<MainHeader returnRoute={`/profile/${post.author.identifier}`}>
				<h3 className="select-none font-bold text-xl">{post.author.identifier} Post</h3>
			</MainHeader>
			<div>
				<PagePost post={post} me={me} isLiked={isLiked} />
			</div>
			<hr className="themed-border" />
			<div>
				{post.comments.map((comment, index) => (
					<div key={index}>
						{!comment.parentId && (
							<div>
								<div className="p-4">
									<Comment me={me} comment={comment} isLiked={comment.isLiked} linkable={true} />
								</div>
								<hr className="themed-border" />
							</div>
						)}
					</div>
				))}
			</div>
		</MainStructure>
	);
}

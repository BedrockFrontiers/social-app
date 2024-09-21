import MainHeader from "@/presentation/components/MainHeader";
import MainStructure from "@/presentation/components/MainStructure";
import CommentRepository from "@/infrastructure/repositories/comment-repository";
import CommentLikeRepository from "@/infrastructure/repositories/comment-like-repository";
import Comment from "@/presentation/components/UI/Post/Comment";
import PageComment from "@/presentation/components/UI/Post/PageComment";
import getAccount from "@/shared/utils/account/get-account-util";
import Image from "next/image";

export async function generateMetadata({ params }) {
	const { commentId } = params;
	const commentRepository = new CommentRepository();
	const comment = await commentRepository.findById(parseInt(commentId));

	if (!comment) {
		return {
      title: `Comment ${commentId} Not Found`,
      description: `The comment with ID ${commentId} does not exist or is not active.`,
    };
	}

	const images = comment.attachments.map((url) => ({
    url: url,
    width: 800,
    height: 800,
    alt: `Attachment from ${comment.author.identifier} comment`,
  }));

	return {
		title: `${comment.author.identifier} comment`,
		description: comment.content,
		openGraph: {
			title: `${comment.author.identifier} comment`,
			description: comment.content,
			images
		},
		twitter: {
			card: "summary_large_image",
			title: `${comment.author.identifier} comment`,
			description: comment.content,
			image: images.length > 0 ? images[0] : ''
		}
	};
}

export default async function ViewComment({ params }) {
	const { commentId } = params;
	const me = await getAccount("@me");
	const commentRepository = new CommentRepository();
	const commentLikeRepository = new CommentLikeRepository();
	const comment = await commentRepository.findById(parseInt(commentId));

	if (!comment) {
		return (
		  <MainStructure className="p-4">
		    <p className="text-sm">Post <strong>{commentId}</strong> doesn&apos;t exist.</p>
		    <p className="text-sm">Probably the id of comment is wrong, e.g. (2)</p>
		    <p className="text-sm">Or really this comment is deleted or not created yet.</p>
		  </MainStructure>
		);
	}

	const isLiked = await commentLikeRepository.exists(me?.prisma.id, comment.id);

	async function addIsLikedToReplies() {
	  for (let i = 0; i < comment.replies.length; i++) {
	    comment.replies[i].isLiked = await commentLikeRepository.exists(me?.prisma.id, comment.replies[i].id);
	  }
	}

	await addIsLikedToReplies();

	return (
		<MainStructure>
			<MainHeader returnRoute={comment.parentId ? `/comment/${comment.parentId}` : `/posts/${comment.postId}`}>
				<h3 className="select-none font-bold text-xl">{comment.author.identifier} Comment</h3>
			</MainHeader>
			<div>
				<PageComment me={me} comment={comment} isLiked={comment.isLiked} />
			</div>
			<hr className="themed-border" />
			<div>
				{comment.replies.map((reply, index) => (
					<div key={index}>
						{reply.parentId === comment.id && (
							<div>
								<div className="p-4">
									<Comment me={me} comment={reply} isLiked={reply.isLiked} linkable={true} />
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

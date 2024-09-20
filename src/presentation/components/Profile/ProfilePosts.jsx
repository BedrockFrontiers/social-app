import Post from "@/presentation/components/Post";
import LikeRepository from "@/infrastructure/repositories/like-repository";

export default async function ProfilePosts({ user, me }) {
  const posts = user.posts;
  const likeRepository = new LikeRepository();

  async function addIsLikedToPosts() {
    for (let i = 0; i < posts.length; i++) {
      posts[i].isLiked = await likeRepository.exists(me?.prisma.id, posts[i].id);
    }
  }

  await addIsLikedToPosts();

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <Post post={post} me={me} isLiked={post.isLiked} />
          <hr className="border-gray-200 dark:border-zinc-700" />
        </div>
      ))}
    </div>
  );
}

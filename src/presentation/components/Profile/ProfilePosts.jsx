import Post from "@/presentation/components/Post";

export default async function ProfilePosts({ user, me }) {
  const posts = user.posts;
  const reposts = user.reposts;

  return (
    <div>
      {reposts.map((repost, index) => (
        <div key={index}>
          <Post post={repost.post} me={me} hasLiked={repost.post.hasLiked} hasReposted={repost.hasReposted} useRepostIndication={true} />
          <hr className="border-gray-200 dark:border-zinc-700" />
        </div>
      ))}
      {posts.map((post, index) => (
        <div key={index}>
          <Post post={post} me={me} hasLiked={post.hasLiked} hasReposted={post.hasReposted} />
          <hr className="border-gray-200 dark:border-zinc-700" />
        </div>
      ))}
    </div>
  );
}

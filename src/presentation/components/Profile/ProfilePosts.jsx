import Post from "@/presentation/components/Post";

export default function ProfilePosts({ posts }) {
  return (
    <div>
      {Object.values(posts).map((post, index) => (
        <div key={index}>
          <Post post={post} />
          <hr className="border-gray-200 dark:border-zinc-700" />
        </div>
      ))}
    </div>
  );
}
import MainStructure from "@/presentation/components/MainStructure";
import PostRepository from "@/infrastructure/repositories/post-repository";
import Post from "@/presentation/components/Post";
import getAccount from "@/shared/utils/account/get-account-util";

export default async function Home() {
  const me = await getAccount("@me");
  const postRepository = new PostRepository();
  const posts = await postRepository.findAll(me?.prisma.id);

  return (
    <MainStructure>
      <div>
        <div className="p-4 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex mt-5 gap-4 overflow-x-auto items-center">
            <div>
              <p className="select-none font-semibold text-sm">Recents</p>
            </div>
            <div>
              <p className="select-none font-semibold text-sm text-zinc-500">Following</p>
            </div>
          </div>
        </div>
        <div>
          {posts.map((post, index) => (
            <div key={index}>
              <Post post={post} me={me} hasLiked={post.hasLiked} hasReposted={post.hasReposted} />
              <hr className="border-gray-200 dark:border-zinc-700" />
            </div>
          ))}
        </div>
      </div>
    </MainStructure>
  );
}

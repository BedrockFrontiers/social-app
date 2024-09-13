import Post from "@/interfaces/web/components/Post";
import MainStructure from "@/interfaces/web/components/MainStructure";

export default function Home() {
  const posts = {
    post1: {
      "username": "Lula",
      "identifier": "@lulaoficial",
      "profileImage": "https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:a5o5pa6imrd52s627zq63zgz/bafkreiaoo5jearluynpx6fcvng3aq4xrksjc4mbacifhpbig7zsc6vxq5q@jpeg",
      "content": "Feliz 7 de setembro para todos. Viva o Brasil. 🇧🇷",
      "attachments": ["https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:a5o5pa6imrd52s627zq63zgz/bafkreifxagvkjmbbelscwgdq2w547wpnrmaku6l6kpvhuogfqcmmaswnuu@jpeg", "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:a5o5pa6imrd52s627zq63zgz/bafkreigxgybh24xd6227yao2h3nsavwey2lpv6xvmw3kqgnmp2v3uwayj4@jpeg", "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:a5o5pa6imrd52s627zq63zgz/bafkreifp6bdgenmf3j7eemgpuryuxs2lltmjtprr5hxz5i5f6es47ifwj4@jpeg", "https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:a5o5pa6imrd52s627zq63zgz/bafkreig7p7aukzugxeeh7d7rmkip6idtpyshfbflrby5cuah52bkfwswoy@jpeg"],
      "uploadedAt": "5h",
      "likes": "6.9K",
      "reposts": "809",
      "comments": "311",
      "verified": 1,
      "reposted": false
    },
    post2: {
      "username": "filipotop",
      "identifier": "@filipotop",
      "profileImage": "https://cdn.bsky.app/img/avatar/plain/did:plc:75khwetbovmfeylwszpvobu6/bafkreid5xynwkoazg4rres5wxd3fhcw2nbrmv7i3mychx4tni5lv62yovq@jpeg",
      "content": "twitter foi de base msm 😶. nao tava botando fé",
      "attachments": [],
      "uploadedAt": "6d",
      "likes": "6",
      "reposts": "",
      "comments": "3",
      "verified": 3,
      "reposted": false
    }
  }
  return (
    <MainStructure>
      <div>
        <div className="p-4 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex mt-5 gap-4 overflow-x-auto items-center">
            <div>
              <p className="select-none font-semibold text-sm">Recommended</p>
            </div>
            <div>
              <p className="select-none font-semibold text-sm text-zinc-500">Following</p>
            </div>
          </div>
        </div>
        <div className="mt-1">
          <Post post={posts.post1} />
          <hr className="border-gray-200 dark:border-zinc-700" />
          <Post post={posts.post2} />
        </div>
      </div>
    </MainStructure>
  );
}

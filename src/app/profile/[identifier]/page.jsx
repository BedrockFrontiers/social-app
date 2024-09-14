import ProfileHeader from "@/presentation/components/Profile/ProfileHeader";
import ProfilePosts from "@/presentation/components/Profile/ProfilePosts";
import MainStructure from "@/presentation/components/MainStructure";
import getVerifiedLevelName from "@/shared/utils/get-verified-level-name-utils";
import getAccount from "@/shared/utils/get-account-utils";

export default async function Profile({ params }) {
  const identifier = decodeURIComponent(params.identifier);
  const me = await getAccount("@me");
  let user = null;

  if (identifier === "@me") {
    user = me?.prisma;
  } else {
    user = await getAccount(identifier);
  }

  if (!user) {
    return (
      <MainStructure className="p-4">
        <p className="text-sm">Account <strong>{identifier}</strong> doesn&apos;t exist.</p>
        <p className="text-sm">Probably the format of identifier is wrong, e.g. (@fulano)</p>
        <p className="text-sm">Or really this account is deleted, inactive or not created yet.</p>
      </MainStructure>
    );
  }

  const verifiedName = getVerifiedLevelName(user.verified);

  const posts = {
    post1: {
      username: "datcravat クラバット🍷",
      identifier: "@datcravat",
      profileImage: "https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:knkltoiapkt336rr335ztt3p/bafkreie4jefbhqhnhh5gm4w335tkurvbwxa2orcfb4lcw7zvdikpm4onl4@jpeg",
      content: "💕",
      attachments: ["https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:knkltoiapkt336rr335ztt3p/bafkreicbfna23ghip366e65pwk7lomsfvgq2enywclwt4wrvg5k6x6gk5a@jpeg"],
      uploadedAt: "7d",
      likes: "2K",
      reposts: "575",
      comments: "25",
      verified: 1,
      reposted: true
    },
    post2: {
      username: "LINE",
      identifier: "@lineshark",
      profileImage: "https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:bokcpbnh774esg2ufsuv5pll/bafkreib77mjbyizqewnkoyjgyhrg42l2zhr2vw4x2spxp6nr6mrvcrlpmi@jpeg",
      content: '',
      attachments: ["https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:bokcpbnh774esg2ufsuv5pll/bafkreigsc6uaxkz4ifivzmigt2n2y4tzehctroppqsxo2fflsq6pyjkxha@jpeg"],
      uploadedAt: "6d",
      likes: "2K",
      reposts: "441",
      comments: "9",
      verified: 1,
      reposted: true
    },
    post3: {
      username: "Pablo .",
      identifier: "@pablosinistro",
      profileImage: "https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:mcj4fbvybjqnmzmy6o2wvozp/bafkreicad7svkswyknyrukcaajhptawaamc7siqkxyrz2rnmjnoemgcsiy@jpeg",
      content: "MF DOOM *drop the mic*",
      attachments: ["https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:mcj4fbvybjqnmzmy6o2wvozp/bafkreih5weuxqqw7lsxuk7d6nnhllbq6cc5ejjidpmy5rptridom2w4fzq@jpeg"],
      uploadedAt: "7d",
      likes: "109",
      reposts: "27",
      comments: "6",
      verified: 2,
      reposted: true
    }
  };

  return (
    <MainStructure>
    	<div>
	      <ProfileHeader user={user} verifiedName={verifiedName} me={me} />
	      <ProfilePosts posts={posts} />
      </div>
    </MainStructure>
  );
}
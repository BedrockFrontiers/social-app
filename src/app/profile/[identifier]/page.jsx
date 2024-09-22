import ProfileHeader from "@/presentation/components/Profile/ProfileHeader";
import ProfilePosts from "@/presentation/components/Profile/ProfilePosts";
import MainStructure from "@/presentation/components/MainStructure";
import getVerifiedLevelName from "@/shared/utils/user/get-verified-level-name-util";
import getAccount from "@/shared/utils/account/get-account-util";

export async function generateMetadata({ params }) {
  const identifier = decodeURIComponent(params.identifier);
  const me = await getAccount("@me");
  let user = null;

  if (identifier === "@me") {
    user = me?.prisma;
  } else {
    user = await getAccount(identifier, me?.prisma.id);
  }

  if (!user) {
    return {
      title: `Account ${identifier} Not Found`,
      description: `The account with identifier ${identifier} does not exist or is not active.`,
    };
  }

  const verifiedName = getVerifiedLevelName(user.verified);

  return {
    title: `${user.name} (${identifier})`,
    description: user.bio || `This is the profile of ${identifier}.`,
    openGraph: {
      title: `${user.name} (${identifier})`,
      description: user.bio || `This is the profile of ${identifier}.`,
      images: [
        {
          url: user.bannerUrl || "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?cs=srgb&dl=pexels-francesco-ungaro-281260.jpg&fm=jpg",
          width: 800,
          height: 800,
          alt: `Banner of ${identifier}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.name} (${identifier})`,
      description: user.bio || `This is the profile of ${identifier}.`,
      image: user.avatarUrl
    },
  };
}

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

  return (
    <MainStructure>
    	<div>
	      <ProfileHeader user={user} verifiedName={verifiedName} me={me} />
        <ProfilePosts user={user} me={me} />
      </div>
    </MainStructure>
  );
}
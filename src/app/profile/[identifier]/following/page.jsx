import MainHeader from "@/presentation/components/MainHeader";
import MainStructure from "@/presentation/components/MainStructure";
import isLogged from "@/shared/utils/account/is-logged-util";
import getAccount from "@/shared/utils/account/get-account-util";
import UserBox from "@/presentation/components/User/UserBox";

export default async function ProfileFollowing({ params }) {
	const identifier = decodeURIComponent(params.identifier);
  const me = await getAccount("@me");
  let user = await getAccount(identifier);

  if (identifier === "@me" || identifier === me?.prisma.identifier) {
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

	return (
		<MainStructure>
			<MainHeader returnRoute={`/profile/${user.identifier}`}>
				<h3 className="select-none font-bold text-xl">{ user.identifier }&#39;s following</h3>
			</MainHeader>
			<div className="mt-5">
				{user.following.map((following, index) => (
					<div key={index} className="themed-border !border-x-0 !border-t-0">
						<div className="px-4 pb-4">
							<UserBox bigger={true} full={true} me={me} user={following.follower} />
						</div>
					</div>
				))}
			</div>
		</MainStructure>
	);
}

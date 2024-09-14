"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/presentation/components/UI/Button";
import Input from "@/presentation/components/UI/Input";

export default function EditProfile({ user }) {
	const [displayName, setDisplayName] = useState(user.prisma.name);
	const [bannerUrl, setBannerUrl] = useState(user.prisma.bannerUrl || '');
	const [avatarUrl, setAvatarUrl] = useState(user.prisma.avatarUrl || '');
	const [bio, setBio] = useState(user.prisma.bio || '');

	const handleImageChange = (event, setImageUrl) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

	return (
		<div className="fixed top-0 left-0 z-50 bg-black bg-opacity-70 w-full h-full flex items-center justify-center p-4">
			<div className="rounded-xl bg-white dark:bg-black border themed-border p-4 lg:w-[550px] max-lg:w-full lg:max-h-[500px] max-lg:h-full overflow-y-auto">
				<div>
					<h3 className="text-xl font-semibold">Edit Profile</h3>
					<hr className="themed-border" />
				</div>
				<div className="mt-10">
					<div>
						<div className={`relative min-h-[200px] ${!bannerUrl && "bg-blue-500"}`}>
						  {bannerUrl && (<Image className="object-cover select-none" quality={100} src={bannerUrl} fill={true} alt="Profile Banner" />)}
						  <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setBannerUrl)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              /> 	  
						</div>
						<div className="z-10 -mt-10">
              <div className="relative w-[100px] h-[100px]">
                <Image className="rounded-full object-cover select-none border-4 border-white dark:border-black w-[100px] h-[100px]" src={avatarUrl} width={100} height={100} quality={100} alt="Profile Picture" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setAvatarUrl)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
					</div>
					<div className="my-5">
						<div className="my-5">
							<p className="text-sm font-semibold">Display Name</p>
							<Input 
								type="text"
								value={displayName}
								onChange={(e) => setDisplayName(e.target.value)}
								placeholder="e.g. Edgar Vivar"
							/>
						</div>
						<div className="my-5">
							<p className="text-sm font-semibold">Bio</p>
							<textarea 
								className="min-h-[300px] w-full border themed-border rounded-xl resize-none outline-none p-4 text-sm" 
								value={bio}
								onChange={(e) => setBio(e.target.value)}
								placeholder="e.g. Hello, i'm using Tidal Social."
							>
							</textarea>
						</div>
					</div>
					<div className="relative flex flex-col gap-4 mt-auto">
						<Button className="rounded-3xl text-sm">Save Changes</Button>
						<Button className="rounded-3xl text-sm bg-transparent hover:bg-transparent !text-black border-none">Cancel</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
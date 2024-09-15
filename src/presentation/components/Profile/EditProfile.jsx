"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/presentation/components/UI/Button";
import Input from "@/presentation/components/UI/Input";

export default function EditProfile({ user, onClose }) {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const [displayName, setDisplayName] = useState(user.prisma.name);
	const [bannerUrl, setBannerUrl] = useState(user.prisma.bannerUrl || '');
	const [avatarUrl, setAvatarUrl] = useState(user.prisma.avatarUrl || '');
	const [selectedBannerFile, setSelectedBannerFile] = useState(null);
	const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
	const [bio, setBio] = useState(user.prisma.bio || '');

	const handleImageChange = (event, setImageUrl, setFile) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
      	const base64Image = reader.result;

        setImageUrl(base64Image);
        setFile(base64Image.replace(/^data:image\/(png|jpg|webp|jpeg);base64,/, ''));
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleUpdateProfile() {
  	setLoading(true);
  	setSuccess(false);
  	setError('');

  	const formData = new FormData();
    formData.append("displayName", displayName);
    formData.append("bio", bio);

    if (selectedAvatarFile)
    	formData.append("avatar", selectedAvatarFile);

    if (selectedBannerFile)
    	formData.append("banner", selectedBannerFile);

    const res = await fetch("/api/account/update", {
    	method: "PATCH",
    	headers: {
    		"Authorization": `G-ID ${user.id}`
    	},
    	body: formData
    });

    const data = await res.json();

    if (res.ok)
    	setSuccess(true);
    else 
    	setError(data.error);

    setLoading(false);
  }

	return (
		<div className="fixed top-0 left-0 z-50 bg-black bg-opacity-70 w-full h-full flex items-center justify-center p-4">
			<div className="relative lg:rounded-xl bg-white dark:bg-zinc-900 themed-border p-4 max-lg:w-full lg:w-[550px] max-lg:h-full lg:max-h-[500px] max-lg:max-h-full overflow-y-auto">
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
                onChange={(e) => handleImageChange(e, setBannerUrl, setSelectedBannerFile)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              /> 	  
						</div>
						<div className="z-10 -mt-10">
              <div className="relative w-[100px] h-[100px]">
                <Image className="rounded-full object-cover select-none border-4 border-white dark:border-black w-[100px] h-[100px]" src={avatarUrl} width={100} height={100} quality={100} alt="Profile Picture" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setAvatarUrl, setSelectedAvatarFile)}
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
						{success && (<p className="text-xs text-green-500 font-semibold text-center select-none">Account updated. Refresh to apply changes.</p>)}
						<p className="text-xs text-red-500 font-semibold text-center select-none">{error}</p>
						<Button disabled={loading} onClick={handleUpdateProfile} className="rounded-3xl text-sm">{loading ? "Wait..." : "Apply Changes"}</Button>
						<Button disabled={loading} onClick={onClose} className="rounded-3xl text-sm bg-transparent hover:bg-transparent !text-black border-none">{loading ? "Wait..." : "Cancel"}</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

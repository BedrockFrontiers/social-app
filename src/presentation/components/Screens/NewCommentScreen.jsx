"use client";

import { useState } from "react";
import { MdOutlineImage, MdClose, MdOutlineMovie } from "react-icons/md";
import { useRouter } from "next/navigation";
import MediaModal from "@/presentation/components/Media/MediaModal";

export default function NewCommentScreen({ me, postId, onClose }) {
	const router = useRouter();
	const [content, setContent] = useState('');
	const [attachments, setAttachments] = useState([]);
	const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handlePost() {
  	setLoading(true);
    setSuccess(false);
    setError('');

    if (content.trim().length < 2) {
    	setError("Comment content must be atleast 2 characters length.");
    	setLoading(false);
    	return;
    }

    const commentPayload = {
	    content: content,
	    postId: postId,
	    attachments: attachments.map(attachment => attachment.file)
	  };

		try {
      const response = await fetch("/api/services/posts/comment", {
        method: "POST",
				headers: {
					"Authorization": `G-ID ${me.prisma.gid}`,
					"Content-Type": "application/json"
				},
        body: JSON.stringify(commentPayload),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to comment");
      }
    } catch (err) {
      setError("An error occurred while commenting");
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  function handleMediaUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Media = reader.result;
        const newMedia = {
          id: base64Media,
          file: base64Media.replace(/^data:(image|video)\/(png|jpg|jpeg|gif|mp4|webm|ogg);base64,/, ''),
          type: file.type.startsWith("video") ? "video" : "image"
        };
      	const alreadyExists = attachments.some(
  	      (attachment) => attachment.id === newMedia.id
  	    );
  	    if (alreadyExists) return;

        setAttachments(prevMedia => [...prevMedia, newMedia]);
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    }
  }

  function handleRemoveMedia(id) {
    setAttachments(prevMedia => prevMedia.filter(media => media.id !== id));
  }

  function handleEditMedia(event, id) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Media = reader.result;
        const updatedMedia = {
          id: base64Media,
          file: base64Media.replace(/^data:(image|video)\/(png|jpg|jpeg|gif|mp4|webm|ogg);base64,/, ''),
          type: file.type.startsWith("video") ? "video" : "image"
        };
        setAttachments(prevMedia => prevMedia.map(media => media.id === id ? updatedMedia : media));
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    }
  }

	return (
		<div className="fixed top-0 left-0 z-50 bg-black bg-opacity-70 w-full h-full lg:flex lg:items-center lg:justify-center lg:p-4">
			<div className="relative lg:rounded-xl bg-white dark:bg-zinc-900 themed-border p-4 max-lg:w-full lg:w-[550px] max-lg:h-full max-lg:max-h-full lg:max-h-[500px] overflow-y-auto">
				<div className="flex items-center justify-between">
					<button onClick={onClose} className="text-sm font-semibold text-blue-500">Cancel</button>
					<button disabled={loading} onClick={handlePost} className="text-sm font-semibold bg-blue-500 text-white transition duration-200 hover:bg-opacity-70 py-2 min-w-[80px] rounded-full">{loading ? "Commenting..." : "Comment"}</button>
				</div>
				<div>
				  {success && (<p className="text-xs text-green-500 font-semibold text-center select-none">Comment published successfully.</p>)}
					<p className="text-xs text-red-500 font-semibold text-center select-none">{error}</p>
				</div>
				<div className="mt-4">
					<textarea 
						className="min-h-[200px] w-full border themed-border rounded-xl resize-none outline-none p-4 text-sm dark:text-white" 
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="What you think?"
					>
					</textarea>
				</div>
				<div className="mt-4 grid grid-cols-2 gap-2">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="relative">
              <MediaModal src={attachment.id} className="w-full aspect-square rounded-lg object-cover cursor-pointer" width={1000} height={1000} alt={`Preview ${attachment.id}`} />
              <button onClick={() => handleRemoveMedia(attachment.id)} className="absolute top-2 right-2 text-white bg-black dark:text-black dark:bg-white bg-opacity-70 rounded-full p-1">
                <MdClose size={20} />
              </button>
              <button className="absolute bottom-2 right-2 text-white bg-black dark:text-black dark:bg-white bg-opacity-70 rounded-full p-1">
              	{attachment.type === "image" ? (
              		<div>
              			<MdOutlineImage size={20} />
              			<input
              			  type="file"
              			  accept="image/*"
              			  onChange={(e) => handleEditMedia(e, attachment.id)}
              			  className="absolute inset-0 opacity-0 z-10"
              			/>
              		</div>
              	) : (
              		<div>
              			<MdOutlineMovie size={20} />
              			<input
              			  type="file"
              			  accept="video/mp4,video/ogg, video/webm"
              			  onChange={(e) => handleEditMedia(e, attachment.id)}
              			  className="absolute inset-0 opacity-0 z-10"
              			/>
              		</div>
              	)}
              </button>
            </div>
          ))}
        </div>
        {attachments.length > 0 && <p className="mt-2 text-xs text-zinc-600">When uploading images/videos, please ensure that they adhere to our community guidelines. Avoid uploading any content that might be considered sensitive, explicit, or inappropriate.</p>}
				<hr className="themed-border my-4" />
				<div className="flex items-center gap-4">
					<div className="relative group">
						<div className="cursor-pointer text-blue-500 transition duration-200 group-hover:bg-blue-300 group-hover:bg-opacity-70 rounded-full p-1">
							<MdOutlineImage size={25} />
						</div>
						<input
						  type="file"
						  accept="image/*"
						  onChange={handleMediaUpload}
						  className="absolute inset-0 opacity-0 z-10"
						/>
					</div>
					<div className="relative group">
						<div className="cursor-pointer text-blue-500 transition duration-200 group-hover:bg-blue-300 group-hover:bg-opacity-70 rounded-full p-1">
							<MdOutlineMovie size={25} />
						</div>
						<input
						  type="file"
						  accept="video/mp4,video/ogg, video/webm"
						  onChange={handleMediaUpload}
						  className="absolute inset-0 opacity-0 z-10"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
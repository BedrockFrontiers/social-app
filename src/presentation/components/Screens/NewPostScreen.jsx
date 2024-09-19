"use client";

import { useState } from "react";
import { MdOutlineImage, MdClose } from "react-icons/md";
import MediaModal from "@/presentation/components/Media/MediaModal";

export default function NewPostScreen({ me, onClose }) {
	const [content, setContent] = useState('');
	const [attachments, setAttachments] = useState([]);
	const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handlePost() {
  	setLoading(true);
    setSuccess(false);
    setError('');

    const formData = new FormData();
    formData.append("content", content);

    attachments.forEach(attachment => {
      formData.append("attachments", attachment.file);
    });

		try {
      const response = await fetch("/api/services/posts", {
        method: "POST",
				headers: {
					"Authorization": `G-ID ${me.prisma.gid}`
				},
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to post");
      }
    } catch (err) {
      setError("An error occurred while posting");
    } finally {
      setLoading(false);
    }
  }

	function handleImageUpload(event) {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      id: URL.createObjectURL(file),
      file: file
    }));
    setAttachments(prevImages => [...prevImages, ...newImages]);
  }

	function handleEditImage(event, id) {
    const file = event.target.files[0];
    if (file) {
      const newImage = {
        id: URL.createObjectURL(file),
        file: file
      };
      setAttachments(prevImages => prevImages.map(image =>
        image.id === id ? newImage : image
      ));
    }
  }

  function handleRemoveImage (id) {
    setAttachments(prevImages => prevImages.filter(image => image.id !== id));
  }

	return (
		<div className="fixed top-0 left-0 z-50 bg-black bg-opacity-70 w-full h-full lg:flex lg:items-center lg:justify-center lg:p-4">
			<div className="relative lg:rounded-xl bg-white dark:bg-zinc-900 themed-border p-4 max-lg:w-full lg:w-[550px] max-lg:h-full max-lg:max-h-full lg:max-h-[500px] overflow-y-auto">
				<div className="flex items-center justify-between">
					<button onClick={onClose} className="text-sm font-semibold text-blue-500">Cancel</button>
					<button disabled={loading} onClick={handlePost} className="text-sm font-semibold bg-blue-500 text-white transition duration-200 hover:bg-opacity-70 py-2 min-w-[80px] rounded-full">{loading ? "Posting..." : "Post"}</button>
				</div>
				<div>
				  {success && (<p className="text-xs text-green-500 font-semibold text-center select-none">Post published successfully.</p>)}
					<p className="text-xs text-red-500 font-semibold text-center select-none">{error}</p>
				</div>
				<div className="mt-4">
					<textarea 
						className="min-h-[200px] w-full border themed-border rounded-xl resize-none outline-none p-4 text-sm" 
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
              <button onClick={() => handleRemoveImage(attachment.id)} className="absolute top-2 right-2 text-white bg-black dark:text-black dark:bg-white bg-opacity-70 rounded-full p-1">
                <MdClose size={20} />
              </button>
              <button className="absolute bottom-2 right-2 text-white bg-black dark:text-black dark:bg-white bg-opacity-70 rounded-full p-1">
                <MdOutlineImage size={20} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleEditImage(e, attachment.id)}
                  className="absolute inset-0 opacity-0 z-10"
                />
              </button>
            </div>
          ))}
        </div>
        {attachments.length > 0 && <p className="mt-2 text-xs text-zinc-600">When uploading images, please ensure that they adhere to our community guidelines. Avoid uploading any content that might be considered sensitive, explicit, or inappropriate.</p>}
				<hr className="themed-border my-4" />
				<div className="flex items-center gap-4">
					<div className="relative group">
						<div className="cursor-pointer text-blue-500 transition duration-200 group-hover:bg-blue-300 group-hover:bg-opacity-70 rounded-full p-1">
							<MdOutlineImage size={25} />
						</div>
						<input
						  type="file"
						  accept="image/*"
						  onChange={handleImageUpload}
						  id="file-upload"
						  className="absolute inset-0 opacity-0 z-10"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

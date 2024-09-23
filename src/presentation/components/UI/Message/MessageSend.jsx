"use client";

import { useState, useEffect } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { MdOutlineImage, MdClose, MdOutlineMovie } from "react-icons/md";
import { useRouter } from "next/navigation";
import moment from "moment";
import BuzzText from "@/presentation/components/UI/BuzzText";
import MediaModal from "@/presentation/components/Media/MediaModal";
import Input from "@/presentation/components/UI/Input";

export default function MessageSend({ me, userId }) {
	const router = useRouter();
	const [content, setContent] = useState('');
	const [attachments, setAttachments] = useState([]);
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		async function fetchMessages() {
			const messagePayload = JSON.stringify({
				recipientId: userId
			});

			const res = await fetch("/api/services/messages", {
				method: "POST",
				headers: {
					"Authorization": `G-ID ${me.prisma.gid}`
				},
				body: messagePayload
			});

			if (res.ok) {
				const data = await res.json();
				setMessages(data.messages);
			}
		}

		fetchMessages();
		setInterval(fetchMessages, 1500)
	}, []);

  async function handleSendMessage() {
  	setLoading(true);
    setError('');

    if (content.trim().length < 2) {
    	setError("Post content must be atleast 2 characters length.");
    	setLoading(false);
    	return;
    }

    const messagePayload = {
	    content: content,
	    senderId: me.prisma.id,
	    recipientId: userId,
	    attachments: attachments.map(attachment => attachment.file)
	  };

		try {
      const response = await fetch("/api/services/messages/send", {
        method: "POST",
				headers: {
					"Authorization": `G-ID ${me.prisma.gid}`,
					"Content-Type": "application/json"
				},
        body: JSON.stringify(postPayload),
      });

      const { data } = await response.json();
      
      if (!response.ok)
        setError(data.error);
    } catch (err) {
      setError("An error occurred while sending message");
    } finally {
      setLoading(false);
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
		<>
			<div className="flex-grow overflow-y-auto">
			  <div className="h-full flex flex-col gap-10 p-4">
			  	{messages.map((message, index) => (
			  		<div className={`m${message.senderId === userId ? 'r' : 'l'}-auto w-[max-content]`} key={index}>
				  		<div className={`w-[max-content] max-w-[500px] ${message.senderId === userId ? "bg-zinc-500" : "bg-blue-500"} rounded-bl-full rounded-tl-full rounded-tr-full p-4 text-white text-sm`}>
				  			<BuzzText content={message.content} />
				  		</div>
				  		<p className="text-xs ml-auto w-[max-content] font-semibold text-zinc-500 mt-1">{moment(message.createdAt).fromNow()}</p>
			  		</div>
			  	))}
			  </div>
			</div>
			<div>
				<div className="grid grid-cols-3 gap-2 p-4">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="relative w-[250px] h-[250px]">
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
			  <div className="p-4 max-lg:mb-20 lg:mb-4">
			  	{attachments.length > 0 && <p className="-mt-5 text-xs text-zinc-600 mb-3">When uploading images/videos, please ensure that they adhere to our community guidelines. Avoid uploading any content that might be considered sensitive, explicit, or inappropriate.</p>}
			  	<p className="text-xs text-red-500 font-semibold text-left select-none">{error}</p>
			    <Input
			      type="text"
			      boxClass="!bg-white !dark:bg-black !rounded-full themed-border"
			      value={content}
			      onChange={setContent}
			      icon={
			      	<div className="flex items-center gap-2">
			      		<div className="relative group">
			      			<div className="cursor-pointer text-blue-500 transition duration-200 group-hover:bg-blue-300 group-hover:bg-opacity-70 rounded-full p-2">
			      				<MdOutlineImage size={20} />
			      			</div>
			      			<input
			      			  type="file"
			      			  accept="image/*"
			      			  onChange={handleMediaUpload}
			      			  className="absolute inset-0 opacity-0 z-10"
			      			/>
			      		</div>
			      		<div className="relative group">
			      			<div className="cursor-pointer text-blue-500 transition duration-200 group-hover:bg-blue-300 group-hover:bg-opacity-70 rounded-full p-2">
			      				<MdOutlineMovie size={20} />
			      			</div>
			      			<input
			      			  type="file"
			      			  accept="video/mp4,video/ogg, video/webm"
			      			  onChange={handleMediaUpload}
			      			  className="absolute inset-0 opacity-0 z-10"
			      			/>
			      		</div>
				        <div disabled={loading} onClick={handleSendMessage} className="p-2 rounded-full transition duration-200 bg-blue-500 hover:bg-blue-600 cursor-pointer">
				          <BsFillSendFill className="text-white" />
				        </div>
			        </div>
			      }
			      iconEnd={true}
			      placeholder="Write a message"
			    />
			  </div>
			</div>
		</>
	);
}

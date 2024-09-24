"use client";

import { useState, useEffect, useRef } from "react"
import { BsFillSendFill } from "react-icons/bs";
import { MdOutlineImage, MdClose, MdOutlineMovie } from "react-icons/md";
import { useRouter } from "next/navigation";
import moment from "moment";
import BuzzText from "@/presentation/components/UI/BuzzText";
import MediaModal from "@/presentation/components/Media/MediaModal";
import Input from "@/presentation/components/UI/Input";
import Image from "next/image";
import Attachments from "@/presentation/components/Media/Attachments";

export default function MessageSend({ me, userId }) {
	const router = useRouter();
	const [content, setContent] = useState('');
	const [attachments, setAttachments] = useState([]);
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const scrollAreaRef = useRef(null);
	const [scrolledOnce, setScrolledOnce] = useState(false);

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

		setInterval(fetchMessages, 1500);
		fetchMessages();
	}, [userId]);

	useEffect(() => {
    if (scrollAreaRef.current && !scrolledOnce) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
      setScrolledOnce(true);
    }
  }, [messages, scrolledOnce]);

  async function handleSendMessage() {
  	setLoading(true);
    setError('');

    if (content.trim().length < 1 && attachments.length === 0) {
    	setError("Message must be a content.");
    	setLoading(false);
    	return;
    }

    const messagePayload = {
	    content: content,
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
        body: JSON.stringify(messagePayload),
      });

      const data = await response.json();
      
      if (!response.ok)
        setError(data.error);
    } catch (err) {
      setError("An error occurred while sending message");
    } finally {
    	setAttachments([]);
    	setContent('');
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
		<div className="flex flex-col h-screen">
			<div className="overflow-y-auto flex-grow p-4" ref={scrollAreaRef}>
				{messages.map((message, index) => (
          <div key={index} className={`flex ${message.senderId === me.prisma.id ? "justify-end" : "justify-start"} mb-4`}>
            <div className={`flex ${message.senderId === me.prisma.id ? "flex-row-reverse" : "flex-row"} items-end`}>
            	<Image
            	  className="rounded-full select-none w-8 h-8"
            	  src={message.sender.avatarUrl}
            	  width={40}
            	  height={40}
            	  quality={100}
            	  alt="Profile Picture"
            	/>
              <div className={`mx-2 ${message.senderId === me.prisma.id ? "bg-blue-600" : "bg-gray-700"} rounded-xl p-3 max-w-xs`}>
                <p className="text-sm text-white">{message.content}</p>
                {message.attachments.length > 0 && (
                  <Attachments items={message.attachments} />
                )}
                <p className="text-xs text-gray-400 font-semibold mt-1 select-none">{moment(message.createdAt).fromNow()} - {moment(message.createdAt).format("h:mm A")}</p>
              </div>
            </div>
          </div>
        ))}
			</div>
			<div className="p-4 themed-border !border-b-0 !border-x-0">
				{attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="relative">
                <MediaModal src={attachment.id} className="w-[200px] h-[200px] aspect-square rounded-lg object-cover cursor-pointer" width={200} height={200} alt={`Preview ${attachment.id}`} />
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
        )}
        <p className="text-xs text-red-500 font-semibold text-left select-none">{error}</p>
				<div className="flex items-center space-x-2">
					<input
						type="text"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="outline-none flex-grow py-2 px-4 themed-border rounded-lg text-sm"
						placeholder="Type a message"
					/>
					<div className="flex space-x-2">
						<button className="relative themed-border rounded-lg bg-white dark:bg-black transition duration-200 hover:bg-opacity-70 p-2">
	      			<MdOutlineImage size={20} />
	      			<input
	      			  type="file"
	      			  accept="image/*"
	      			  onChange={handleMediaUpload}
	      			  className="absolute inset-0 opacity-0"
	      			/>
	      		</button>
					</div>
					<div className="flex space-x-2">
						<button className="relative themed-border rounded-lg bg-white dark:bg-black transition duration-200 hover:bg-opacity-70 p-2">
	      			<MdOutlineMovie size={20} />
	      			<input
	      			  type="file"
	      			  accept="video/mp4,video/ogg,video/webm"
	      			  onChange={handleMediaUpload}
	      			  className="absolute inset-0 opacity-0"
	      			/>
	      		</button>
					</div>
					<div className="flex space-x-2">
						<button onClick={handleSendMessage} disabled={loading} className="relative themed-border rounded-lg bg-blue-600 transition duration-200 hover:bg-blue-700 p-2">
	      			<BsFillSendFill className="text-white" />
	      		</button>
					</div>
				</div>
			</div>
		</div>
	);
}
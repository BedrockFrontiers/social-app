import Image from "next/image";
import MediaModal from "@/interfaces/web/components/Media/MediaModal";

export default function Attachments({ items }) {
	return (
		<div className="grid gap-2">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <MediaModal
          src={items[0]}
          width={1000}
          height={1000}
          alt="Main attachment"
          className="w-full h-full object-cover select-none cursor-pointer"
        />
      </div>
      {items.length > 1 && (
        <div className="grid grid-cols-3 gap-2">
          {items.slice(1).map((item, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
              <MediaModal
                src={item}
                alt={`Attachment ${index + 2}`}
                width={1000}
                height={1000}
                className="w-full h-full object-cover select-none cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
	);
}

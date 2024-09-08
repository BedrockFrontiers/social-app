/**
 * Attachments Component
 * 
 * This component displays a grid of images, including a main image and optional additional images.
 * It handles both single and multiple image displays, adjusting the layout accordingly.
 * 
 * Props:
 * - items (Array<string>): A list of image URLs. The first URL is displayed as the main image,
 *   and subsequent URLs are displayed as additional images in a grid.
 * 
 * Usage:
 * <Attachments items={attachments} />
 * 
 * The component renders:
 * - A single large image if `items` contains at least one image.
 * - Additional images in a grid layout if `items` contains more than one image.
 * 
 * Styling:
 * - The main image is displayed with an aspect ratio of 16:9.
 * - Additional images are displayed in a grid with a square aspect ratio.
 * - All images have a rounded corner style.
 * 
 * Example:
 * ```jsx
 * const attachments = [
 *   'https://example.com/image1.jpg',
 *   'https://example.com/image2.jpg',
 *   'https://example.com/image3.jpg'
 * ];
 * 
 * <Attachments items={attachments} />
 * ```
 */


import Image from "next/image";
import MediaModal from "@/components/Media/MediaModal";

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

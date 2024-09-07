/**
 * MediaModal Component
 * 
 * This component displays an image that, when clicked, opens in a modal for a larger preview.
 * The modal can be closed by clicking outside the image or clicking on the image itself.
 * 
 * Props:
 * - `...props` (object): Any valid props for the Next.js `Image` component, such as `src`, `alt`, `width`, `height`, etc.
 * 
 * State:
 * - `isOpenModal` (boolean): Determines if the modal is open or closed. Initially set to `false`.
 * 
 * Behavior:
 * - Clicking on the image opens the modal in full-screen mode with a dark background.
 * - Clicking outside the image or on the image again closes the modal.
 * 
 * Styling:
 * - The modal is displayed as a full-screen overlay with a semi-transparent black background.
 * - The image inside the modal is centered and styled with a maximum height and width to ensure it fits within the screen.
 * 
 * Example:
 * ```jsx
 * <MediaModal 
 *   src="https://example.com/image.jpg" 
 *   alt="Example image" 
 *   width={400} 
 *   height={300} 
 * />
 * ```
 * 
 * This will display an image with a click-to-preview functionality, allowing users to open the image in a modal.
 */


"use client";

import { useState } from "react";
import Image from "next/image";

export default function MediaModal({ ...props }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Image onClick={() => setIsOpenModal(true)} {...props} />

      {isOpenModal && (
        <div
          onClick={() => setIsOpenModal(false)}
          className="fixed top-0 left-0 z-50 bg-black bg-opacity-70 w-full h-full flex items-center justify-center p-4"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <div className="relative p-2 rounded-lg shadow-lg">
              <Image
                src={props.src}
                onClick={() => setIsOpenModal(false)}
                width={props.width || 800}
                height={props.height || 800}
                quality={100}
                className="object-contain max-h-screen max-w-screen"
                alt={props.alt || props.src}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

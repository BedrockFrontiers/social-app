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
            <div className="relative p-2">
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

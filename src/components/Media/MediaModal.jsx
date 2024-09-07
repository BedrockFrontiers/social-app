"use client";
import { useState } from "react";
import Image from "next/image";

export default function MediaModal({ ...props }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      {/* Imagem que, ao ser clicada, abre a modal */}
      <Image onClick={() => setIsOpenModal(true)} {...props} />

      {/* Modal */}
      {isOpenModal && (
        <div
          onClick={() => setIsOpenModal(false)}
          className="fixed top-0 left-0 z-50 bg-black bg-opacity-50 w-full h-full flex items-center justify-center"
        >
          {/* Impede que o clique dentro da imagem feche a modal */}
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <Image
              src={props.src} // Certifique-se de passar o src corretamente
              width={1000}
              height={1000}
              quality={100}
              className="object-contain max-h-full max-w-full"
              alt="Imagem ampliada"
            />
          </div>
        </div>
      )}
    </>
  );
}
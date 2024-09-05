import Image from "next/image";
import MainStructure from "@/components/MainStructure";

export default function Home() {
  return (
    <MainStructure>
      <div className="p-4 bg-white border-b border-gray-200 ">
        <div className="flex items-center">
          <Image className="select-none mx-auto" src="/icon.png" width={25} height={25} alt="Logo" />
        </div>
        <div className="flex mt-5 gap-4 overflow-x-auto items-center">
          <div>
            <p className="select-none font-semibold text-sm">Recommended</p>
          </div>
          <div>
            <p className="select-none font-semibold text-sm text-zinc-500">Following</p>
          </div>
        </div>
      </div>
    </MainStructure>
  );
}

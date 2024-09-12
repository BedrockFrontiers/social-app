import MainStructure from "@/components/MainStructure";
import Image from "next/image";
export default function NotFound() {
	return (
		<MainStructure className="p-4">

				<h2 className="text-xl font-bold mx-auto">Are you lost? Unfortunately, This page doesn&apos;t exist.</h2>
				<Image src="https://http.cat/404" width={700} height={700} className="mt-4"></Image>

		</MainStructure>
	);
}
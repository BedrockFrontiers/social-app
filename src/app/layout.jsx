import { Montserrat } from "next/font/google";
import getAccount from "@/shared/utils/get-account-utils";
import LayoutStructure from "@/presentation/components/LayoutStructure";
import "./globals.css";

const font = Montserrat({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://tidal-social.vercel.app/"),
  title: "Tidal — A Social App",
  description: "Connect and share with the world on Tidal, the next-generation social network.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Tidal — A Social App",
    description: "Connect and share with the world on Tidal, the next-generation social network.",
    url: "https://tidal-social.vercel.app/",
    siteName: "Tidal",
    images: [
      {
        url: "/card.jpg",
        width: 1200,
        height: 630,
        alt: "Tidal — A Social App",
        type: "image/jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tidal",
    title: "Tidal — A Social App",
    description: "Join Tidal, a dynamic social network to connect with friends, share updates, and more.",
    images: [
      {
        url: "/card.jpg",
        width: 1200,
        height: 630,
        alt: "Tidal — A Social App",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
};

export default async function RootLayout({ children }) {
  const me = await getAccount("@me");

  return (
    <html suppressHydrationWarning>
      <body className={`${font.className} h-full bg-gray-100 dark:bg-black`}>
        <LayoutStructure user={me}>
          {children}
        </LayoutStructure>
      </body>
    </html>
  );
}

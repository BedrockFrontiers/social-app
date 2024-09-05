import { Montserrat } from "next/font/google";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import "./globals.css";

const font = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Tidal",
  description: "A Social App.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png"
  },
  openGraph: {
    title: "Tidal",
    description: "A Social App.",
    siteName: "Tidal",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Tidal - A Social App",
      },
    ],
  },
  twitter: {
    title: "Tidal",
    description: "A Social App.",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Tidal - A Social App",
      },
    ],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <LeftSideBar />
        {children}
        <RightSideBar />
      </body>
    </html>
  );
}

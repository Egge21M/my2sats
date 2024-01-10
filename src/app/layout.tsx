import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "my2sats",
  description: "A blog about Bitcoin and freedom tech",
  referrer: "origin-when-cross-origin",
  keywords: ["Bitcoin", "Lightning", "Egge"],
  openGraph: {
    images: [
      "https://image.nostr.build/88ab767704068c189402e41ad6421f89681ca239772f3ee55f29a64912888147.png",
    ],
    url: "https://my2sats.space",
    description: "A blog about Bitcoin and freedom tech",
  },
  twitter: {
    title: "my2sats",
    description: "A blog about Bitcoin and freedom tech",
    creator: "@Egge21M",
    images: [
      "https://image.nostr.build/88ab767704068c189402e41ad6421f89681ca239772f3ee55f29a64912888147.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

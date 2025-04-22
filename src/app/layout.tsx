import ExitModal from "@/components/modals/ExitModal";
import HeartsModal from "@/components/modals/HeartsModal";
import PracticeModal from "@/components/modals/PractiseModal";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Nunito } from "next/font/google";
import { Toaster } from "sonner";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lexia | Language Learning",
  description: "Learn new languages at your own pace.",
  openGraph: {
    title: "Lexia | Language Learning",
    description: "Learn new languages at your own pace.",
    url: "https://lexia-lang.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="hydrated antialiased">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <SessionProvider>
        <body
          className={cn(
            "scrollbar-thumb-gray scrollbar-thumb-rounded scrollbar-track-gray-lighter scrollbar-w-4 scrolling-touch",
            font.className,
          )}
        >
          {children}
          <Toaster richColors />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
        </body>
      </SessionProvider>
    </html>
  );
}

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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="hydrated antialiased">
      <SessionProvider>
        <body
          className={cn(
            "scrollbar-thumb-gray scrollbar-thumb-rounded scrollbar-track-gray-lighter scrollbar-w-4 scrolling-touch",
            font.className,
          )}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}

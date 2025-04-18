import type { PropsWithChildren } from "react";
import Footer from "./footer";
import Header from "./header";

export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}

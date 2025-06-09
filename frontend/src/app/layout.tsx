import type { Metadata } from "next";
import { Footer, Header } from "@/components/layout";
import StoreProvider from "@/app/StoreProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Book lend",
  description: "Description of app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}

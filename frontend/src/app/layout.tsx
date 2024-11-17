import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book lend",
  description: "Description of app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

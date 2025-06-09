import { AuthGuard } from "@/components/layout";
import "@/styles/globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthGuard>{children}</AuthGuard>;
}

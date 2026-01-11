import "../styles/globals.css";
import { ReactNode } from "react";
import { AppNavbar } from "../components/layout/app-navbar";
import { AuthProvider } from "../lib/auth-context";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body className="bg-gray-50 min-h-screen">
        <AuthProvider>
          <AppNavbar />
          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}


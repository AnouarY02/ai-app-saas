import type { ReactNode } from 'react';
import './globals.css';
import { Navbar } from '../components/navbar';
import { UserSessionProvider } from '../lib/session-context';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body className="bg-gray-50 min-h-screen">
        <UserSessionProvider>
          <Navbar />
          <main className="max-w-4xl mx-auto py-8 px-4">{children}</main>
        </UserSessionProvider>
      </body>
    </html>
  );
}


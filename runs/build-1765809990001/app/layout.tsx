import './globals.css';
import { ReactNode } from 'react';
import { Navbar } from '../components/navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="max-w-5xl mx-auto py-8 px-4">{children}</main>
      </body>
    </html>
  );
}


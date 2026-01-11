import './globals.css';
import { ReactNode } from 'react';
import { Header } from '../components/layout/header';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-xl mx-auto p-4 w-full">{children}</main>
      </body>
    </html>
  );
}


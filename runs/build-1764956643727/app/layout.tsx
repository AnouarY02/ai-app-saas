import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Navbar } from '../components/navbar';

export const metadata: Metadata = {
  title: 'AI App',
  description: 'Een kleine SaaS-app met AI-prompt functionaliteit',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="max-w-3xl mx-auto py-8 px-4">{children}</main>
      </body>
    </html>
  );
}


import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'AI Task Manager',
  description: 'Professionele SaaS-app voor takenbeheer',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body className="bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  );
}


import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Task Manager Pro',
  description: 'Professional task management with teams, projects, and deadlines',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">{children}</body>
    </html>
  );
}


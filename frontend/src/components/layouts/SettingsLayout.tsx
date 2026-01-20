import * as React from "react";
import { cn } from "@/lib/utils";

interface SettingsLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, sidebarContent }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">{sidebarContent}</div>
      </aside>
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
        <footer className="flex justify-end p-4 bg-gray-100">
          <button className="px-4 py-2 mr-2 text-white bg-blue-600 rounded">Save</button>
          <button className="px-4 py-2 text-gray-700 bg-gray-300 rounded">Cancel</button>
        </footer>
      </div>
    </div>
  );
};
import * as React from "react";
import { cn } from "@/lib/utils";

interface SettingsLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, sidebarContent }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        {sidebarContent}
      </aside>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
        <footer className="bg-white shadow-md p-4 flex justify-end">
          <button className="bg-orange-500 text-white px-4 py-2 rounded mr-2">Save</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
        </footer>
      </div>
    </div>
  );
};
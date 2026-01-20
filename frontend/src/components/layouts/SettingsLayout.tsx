import * as React from "react";
import { cn } from "@/lib/utils";

interface SettingsLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, sidebarContent }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
        {sidebarContent}
      </aside>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
        <footer className="p-4 bg-white shadow-md flex justify-end">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2">Cancel</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
        </footer>
      </div>
    </div>
  );
};

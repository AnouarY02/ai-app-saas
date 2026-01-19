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
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
        <footer className="p-4 bg-white shadow-md flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
        </footer>
      </div>
    </div>
  );
};
import * as React from "react";
import { cn } from "@/lib/utils";

interface SettingsLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, sidebarContent }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 h-full overflow-y-auto">
        {sidebarContent}
      </aside>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
        <footer className="flex justify-end p-4 bg-white shadow-md">
          <button className="mr-2 px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button className="px-4 py-2 bg-orange-500 text-white rounded">Save</button>
        </footer>
      </div>
    </div>
  );
};

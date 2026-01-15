import * as React from "react";

interface SettingsLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, sidebarContent }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        {sidebarContent}
      </aside>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-200 p-4 flex justify-end space-x-2">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
          <button className="bg-[#2d9d5f] hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
        </footer>
      </div>
    </div>
  );
};
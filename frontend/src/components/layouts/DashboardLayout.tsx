import * as React from "react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
  headerContent?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, sidebarContent, headerContent }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <button
          className="md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex-1 md:flex md:justify-between">
          {headerContent}
        </div>
      </header>
      <div className="flex flex-1">
        <aside className={cn("bg-gray-100 md:block", isSidebarOpen ? "block" : "hidden") + " md:w-64 p-4"}>
          {sidebarContent}
        </aside>
        <main className="flex-1 p-4">
          <nav className="mb-4">
            {/* Breadcrumbs would go here */}
          </nav>
          {children}
        </main>
      </div>
    </div>
  );
};
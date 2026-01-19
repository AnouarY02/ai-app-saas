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
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <button
          className="md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {headerContent}
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={cn(
            "bg-gray-100 w-64 p-4 overflow-y-auto transition-transform transform md:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarContent}
        </aside>
        <main className="flex-1 overflow-y-auto p-4">
          <nav className="mb-4">
            {/* Breadcrumbs can be added here */}
          </nav>
          {children}
        </main>
      </div>
    </div>
  );
};
import * as React from "react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
  headerContent?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, sidebarContent, headerContent }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex-1">{headerContent}</div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className={cn("bg-gray-100 p-4 transition-transform transform md:translate-x-0", isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0") + " md:w-64 w-64 fixed md:relative z-10"}>
          {sidebarContent}
        </aside>
        <main className="flex-1 p-4 overflow-y-auto">
          <nav className="mb-4">
            {/* Breadcrumbs can be added here */}
          </nav>
          {children}
        </main>
      </div>
    </div>
  );
};

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
    <div className="flex h-screen">
      <div className={cn("fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transition-transform transform", isSidebarOpen ? "translate-x-0" : "-translate-x-full", "md:translate-x-0")}
           aria-hidden={!isSidebarOpen}>
        <div className="p-4">{sidebarContent}</div>
      </div>
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
          <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle sidebar">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>{headerContent}</div>
        </header>
        <nav className="p-4 bg-gray-100">
          {/* Breadcrumbs can be implemented here */}
        </nav>
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};
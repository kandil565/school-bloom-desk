import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [location.pathname, isMobile]);

  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  return (
    <div className="flex min-h-screen bg-background portal-root">
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[65] backdrop-blur-[2px]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        collapsed={isMobile ? false : sidebarCollapsed}
        onToggle={() => isMobile ? setMobileOpen(false) : setSidebarCollapsed(prev => !prev)}
        mobileOpen={isMobile ? mobileOpen : undefined}
      />

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out min-h-screen relative portal-main-view",
          isMobile ? "ms-0" : sidebarCollapsed ? "ms-[72px]" : "ms-[260px]"
        )}
      >
        <Topbar onMenuClick={() => setMobileOpen(true)} showMenu={isMobile} />

        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-8 md:px-8 md:py-10 mx-auto w-full max-w-screen-2xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

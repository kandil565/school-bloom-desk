import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar, { menuItems, getUserRole } from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("sioms_auth");
    if (!auth) {
      navigate("/login");
      return;
    }

    // Role-based route protection
    const role = getUserRole();
    const currentPath = location.pathname;
    const allowedItem = menuItems.find(item => item.path === currentPath);
    
    // Allow paths not in menuItems (like /profile, /settings, etc.) OR if role is allowed
    // Note: If you want to strictly block unknown paths, you can change the logic here.
    if (allowedItem && !allowedItem.roles.includes(role)) {
      // Redirect to a safe default path for the user's role
      if (role === "teacher") {
        navigate("/students");
      } else if (role === "staff") {
        navigate("/hr");
      } else {
        navigate("/");
      }
    }

    if (isMobile) {
      setMobileOpen(false);
    }
  }, [location.pathname, isMobile, navigate]);

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

import {
  LayoutDashboard,
  UserCheck,
  Users,
  Wallet,
  UtensilsCrossed,
  Package,
  Truck,
  Wrench,
  Shield,
  FileBarChart,
  ChevronLeft,
  ChevronRight,
  X,
  School,
  LogOut,
  GraduationCap,
  BookOpen,
  Bus,
  MessageSquare,
  Bell,
  PieChart,
  Calendar,
  AlertCircle,
  DollarSign,
  Archive,
  TrendingUp,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const menuItems = [
  { icon: LayoutDashboard, labelKey: "dashboard", path: "/" },
  { icon: Users, labelKey: "hr", path: "/hr" },
  { icon: GraduationCap, labelKey: "students", path: "/students" },
  { icon: UserCheck, labelKey: "attendance", path: "/attendance" },
  { icon: Wallet, labelKey: "payroll", path: "/payroll" },
  { icon: UtensilsCrossed, labelKey: "canteen", path: "/canteen" },
  { icon: Package, labelKey: "inventory", path: "/inventory" },
  { icon: Truck, labelKey: "suppliers", path: "/suppliers" },
  { icon: Wrench, labelKey: "workshops", path: "/workshops" },
  { icon: Shield, labelKey: "assets", path: "/assets" },
  { icon: FileBarChart, labelKey: "reports", path: "/reports" },
  { icon: BookOpen, labelKey: "curriculum", path: "/curriculum" },
  { icon: PieChart, labelKey: "grades", path: "/grades" },
  { icon: Archive, labelKey: "library", path: "/library" },
  { icon: Bus, labelKey: "transportation", path: "/transportation" },
  { icon: MessageSquare, labelKey: "parent_portal", path: "/parent-portal" },
  { icon: Bell, labelKey: "notifications", path: "/notifications" },
  { icon: TrendingUp, labelKey: "advanced_reports", path: "/advanced-reports" },
  { icon: Calendar, labelKey: "events", path: "/events" },
  { icon: AlertCircle, labelKey: "complaints", path: "/complaints" },
  { icon: DollarSign, labelKey: "fees", path: "/fees" },
  { icon: Archive, labelKey: "archive", path: "/archive" },
  { icon: TrendingUp, labelKey: "analytics", path: "/analytics" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
}

const Sidebar = ({ collapsed, onToggle, mobileOpen }: SidebarProps) => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobileMode = mobileOpen !== undefined;

  const isRTL = language === "ar";

  const sidebarClasses = cn(
    "fixed top-0 h-screen bg-secondary shadow-sidebar z-[70] flex flex-col transition-all duration-300 ease-in-out",
    isRTL ? "right-0" : "left-0",
    isMobileMode
      ? cn(
        "w-[260px]",
        mobileOpen
          ? "translate-x-0"
          : isRTL
            ? "translate-x-full"
            : "-translate-x-full"
      )
      : collapsed
        ? "w-[72px]"
        : "w-[260px]"
  );

  return (
    <aside className={sidebarClasses}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-sm shadow-primary/20">
            <School className="w-5 h-5 text-primary-foreground" />
          </div>
          {(!collapsed || isMobileMode) && (
            <div className="overflow-hidden min-w-0">
              <h1 className="text-sidebar-foreground font-bold text-sm tracking-wide leading-tight truncate">SIOMS</h1>
              <p className="text-[10px] text-sidebar-foreground/40 leading-tight truncate">
                {language === "ar" ? "إدارة العمليات" : "Operations Mgmt"}
              </p>
            </div>
          )}
        </div>
        {isMobileMode && mobileOpen && (
          <button
            onClick={onToggle}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-muted transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Label */}
      {(!collapsed || isMobileMode) && (
        <div className="px-5 pt-4 pb-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/30">
            {language === "ar" ? "القائمة" : "Menu"}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobileMode) onToggle();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-muted hover:text-sidebar-foreground"
              )}
            >
              {isActive && (
                <div className={cn(
                  "absolute top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-full",
                  isRTL ? "right-0 rounded-l-full" : "left-0 rounded-r-full"
                )} />
              )}
              <Icon className={cn(
                "w-[18px] h-[18px] flex-shrink-0 transition-transform duration-200",
                isActive && "scale-110"
              )} />
              {(!collapsed || isMobileMode) && (
                <span className="truncate">{t(item.labelKey)}</span>
              )}
              {/* Tooltip for collapsed mode */}
              {collapsed && !isMobileMode && (
                <div className={cn(
                  "absolute z-50 px-2.5 py-1.5 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity shadow-lg",
                  isRTL ? "right-full me-2" : "left-full ms-2"
                )}>
                  {t(item.labelKey)}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-2 pb-4 flex-shrink-0 space-y-1">
        {/* Sign out button */}
        <button
          onClick={() => navigate("/signout")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-sidebar-foreground/50 hover:text-destructive hover:bg-destructive/10 group relative",
          )}
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {(!collapsed || isMobileMode) && (
            <span className="truncate">{t("signout")}</span>
          )}
          {collapsed && !isMobileMode && (
            <div className={cn(
              "absolute z-50 px-2.5 py-1.5 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity shadow-lg",
              isRTL ? "right-full me-2" : "left-full ms-2"
            )}>
              {t("signout")}
            </div>
          )}
        </button>

        {/* Collapse button - desktop only */}
        {!isMobileMode && (
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center py-2 rounded-xl text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-muted transition-colors duration-200"
          >
            {collapsed
              ? (isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)
              : (isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />)
            }
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

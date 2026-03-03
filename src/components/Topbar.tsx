import { useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Menu, Search, Languages, User, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, { titleKey: string; subtitleKey: string }> = {
  "/": { titleKey: "dashboard", subtitleKey: "welcome" },
  "/attendance": { titleKey: "attendance", subtitleKey: "attendance" },
  "/hr": { titleKey: "hr", subtitleKey: "hr" },
  "/students": { titleKey: "students", subtitleKey: "studentsDescription" },
  "/payroll": { titleKey: "payroll", subtitleKey: "payroll" },
  "/canteen": { titleKey: "canteen", subtitleKey: "canteen" },
  "/inventory": { titleKey: "inventory", subtitleKey: "inventory" },
  "/suppliers": { titleKey: "suppliers", subtitleKey: "suppliers" },
  "/workshops": { titleKey: "workshops", subtitleKey: "workshops" },
  "/assets": { titleKey: "assets", subtitleKey: "assets" },
  "/reports": { titleKey: "reports", subtitleKey: "reports" },
  "/profile": { titleKey: "profile", subtitleKey: "profile" },
  "/settings": { titleKey: "settings", subtitleKey: "settings" },
};

interface TopbarProps {
  onMenuClick?: () => void;
  showMenu?: boolean;
}

const Topbar = ({ onMenuClick, showMenu }: TopbarProps) => {
  const { language, setLanguage, t } = useLanguage();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const page = pageTitles[location.pathname] || pageTitles["/"];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, text: t("newEmployeeRegistered"), time: t("2minAgo"), unread: true },
    { id: 2, text: t("inventoryRestocked"), time: t("15minAgo"), unread: true },
    { id: 3, text: t("leaveRequestSubmitted"), time: t("1hourAgo"), unread: false },
    { id: 4, text: t("payrollProcessed"), time: t("3hoursAgo"), unread: false },
    { id: 5, text: t("maintenanceRequest"), time: t("5hoursAgo"), unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleProfileAction = (key: string) => {
    setShowProfile(false);
    if (key === "profile") navigate("/profile");
    else if (key === "settings") navigate("/settings");
    else if (key === "signout") navigate("/signout");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <>
      {/* Mobile search overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm p-4 flex items-start gap-3 md:hidden">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              placeholder={t("search")}
              className="w-full h-11 ps-9 pe-4 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            onClick={() => setShowSearch(false)}
            className="w-11 h-11 rounded-lg flex items-center justify-center bg-muted text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <header className="h-14 md:h-16 bg-card border-b border-border flex items-center justify-between px-3 md:px-6 sticky top-0 z-30">
        {/* Left side */}
        <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
          {showMenu && (
            <button
              onClick={onMenuClick}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex-shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="hidden sm:block min-w-0">
            <h1 className="text-sm md:text-base font-bold text-foreground truncate">{t(page.titleKey)}</h1>
            <p className="text-[11px] text-muted-foreground truncate">{t(page.subtitleKey)}</p>
          </div>
        </div>

        {/* Center: System Name (mobile only) */}
        <div className="sm:hidden flex-1 flex justify-center">
          <h1 className="text-base font-bold text-primary tracking-tight">SIOMS</h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
          {/* Search (desktop) */}
          <div className="hidden md:block relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("search")}
              className="w-48 lg:w-56 h-9 ps-9 pe-4 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:w-64 transition-all duration-300"
            />
          </div>

          {/* Search (mobile) */}
          <button
            onClick={() => setShowSearch(true)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title={language === "ar" ? "English" : "العربية"}
          >
            <Languages className="w-[18px] h-[18px]" />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Bell className="w-[18px] h-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-destructive rounded-full" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute end-0 top-full mt-1 w-72 md:w-80 bg-card rounded-xl border border-border shadow-lg py-2 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground">{t("notifications")}</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs font-bold text-white bg-destructive rounded-full px-2 py-0.5">{unreadCount}</span>
                  )}
                </div>
                {notifications.length > 0 ? (
                  <>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            "px-4 py-3 hover:bg-muted transition-colors cursor-pointer border-b border-border last:border-0",
                            n.unread && "bg-primary/5"
                          )}
                        >
                          {n.unread && <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full me-2 mt-0.5 float-start" />}
                          <p className="text-xs text-foreground font-medium leading-snug">{n.text}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 text-center border-t border-border">
                      <button className="text-xs font-medium text-primary hover:underline">{t("viewAll")}</button>
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Bell className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">
                      {language === "ar" ? "لا توجد إشعارات حالياً" : "No notifications yet"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="w-px h-8 bg-border mx-1 hidden sm:block" />

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-1.5 md:px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-muted-foreground hidden md:block transition-transform duration-200",
                  showProfile && "rotate-180"
                )}
              />
            </button>

            {showProfile && (
              <div className="absolute end-0 top-full mt-1 w-48 bg-card rounded-xl border border-border shadow-lg py-1 z-50 animate-fade-in">
                {/* User info header */}
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-bold text-foreground">
                    {language === "ar" ? "مدير النظام" : "Administrator"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">admin@sioms.edu</p>
                </div>
                {["profile", "settings", "signout"].map((key) => (
                  <button
                    key={key}
                    onClick={() => handleProfileAction(key)}
                    className={cn(
                      "w-full text-start px-4 py-2.5 text-sm transition-colors",
                      key === "signout"
                        ? "text-destructive hover:bg-destructive/10"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {t(key)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Topbar;

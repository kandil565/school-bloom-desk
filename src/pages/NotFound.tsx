import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { School, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <School className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-7xl font-bold text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-2">
          {language === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
        </p>
        <p className="text-sm text-muted-foreground/70 mb-8">
          {language === "ar"
            ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها"
            : "The page you're looking for doesn't exist or has been moved"}
        </p>
        <Link
          to="/"
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm",
            "hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          )}
        >
          <ArrowLeft className={cn("w-4 h-4", language === "ar" && "rotate-180")} />
          {language === "ar" ? "العودة للرئيسية" : "Back to Dashboard"}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

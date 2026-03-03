import { LogOut, ArrowLeft, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const SignOutPage = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const handleSignOut = () => {
    // Clear auth state
    localStorage.removeItem("sioms_auth");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-card rounded-2xl border border-border shadow-2xl p-8 md:p-10 max-w-md w-full text-center animate-fade-in relative overflow-hidden group">
        {/* Decorative background circle */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-destructive/5 rounded-full blur-2xl group-hover:bg-destructive/10 transition-colors" />

        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto shadow-sm">
            <LogOut className="w-10 h-10 text-destructive animate-pulse" />
          </div>
          <div className="absolute -top-1 -right-1">
            <ShieldAlert className="w-6 h-6 text-destructive/40" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-3">{t("signout")}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-10">
          {t("signoutConfirm")}
          <br />
          <span className="text-xs opacity-60 mt-2 block">
            {t("sessionSecure")}
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(-1)}
            className={cn(
              "flex-1 px-6 py-3 rounded-xl border border-border text-sm font-bold text-foreground",
              "hover:bg-muted transition-all duration-200 flex items-center justify-center gap-2"
            )}
          >
            <ArrowLeft className={cn("w-4 h-4", language === "ar" && "rotate-180")} />
            {t("cancel")}
          </button>
          <button
            onClick={handleSignOut}
            className={cn(
              "flex-1 px-6 py-3 rounded-xl bg-destructive text-destructive-foreground text-sm font-bold",
              "hover:bg-destructive/90 shadow-lg shadow-destructive/20 hover:shadow-xl hover:shadow-destructive/30",
              "transition-all duration-200"
            )}
          >
            {t("signout")}
          </button>
        </div>

        <p className="mt-8 text-[11px] text-muted-foreground/40 font-medium tracking-tight">
          SIOMS SECURE LOGOUT • v0.1.0
        </p>
      </div>
    </div>
  );
};

export default SignOutPage;

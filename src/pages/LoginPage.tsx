import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { School, Eye, EyeOff, Lock, User, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/api-config";

const LoginPage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await apiRequest<{ success: boolean; data: { token: string; user: any }; message: string }>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );

      if (response && response.data && response.data.token) {
        localStorage.setItem("sioms_auth", "true");
        localStorage.setItem("sioms_token", response.data.token);
        localStorage.setItem("sioms_user", JSON.stringify(response.data.user));
        
        const userRole = response.data.user.role;
        if (userRole === "teacher") {
          navigate("/students");
        } else if (userRole === "staff") {
          navigate("/hr");
        } else {
          navigate("/");
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        language === "ar"
          ? err.message || "فشل تسجيل الدخول. يرجى التحقق من البيانات."
          : err.message || "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Left side — branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden items-center justify-center">
        {/* Decorative circles */}
        <div className="absolute -top-24 -start-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -end-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/3 end-10 w-72 h-72 rounded-full bg-success/5 blur-2xl" />

        <div className="relative z-10 text-center px-12 max-w-lg">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/30">
            <School className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-foreground mb-4 tracking-tight">
            {language === "ar" ? "نظام إدارة العمليات المدرسية" : "School Internal Operations Management System"}
          </h1>
          <p className="text-secondary-foreground/60 text-sm leading-relaxed">
            {language === "ar"
              ? "منصة إدارة متكاملة لتبسيط العمليات الداخلية وإدارة الموارد البشرية والمالية والمخزون بكفاءة"
              : "A comprehensive management platform for streamlining internal operations, HR, finance, and inventory efficiently"}
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {(language === "ar"
              ? ["الموارد البشرية", "المالية", "المخزون", "التقارير"]
              : ["HR", "Finance", "Inventory", "Reports"]
            ).map((badge) => (
              <span
                key={badge}
                className="px-4 py-1.5 text-xs font-medium rounded-full bg-white/5 text-secondary-foreground/70 border border-white/10 backdrop-blur-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right side — login form */}
      <div className="flex-1 flex items-center justify-center bg-background px-4 sm:px-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <School className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">SIOMS</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {language === "ar" ? "تسجيل الدخول" : "Sign In"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === "ar" ? "أدخل بياناتك للوصول إلى لوحة التحكم" : "Enter your credentials to access the dashboard"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive text-center animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {language === "ar" ? "البريد الإلكتروني" : "Email"}
              </label>
              <div className="relative">
                <User className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@school.com"
                  className="w-full h-12 ps-10 pe-4 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {language === "ar" ? "كلمة المرور" : "Password"}
              </label>
              <div className="relative">
                <Lock className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 ps-10 pe-12 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
                />
                <span className="text-muted-foreground text-xs">
                  {language === "ar" ? "تذكرني" : "Remember me"}
                </span>
              </label>
              <button type="button" className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
                {language === "ar" ? "نسيت كلمة المرور؟" : "Forgot password?"}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-primary/20",
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
              )}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  {language === "ar" ? "تسجيل الدخول" : "Sign In"}
                  <ArrowRight className={cn("w-4 h-4", language === "ar" && "rotate-180")} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[11px] text-muted-foreground/60 mt-8">
            © 2024 SIOMS — School Internal Operations Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

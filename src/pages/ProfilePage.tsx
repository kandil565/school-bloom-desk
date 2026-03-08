import { User, Mail, MapPin, Building, Calendar, ShieldCheck, BadgeCheck } from "lucide-react";
import { PageHeader } from "@/components/PageShared";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  const { t, language } = useLanguage();

  const profileFields = [
    { label: "fullName", value: t("adminTitle"), icon: User },
    { label: "email", value: "admin@sioms.edu", icon: Mail },
    { label: "department", value: t("adminDept"), icon: Building },
    { label: "location", value: t("cairoEgypt"), icon: MapPin },
    { label: "joinDate", value: language === "ar" ? "15 يناير 2020" : "Jan 15, 2020", icon: Calendar },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <PageHeader icon={User} title="profile" description="profileDescription" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-8 flex flex-col items-center text-center relative overflow-hidden group">
          {/* Background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-success border-4 border-card flex items-center justify-center text-white">
              <BadgeCheck className="w-4 h-4" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-1">
            {t("adminTitle")}
          </h3>
          <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
            {t("fullAccess")}
          </p>

          <div className="mt-8 w-full pt-6 border-t border-border space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors justify-start">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="truncate">admin@sioms.edu</span>
            </div>
          </div>
        </div>

        {/* Details and Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-card p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                {t("personalInfo")}
              </h3>
              <button className="text-xs font-semibold text-primary hover:underline transition-all">
                {t("editDetails")}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {profileFields.map((field) => (
                <div key={field.label} className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    {t(field.label)}
                  </label>
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/30 border border-transparent hover:border-border hover:bg-muted/50 transition-all duration-300 min-w-0">
                    <field.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground font-medium truncate">{field.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Security Summary */}
          <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {t("securityExcellent")}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t("verifiedEmailPhone")}
                </p>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

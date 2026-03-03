import { Settings, Globe, Bell, Shield, Mail, Smartphone, Lock, Languages, Clock } from "lucide-react";
import { PageHeader } from "@/components/PageShared";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

const Toggle = ({ enabled, onToggle }: ToggleProps) => (
  <button
    onClick={onToggle}
    className={cn(
      "w-11 h-6 rounded-full transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-primary/20",
      enabled ? "bg-success shadow-sm shadow-success/20" : "bg-muted"
    )}
  >
    <div className={cn(
      "w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-300 transform shadow-sm",
      enabled ? (document.documentElement.dir === "rtl" ? "-translate-x-6" : "translate-x-6") : (document.documentElement.dir === "rtl" ? "-translate-x-1" : "translate-x-1")
    )} />
  </button>
);

const SettingsPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <PageHeader icon={Settings} title="settings" description="settingsDescription" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Navigation - could be added if sections get large */}

        <div className="md:col-span-12 space-y-6">
          {/* General Section */}
          <section className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                {t("general")}
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5" />
                  {t("language")}
                </label>
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-muted/50 border border-border hover:bg-muted transition-all text-sm font-medium"
                >
                  <span>{language === "ar" ? "العربية" : "English"}</span>
                  <span className="text-primary">{language === "ar" ? "English" : "عربي"}</span>
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  {t("timezone")}
                </label>
                <div className="w-full p-3.5 rounded-xl bg-muted/30 border border-border/50 text-sm font-medium text-muted-foreground">
                  GMT+2 (Cairo, Egypt)
                </div>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                {t("notifications")}
              </h3>
            </div>
            <div className="divide-y divide-border">
              <div className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t("emailNotif")}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t("receiveEmailUpdates")}</p>
                  </div>
                </div>
                <Toggle enabled={emailNotif} onToggle={() => setEmailNotif(!emailNotif)} />
              </div>

              <div className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t("pushNotif")}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t("browserPushNotif")}</p>
                  </div>
                </div>
                <Toggle enabled={pushNotif} onToggle={() => setPushNotif(!pushNotif)} />
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                {t("security")}
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t("twoFactor")}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t("extraSecuritySMS")}</p>
                  </div>
                </div>
                <Toggle enabled={twoFactor} onToggle={() => setTwoFactor(!twoFactor)} />
              </div>

              <div className="pt-2">
                <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  {t("changePassword")}
                </button>
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-4">
            <button className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              {t("saveChanges")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  color: "primary" | "success" | "accent" | "destructive";
  index?: number;
}

const colorMap = {
  primary: { bg: "bg-primary/10", icon: "text-primary", glow: "group-hover:shadow-primary/5" },
  success: { bg: "bg-success/10", icon: "text-success", glow: "group-hover:shadow-success/5" },
  accent: { bg: "bg-accent/10", icon: "text-accent", glow: "group-hover:shadow-accent/5" },
  destructive: { bg: "bg-destructive/10", icon: "text-destructive", glow: "group-hover:shadow-destructive/5" },
};

const StatCard = ({ icon: Icon, label, value, change, changeType, color, index = 0 }: StatCardProps) => {
  const { t, language } = useLanguage();
  const palette = colorMap[color];
  const isEmpty = !value || value === "—" || value === "";

  return (
    <article
      className={cn(
        "bg-card rounded-xl border border-border p-5 flex flex-col hover:shadow-lg transition-all duration-300 animate-fade-in group cursor-default relative overflow-hidden",
        palette.glow
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Decorative gradient blob */}
      <div className={cn(
        "absolute -top-8 -end-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl",
        palette.bg
      )} />

      <div className="flex items-start justify-between relative z-10">
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110", palette.bg)}>
          <Icon className={cn("w-5 h-5", palette.icon)} />
        </div>

        {change && (
          <div className="text-end">
            <span className={cn(
              "text-[11px] font-semibold px-2 py-0.5 rounded-full bg-muted",
              changeType === "up" ? "text-success" : changeType === "down" ? "text-destructive" : "text-muted-foreground"
            )}>
              {change}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 relative z-10">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">{t(label)}</h4>
        {isEmpty ? (
          <div className="flex items-center gap-2">
            <div className="h-7 w-20 bg-muted rounded-md animate-pulse" />
          </div>
        ) : (
          <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
        )}
      </div>

      {isEmpty && (
        <p className="text-[10px] text-muted-foreground/60 mt-2 relative z-10">
          {language === "ar" ? "في انتظار البيانات..." : "Awaiting data..."}
        </p>
      )}
    </article>
  );
};

export default StatCard;

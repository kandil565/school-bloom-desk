import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Inbox } from "lucide-react";

// Empty array — ready for backend data
const recentLogs: { id: number; action: string; user: string; department: string; time: string; status: string }[] = [];

const ActivityTable = () => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-card rounded-xl border border-border shadow-card animate-fade-in" style={{ animationDelay: "400ms" }}>

      <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 border-b border-border">
        <h3 className="text-sm font-bold text-foreground">{t("recentActivity")}</h3>
        <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
          {t("viewAll")}
        </button>
      </div>

      {recentLogs.length > 0 ? (
        <>
          {/* Mobile: card layout */}
          <div className="block md:hidden divide-y divide-border">
            {recentLogs.map((log) => (
              <div key={log.id} className="p-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-2 h-2 rounded-full flex-shrink-0",
                    log.status === "completed" ? "bg-success" : log.status === "inProgress" ? "bg-primary" : "bg-accent"
                  )} />
                  <span className="text-sm font-medium text-foreground">{t(log.action)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground ps-4">
                  <span>{log.user} — {t(log.department)}</span>
                  <span>{t(log.time)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table layout */}
          <div className="hidden md:block w-full overflow-x-auto">
            <table className="w-full text-start">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["action", "user", "department", "time"].map((col) => (
                    <th
                      key={col}
                      className="text-start text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3 whitespace-nowrap"
                    >
                      {t(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((log) => (
                  <tr key={log.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-foreground w-1/3">
                      <div className="flex items-center">
                        <span className={cn(
                          "inline-block w-2 h-2 rounded-full me-2",
                          log.status === "completed" ? "bg-success" : log.status === "inProgress" ? "bg-primary" : "bg-accent"
                        )} />
                        {t(log.action)}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {log.user}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {t(log.department)}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-muted-foreground/80 whitespace-nowrap">
                      {t(log.time)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
          <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4">
            <Inbox className="w-7 h-7 text-muted-foreground/40" />
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {language === "ar" ? "لا توجد نشاطات مسجلة" : "No activity logged yet"}
          </p>
          <p className="text-xs text-muted-foreground/60 text-center max-w-xs">
            {language === "ar"
              ? "ستظهر النشاطات هنا تلقائياً عند اتصال النظام بالخادم"
              : "Activities will appear here automatically once the system is connected to the server"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityTable;

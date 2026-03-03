import { LucideIcon, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface PageHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const PageHeader = ({ title, description, icon: Icon }: PageHeaderProps) => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 heading-section animate-fade-in">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
      </div>
      <div className="min-w-0">
        <h1 className="text-lg md:text-xl font-bold text-foreground truncate">{t(title)}</h1>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{t(description)}</p>
      </div>
    </div>
  );
};

interface ColumnInfo {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: ColumnInfo[];
  data: Record<string, string>[];
}

const DataTable = ({ columns, data }: DataTableProps) => {
  const { t, language } = useLanguage();

  if (data.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
          <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4">
            <Inbox className="w-7 h-7 text-muted-foreground/40" />
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {t("noData")}
          </p>
          <p className="text-xs text-muted-foreground/60 text-center max-w-xs">
            {t("noDataDesc")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden table-wrapper animate-fade-in" style={{ animationDelay: "200ms" }}>
      {/* Mobile: Card Layout */}
      <div className="block md:hidden divide-y divide-border">
        {data.map((row, idx) => (
          <div key={idx} className="p-4 space-y-2">
            {columns.map((c) => (
              <div key={c.key} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground text-xs font-medium">{t(c.label)}</span>
                {c.key === "status" ? (
                  <span
                    className={cn(
                      "text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap",
                      row[c.key] === "Active" || row[c.key] === "Present" || row[c.key] === "Paid" || row[c.key] === "In Stock" || row[c.key] === "Completed"
                        ? "bg-success/10 text-success"
                        : row[c.key] === "Absent" || row[c.key] === "Inactive" || row[c.key] === "Out of Stock" || row[c.key] === "Overdue"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-accent/10 text-accent"
                    )}
                  >
                    {t(row[c.key])}
                  </span>
                ) : (
                  <span className="text-foreground font-medium">{t(row[c.key])}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Desktop: Table Layout */}
      <div className="hidden md:block overflow-x-auto -mx-px">
        <table className="w-full" style={{ minWidth: `${columns.length * 130}px` }}>
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="text-start text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 md:px-5 py-3 whitespace-nowrap"
                >
                  {t(c.label)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors duration-150"
              >
                {columns.map((c) => (
                  <td key={c.key} className="px-4 md:px-5 py-3 md:py-3.5 text-sm text-foreground">
                    {c.key === "status" ? (
                      <span
                        className={cn(
                          "text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap",
                          row[c.key] === "Active" || row[c.key] === "Present" || row[c.key] === "Paid" || row[c.key] === "In Stock" || row[c.key] === "Completed"
                            ? "bg-success/10 text-success"
                            : row[c.key] === "Absent" || row[c.key] === "Inactive" || row[c.key] === "Out of Stock" || row[c.key] === "Overdue"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-accent/10 text-accent"
                        )}
                      >
                        {t(row[c.key])}
                      </span>
                    ) : (
                      <span className="whitespace-nowrap">{t(row[c.key])}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface SummaryCardProps {
  label: string;
  value: string;
  color: string;
}

const SummaryCard = ({ label, value, color }: SummaryCardProps) => {
  const { t } = useLanguage();
  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-4 md:p-5 hover:shadow-card-hover transition-all duration-300 indicator-card group animate-fade-in">
      <p className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">{value}</p>
      <p className="text-xs md:text-sm text-muted-foreground mt-1">{t(label)}</p>
      <div className={cn("w-full h-1 rounded-full mt-3 overflow-hidden", color.split(' ')[0])} />
    </div>
  );
};

export { PageHeader, DataTable, SummaryCard };

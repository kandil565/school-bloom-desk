import { FileBarChart, Download, Calendar, ArrowRight, FileText, PieChart, LineChart } from "lucide-react";
import { PageHeader, SummaryCard } from "@/components/PageShared";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const reports = [
  { title: "attendanceReport", description: "attendanceReportDesc", date: "Feb 28, 2024", icon: FileText, color: "text-blue-500 bg-blue-50" },
  { title: "payrollSummary", description: "payrollSummaryDesc", date: "Feb 25, 2024", icon: PieChart, color: "text-emerald-500 bg-emerald-50" },
  { title: "inventoryReport", description: "inventoryReportDesc", date: "Feb 20, 2024", icon: FileBarChart, color: "text-amber-500 bg-amber-50" },
  { title: "financialReport", description: "financialReportDesc", date: "Feb 18, 2024", icon: LineChart, color: "text-purple-500 bg-purple-50" },
  { title: "hrAnalytics", description: "hrAnalyticsDesc", date: "Feb 15, 2024", icon: FileText, color: "text-rose-500 bg-rose-50" },
  { title: "supplierReport", description: "supplierReportDesc", date: "Feb 10, 2024", icon: FileBarChart, color: "text-indigo-500 bg-indigo-50" },
];

const Reports = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();

  return (
    <div className="space-y-8 pb-10">
      <PageHeader icon={FileBarChart} title="reports" description="reportsDescription" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="totalReports" value="0" color="bg-primary" />
        <SummaryCard label="thisMonth" value="0" color="bg-success" />
        <SummaryCard label="scheduled" value="0" color="bg-accent" />
        <SummaryCard label="pendingReview" value="0" color="bg-destructive" />
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-foreground">
            {t("recentReports")}
          </h3>
          <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            {t("filterReports")}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reports.map((report, idx) => {
            const Icon = report.icon;
            return (
              <div
                key={report.title}
                className="bg-card rounded-2xl border border-border shadow-card p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer group animate-fade-in relative overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Status dot */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-success opacity-40 group-hover:opacity-100" />

                <div className="flex items-start justify-between mb-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", report.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                    {t(report.title)}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 italic opacity-80 group-hover:opacity-100 transition-opacity">
                    {t(report.description)}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                    <Calendar className="w-3 h-3" />
                    <span>{t("generated")}: {report.date}</span>
                  </div>

                  <button 
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
                    onClick={() => toast({ title: "Downloading Report", description: "Your report is being generated and will download shortly." })}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                {/* Arrow detail */}
                <div className="absolute bottom-4 right-4 translate-x-10 group-hover:translate-x-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <ArrowRight className={cn("w-4 h-4 text-primary", language === "ar" && "rotate-180")} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Schedule Banner */}
      <div className="bg-secondary rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />

        <div className="text-center md:text-start relative z-10">
          <h3 className="text-lg font-bold text-secondary-foreground mb-1">
            {t("scheduleAutoReports")}
          </h3>
          <p className="text-sm text-secondary-foreground/60 max-w-md">
            {t("scheduleDesc")}
          </p>
        </div>

        <button 
          className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all relative z-10 whitespace-nowrap"
          onClick={() => toast({ title: "Started", description: "Automated schedule successfully enabled." })}
        >
          {t("startScheduling")}
        </button>
      </div>
    </div>
  );
};

export default Reports;

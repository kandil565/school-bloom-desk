import {
  Users,
  UserCheck,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Clock,
  CalendarCheck,
  ArrowUpRight,
  BarChart3,
  TrendingDown,
  LineChart,
  AreaChart,
} from "lucide-react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Cell
} from 'recharts';
import StatCard from "@/components/StatCard";
import ActivityTable from "@/components/ActivityTable";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const stats = [
  { icon: Users, label: "totalEmployees", value: "0", change: "0%", changeType: "up" as const, color: "primary" as const },
  { icon: UserCheck, label: "todayAttendance", value: "0", change: "0%", changeType: "up" as const, color: "success" as const },
  { icon: AlertTriangle, label: "inventoryAlerts", value: "0", change: "0", changeType: "down" as const, color: "accent" as const },
  { icon: DollarSign, label: "monthlyExpenses", value: "0", change: "0%", changeType: "up" as const, color: "destructive" as const },
];

const quickActions = [
  { icon: UserCheck, labelKey: "attendance", path: "/attendance", color: "bg-success/10 text-success" },
  { icon: Users, labelKey: "hr", path: "/hr", color: "bg-primary/10 text-primary" },
  { icon: BarChart3, labelKey: "reports", path: "/reports", color: "bg-destructive/10 text-destructive" },
  { icon: TrendingUp, labelKey: "payroll", path: "/payroll", color: "bg-accent/10 text-accent" },
];

const attendanceData = [
  { name: 'Sun', value: 0 },
  { name: 'Mon', value: 0 },
  { name: 'Tue', value: 0 },
  { name: 'Wed', value: 0 },
  { name: 'Thu', value: 0 },
  { name: 'Fri', value: 0 },
  { name: 'Sat', value: 0 },
];

const DashboardHome = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <section className="animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {t("welcomeTitle")} 👋
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t("welcomeSubtitle")}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2 self-start">
            <Clock className="w-3.5 h-3.5" />
            <span>{new Date().toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
        </div>
      </section>

      {/* Stat cards */}
      <section>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t("systemOverview")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </section>

      {/* Quick actions + Progress */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1 bg-card rounded-xl border border-border p-5 animate-fade-in shadow-sm hover:shadow-md transition-shadow" style={{ animationDelay: "300ms" }}>
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-primary" />
            {t("quickActions")}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.labelKey}
                  href={action.path}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted border border-transparent hover:border-border transition-all duration-200 group cursor-pointer"
                >
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", action.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                    {t(action.labelKey)}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* System Status */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 animate-fade-in shadow-sm hover:shadow-md transition-shadow" style={{ animationDelay: "350ms" }}>
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success" />
            {t("systemStatus")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: t("servers"),
                status: t("operational"),
                color: "bg-success",
                percentage: 100,
              },
              {
                label: t("database"),
                status: t("operational"),
                color: "bg-success",
                percentage: 100,
              },
              {
                label: t("backup"),
                status: t("scheduled"),
                color: "bg-accent",
                percentage: 85,
              },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-muted/50 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    item.percentage === 100 ? "bg-success animate-pulse" : "bg-accent"
                  )} />
                </div>
                <p className="text-sm font-semibold text-foreground">{item.status}</p>
                <div className="w-full h-1.5 bg-muted rounded-full mt-3 overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-700", item.color)}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <LineChart className="w-5 h-5 text-primary" />
                {t("weeklyAttendance")}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {t("attendanceComparison")}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary/20 border-2 border-primary" />
                <span>{t("attendanceLabel")}</span>
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsAreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.1} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </RechartsAreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Activity Table */}
      <section>
        <ActivityTable />
      </section>
    </div>
  );
};

export default DashboardHome;

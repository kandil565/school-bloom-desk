import { useState } from "react";
import { Users, UserCheck, AlertTriangle, DollarSign } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";
import ActivityTable from "@/components/ActivityTable";
import { cn } from "@/lib/utils";

const dashboardStats = [
  {
    icon: Users,
    label: "Total Employees",
    value: "0",
    change: "0%",
    changeType: "up" as const,
    color: "primary" as const,
  },
  {
    icon: UserCheck,
    label: "Today Attendance",
    value: "0",
    change: "0%",
    changeType: "up" as const,
    color: "success" as const,
  },
  {
    icon: AlertTriangle,
    label: "Inventory Alerts",
    value: "0",
    change: "0",
    changeType: "down" as const,
    color: "accent" as const,
  },
  {
    icon: DollarSign,
    label: "Monthly Expenses",
    value: "0",
    change: "0%",
    changeType: "up" as const,
    color: "destructive" as const,
  },
];

const Index = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  return (
    <div className="min-h-screen bg-background global-app-wrapper">
      <Sidebar
        collapsed={isSidebarMinimized}
        onToggle={() => setIsSidebarMinimized(!isSidebarMinimized)}
      />

      <main
        className={cn(
          "transition-all duration-300 ease-in-out main-panel",
          isSidebarMinimized ? "ms-[72px]" : "ms-[260px]"
        )}
      >
        <Topbar />

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {dashboardStats.map((stat, idx) => (
              <StatCard key={stat.label} {...stat} index={idx} />
            ))}
          </div>

          <ActivityTable />
        </div>
      </main>
    </div>
  );
};

export default Index;

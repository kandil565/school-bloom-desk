import { Shield, Search, Filter, Plus, Download } from "lucide-react";
import { PageHeader, DataTable, SummaryCard } from "@/components/PageShared";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const columns = [
  { key: "asset", label: "asset" },
  { key: "assignee", label: "assignedTo" },
  { key: "department", label: "department" },
  { key: "date", label: "date" },
  { key: "status", label: "status" },
];

const initialData = [
  { asset: "Laptop Dell #142", assignee: "أحمد سيد", department: "Mathematics", date: "2023-09-01", status: "Active" },
  { asset: "Projector Epson #08", assignee: "سارة محمود", department: "Science", date: "2023-10-15", status: "Active" },
  { asset: "iPad Pro #23", assignee: "محمد حسن", department: "English", date: "2024-01-10", status: "Pending" },
  { asset: "Printer HP #05", assignee: "IT Department", department: "IT", date: "2022-06-20", status: "Active" },
  { asset: "Camera Canon #03", assignee: "فاطمة إبراهيم", department: "Media", date: "2023-11-05", status: "Overdue" },
];

const AssetsCustody = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = initialData.filter(
    (item) =>
      item.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={Shield} title="assets" description="assetsDescription" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="totalAssets" value="564" color="bg-primary text-primary" />
        <SummaryCard label="assigned" value="480" color="bg-success text-success" />
        <SummaryCard label="available" value="72" color="bg-accent text-accent" />
        <SummaryCard label="overdueReturns" value="12" color="bg-destructive text-destructive" />
      </div>

      {/* Modern Action Bar */}
      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("searchAssets")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 ps-10 pe-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" />
            <span>{t("allCategories")}</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t("exportData")}</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <Plus className="w-4 h-4" />
            <span>{t("assignAsset")}</span>
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default AssetsCustody;

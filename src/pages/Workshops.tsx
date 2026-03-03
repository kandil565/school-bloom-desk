import { Wrench, Search, Filter, Plus, Download } from "lucide-react";
import { PageHeader, DataTable, SummaryCard } from "@/components/PageShared";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const columns = [
  { key: "title", label: "workshop" },
  { key: "instructor", label: "instructor" },
  { key: "date", label: "date" },
  { key: "participants", label: "participants" },
  { key: "status", label: "status" },
];

const initialData = [
  { title: "First Aid Training", instructor: "Dr. أحمد", date: "2024-03-05", participants: "25", status: "Completed" },
  { title: "Fire Safety Drill", instructor: "خالد علي", date: "2024-03-12", participants: "All Staff", status: "Pending" },
  { title: "IT Security Awareness", instructor: "نورا سالم", date: "2024-03-18", participants: "40", status: "Pending" },
  { title: "Child Psychology", instructor: "Dr. فاطمة", date: "2024-02-20", participants: "30", status: "Completed" },
  { title: "New Curriculum Overview", instructor: "سارة محمود", date: "2024-03-25", participants: "50", status: "Pending" },
];

const Workshops = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = initialData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={Wrench} title="workshops" description="workshopsDescription" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="totalWorkshops" value="18" color="bg-primary text-primary" />
        <SummaryCard label="Completed" value="12" color="bg-success text-success" />
        <SummaryCard label="upcoming" value="6" color="bg-accent text-accent" />
        <SummaryCard label="participants" value="320" color="bg-destructive text-destructive" />
      </div>

      {/* Modern Action Bar */}
      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("searchWorkshops")}
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
            <span>{t("addWorkshop")}</span>
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default Workshops;

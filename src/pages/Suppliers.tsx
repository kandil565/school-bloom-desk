import { Truck, Search, Filter, Plus, Download } from "lucide-react";
import { PageHeader, DataTable, SummaryCard } from "@/components/PageShared";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const tableCols = [
  { key: "company", label: "supplier" },
  { key: "contact", label: "contact" },
  { key: "category", label: "category" },
  { key: "lastOrder", label: "lastOrder" },
  { key: "status", label: "status" },
];

const mockRecords = [
  { company: "النور للتوريدات", contact: "+20 10 1234 5678", category: "Stationery", lastOrder: "2024-02-15", status: "Active" },
  { company: "تيك إد للحلول التقنية", contact: "+20 11 9876 5432", category: "IT Equipment", lastOrder: "2024-02-10", status: "Active" },
  { company: "شركة الأغذية الطازجة", contact: "+20 12 4567 8901", category: "Canteen", lastOrder: "2024-02-18", status: "Active" },
  { company: "كلين برو للخدمات", contact: "+20 15 3210 9876", category: "Maintenance", lastOrder: "2024-01-28", status: "Inactive" },
  { company: "إديو فورنيتشر للأثاث", contact: "+20 10 6543 2109", category: "Furniture", lastOrder: "2024-02-05", status: "Active" },
];

const Suppliers = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mockRecords.filter(
    (item) =>
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex flex-col gap-6 md:gap-8 w-full vendors-page pb-10">
      <PageHeader icon={Truck} title="suppliers" description="suppliersDescription" />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 items-stretch">
        <SummaryCard label="totalSuppliers" value="32" color="bg-blue-500 text-blue-600" />
        <SummaryCard label="Active" value="28" color="bg-emerald-500 text-emerald-600" />
        <SummaryCard label="pendingOrders" value="5" color="bg-amber-500 text-amber-600" />
        <SummaryCard label="overdue" value="2" color="bg-red-500 text-red-600" />
      </section>

      {/* Modern Action Bar */}
      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("searchSuppliers")}
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
            <span>{t("addSupplier")}</span>
          </button>
        </div>
      </div>

      <section className="mt-2">
        <DataTable columns={tableCols} data={filteredData} />
      </section>
    </main>
  );
};

export default Suppliers;

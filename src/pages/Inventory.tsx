import { Package, Search, Filter, Plus, Download } from "lucide-react";
import { PageHeader, DataTable, SummaryCard } from "@/components/PageShared";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const columns = [
  { key: "item", label: "itemName" },
  { key: "category", label: "category" },
  { key: "quantity", label: "quantity" },
  { key: "unit", label: "unit" },
  { key: "status", label: "status" },
];

const initialData = [
  { item: "A4 Paper Ream", category: "Stationery", quantity: "120", unit: "Reams", status: "In Stock" },
  { item: "Whiteboard Markers", category: "Stationery", quantity: "8", unit: "Boxes", status: "Low Stock" },
  { item: "Lab Chemicals Set", category: "Lab Equipment", quantity: "0", unit: "Sets", status: "Out of Stock" },
  { item: "Student Chairs", category: "Furniture", quantity: "45", unit: "Pieces", status: "In Stock" },
  { item: "Printer Toner", category: "IT Supplies", quantity: "3", unit: "Cartridges", status: "Low Stock" },
  { item: "Cleaning Supplies", category: "Maintenance", quantity: "25", unit: "Kits", status: "In Stock" },
  { item: "Projector Lamps", category: "Audio Visual", quantity: "12", unit: "Pieces", status: "In Stock" },
  { item: "Notebooks (Small)", category: "Stationery", quantity: "200", unit: "Pieces", status: "In Stock" },
];

const Inventory = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = initialData.filter(
    (item) =>
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={Package} title="inventory" description="inventoryDescription" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="totalItems" value="1,842" color="bg-primary text-primary" />
        <SummaryCard label="inStock" value="1,680" color="bg-success text-success" />
        <SummaryCard label="lowStock" value="45" color="bg-accent text-accent" />
        <SummaryCard label="outOfStock" value="7" color="bg-destructive text-destructive" />
      </div>

      {/* Modern Action Bar */}
      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("searchInventory")}
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
            <span>{t("addItem")}</span>
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default Inventory;

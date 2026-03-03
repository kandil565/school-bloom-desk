import { UtensilsCrossed, Search, Filter, Plus, Download } from "lucide-react";
import { PageHeader, DataTable, SummaryCard } from "@/components/PageShared";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const columns = [
  { key: "item", label: "menuItem" },
  { key: "category", label: "category" },
  { key: "price", label: "price" },
  { key: "sold", label: "soldToday" },
  { key: "status", label: "status" },
];

const menuData = [
  { item: "أرز بالدجاج", category: "Main Course", price: "75 ج.م", sold: "85", status: "In Stock" },
  { item: "شوربة خضار", category: "Appetizer", price: "35 ج.م", sold: "42", status: "In Stock" },
  { item: "عصير طازج", category: "Beverage", price: "25 ج.م", sold: "120", status: "In Stock" },
  { item: "باستا بولونيز", category: "Main Course", price: "90 ج.م", sold: "65", status: "Out of Stock" },
  { item: "سلطة فواكه", category: "Dessert", price: "45 ج.م", sold: "30", status: "In Stock" },
  { item: "ساندوتش تونة", category: "Main Course", price: "55 ج.م", sold: "20", status: "In Stock" },
  { item: "شاي أخضر", category: "Beverage", price: "15 ج.م", sold: "15", status: "In Stock" },
];

const Canteen = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = menuData.filter(
    (item) =>
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={UtensilsCrossed} title="canteen" description="canteenDescription" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="dailySales" value="15,420 ج.م" color="bg-success text-success" />
        <SummaryCard label="mealsServed" value="342" color="bg-primary text-primary" />
        <SummaryCard label="menuItems" value="24" color="bg-accent text-accent" />
        <SummaryCard label="outOfStock" value="3" color="bg-destructive text-destructive" />
      </div>

      {/* Modern Action Bar */}
      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("searchMenu")}
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
            <span>{t("addMeal")}</span>
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default Canteen;

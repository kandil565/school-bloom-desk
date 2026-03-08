import { UtensilsCrossed, Search, Plus, Download } from "lucide-react";
import { PageHeader, DataTable, SummaryCard } from "@/components/PageShared";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-config";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { exportToCSV } from "@/lib/exportUtils";

const columns = [
  { key: "item", label: "menuItem" },
  { key: "category", label: "category" },
  { key: "priceStr", label: "price" },
  { key: "sold", label: "soldToday" },
  { key: "status", label: "status" },
];

export default function Canteen() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    item: "",
    category: "Main Course",
    price: 0,
    status: "In Stock"
  });

  const { data: canteenRes, isLoading } = useQuery({
    queryKey: ["canteen"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/canteen"),
  });

  const canteenData = (canteenRes?.data || []).map((item: any) => ({
    ...item,
    priceStr: `${item.price || 0} EGP`
  }));

  const filteredData = canteenData.filter((item: any) => {
    const matchesSearch = item.item?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? item.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const addMealMutation = useMutation({
    mutationFn: (newRecord: any) => apiRequest("/canteen", { method: "POST", body: JSON.stringify(newRecord) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["canteen"] });
      setIsAddModalOpen(false);
      setFormData({ item: "", category: "Main Course", price: 0, status: "In Stock" });
      toast({ title: t("success") || "Success", description: "Meal added successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to add meal.", variant: "destructive" });
    }
  });

  const handleExport = () => {
    exportToCSV(filteredData, "Canteen_Menu");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  const totalItems = canteenData.length;
  const outOfStock = canteenData.filter(i => i.status === 'Out of Stock').length;
  const totalSold = canteenData.reduce((sum, item) => sum + (item.sold || 0), 0);
  const totalRevenue = canteenData.reduce((sum, item) => sum + ((item.sold || 0) * (item.price || 0)), 0);

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={UtensilsCrossed} title="canteen" description="canteenDescription" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="dailySales" value={`${totalRevenue.toLocaleString()} EGP`} color="bg-success text-success" />
        <SummaryCard label="mealsServed" value={totalSold.toString()} color="bg-primary text-primary" />
        <SummaryCard label="menuItems" value={totalItems.toString()} color="bg-accent text-accent" />
        <SummaryCard label="outOfStock" value={outOfStock.toString()} color="bg-destructive text-destructive" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("searchMenu") || "Search menu..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 ps-10 pe-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">{t("allCategories") || "All Categories"}</option>
            <option value="Main Course">Main Course</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Beverage">Beverage</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
            <option value="Other">Other</option>
          </select>

          <button onClick={handleExport} className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t("exportData")}</span>
          </button>
          
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    <Plus className="w-4 h-4" />
                    <span>{t("addMeal")}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Menu Item</DialogTitle>
                </DialogHeader>
                <form 
                  onSubmit={(e) => { 
                      e.preventDefault(); 
                      addMealMutation.mutate(formData); 
                  }} 
                  className="space-y-4 pt-4"
                >
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input required placeholder="e.g. Chicken Rice" value={formData.item} onChange={e => setFormData({...formData, item: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                <option value="Main Course">Main Course</option>
                                <option value="Appetizer">Appetizer</option>
                                <option value="Beverage">Beverage</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Snack">Snack</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Price (EGP)</Label>
                            <Input type="number" required min="1" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Status</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                            <option value="In Stock">In Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={addMealMutation.isPending}>
                        {addMealMutation.isPending ? "Adding..." : "Add Meal"}
                    </Button>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="mb-8 overflow-hidden">
        {isLoading ? (
            <div className="flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : (
            <DataTable columns={columns} data={filteredData} />
        )}
      </section>
    </div>
  );
}

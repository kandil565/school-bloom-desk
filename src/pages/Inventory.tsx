import { Package, Search, Filter, Plus, Download } from "lucide-react";
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
  { key: "item", label: "itemName" },
  { key: "category", label: "category" },
  { key: "quantity", label: "quantity" },
  { key: "unitPrice", label: "unitPrice" },
  { key: "status", label: "status" },
];

const Inventory = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    category: "",
    quantity: 0,
    unitPrice: 0,
    status: "In Stock"
  });

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/inventory"),
  });

  const inventoryData = (apiResponse?.data || []).map((item: any) => ({
    item: item.itemName,
    category: item.category || "-",
    quantity: item.quantity?.toString() || "0",
    unitPrice: item.unitPrice ? `$${item.unitPrice}` : "-",
    status: item.status || "In Stock"
  }));

  const filteredData = inventoryData.filter(
    (item: any) => {
      const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus ? item.status === filterStatus : true;
      return matchesSearch && matchesStatus;
    }
  );

  const addItemMutation = useMutation({
    mutationFn: (newItem: any) => apiRequest("/inventory", { method: "POST", body: JSON.stringify(newItem) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      setIsAddModalOpen(false);
      setFormData({ itemCode: "", itemName: "", category: "", quantity: 0, unitPrice: 0, status: "In Stock" });
      toast({ title: t("success") || "Success", description: "Item added successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to add item.", variant: "destructive" });
    }
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    addItemMutation.mutate({
      ...formData,
      itemCode: formData.itemCode || `ITM-${Math.floor(Math.random() * 10000)}`
    });
  };

  const handleExport = () => {
    exportToCSV(filteredData, "Inventory_Report");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={Package} title="inventory" description="inventoryDescription" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="totalItems" value={inventoryData.length.toString()} color="bg-primary text-primary" />
        <SummaryCard label="inStock" value={inventoryData.filter((i: any) => i.status === 'In Stock').length.toString()} color="bg-success text-success" />
        <SummaryCard label="lowStock" value={inventoryData.filter((i: any) => i.status === 'Low Stock').length.toString()} color="bg-accent text-accent" />
        <SummaryCard label="outOfStock" value={inventoryData.filter((i: any) => i.status === 'Out of Stock').length.toString()} color="bg-destructive text-destructive" />
      </div>

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
          <select 
            className="flex-1 md:flex-none h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">{t("allCategories") || "All Statuses"}</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          <button onClick={handleExport} className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t("exportData")}</span>
          </button>
          
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                <Plus className="w-4 h-4" />
                <span>{t("addItem")}</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("addItem")}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddItem} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Item Name</Label>
                  <Input required value={formData.itemName} onChange={e => setFormData({...formData, itemName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input type="number" required min="0" value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value) || 0})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Unit Price</Label>
                    <Input type="number" required min="0" step="0.01" value={formData.unitPrice} onChange={e => setFormData({...formData, unitPrice: parseFloat(e.target.value) || 0})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={formData.status} 
                    onChange={e => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <Button type="submit" className="w-full mt-6" disabled={addItemMutation.isPending}>
                  {addItemMutation.isPending ? "Adding..." : "Add Item"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <DataTable columns={columns} data={filteredData} />
      )}
    </div>
  );
};

export default Inventory;


import { Truck, Search, Plus, Download } from "lucide-react";
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

const tableCols = [
  { key: "company", label: "supplier" },
  { key: "contact", label: "contact" },
  { key: "category", label: "category" },
  { key: "lastOrderStr", label: "lastOrder" },
  { key: "status", label: "status" },
];

export default function Suppliers() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    category: "Stationery",
    lastOrder: new Date().toISOString().split('T')[0],
    status: "Active"
  });

  const { data: supsRes, isLoading } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/suppliers"),
  });

  const suppliersData = (supsRes?.data || []).map((item: any) => ({
    ...item,
    lastOrderStr: item.lastOrder ? new Date(item.lastOrder).toLocaleDateString() : "-"
  }));

  const filteredData = suppliersData.filter((item: any) => {
    const matchesSearch = item.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? item.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const addMutaion = useMutation({
    mutationFn: (newRecord: any) => apiRequest("/suppliers", { method: "POST", body: JSON.stringify(newRecord) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      setIsAddModalOpen(false);
      setFormData({ company: "", contact: "", category: "Stationery", lastOrder: new Date().toISOString().split('T')[0], status: "Active" });
      toast({ title: t("success") || "Success", description: "Supplier added successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to add supplier.", variant: "destructive" });
    }
  });

  const handleExport = () => {
    exportToCSV(filteredData, "Suppliers_Report");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  const totalItems = suppliersData.length;
  const activeItems = suppliersData.filter(i => i.status === 'Active').length;
  const inactiveItems = totalItems - activeItems;

  return (
    <main className="flex flex-col gap-6 md:gap-8 w-full vendors-page pb-10">
      <PageHeader icon={Truck} title="suppliers" description="suppliersDescription" />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 items-stretch">
        <SummaryCard label="totalSuppliers" value={totalItems.toString()} color="bg-primary text-primary" />
        <SummaryCard label="Active" value={activeItems.toString()} color="bg-success text-success" />
        <SummaryCard label="pendingOrders" value={inactiveItems.toString()} color="bg-amber-500 text-amber-600" />
        <SummaryCard label="overdue" value="0" color="bg-destructive text-destructive" />
      </section>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("searchSuppliers") || "Search suppliers..."}
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
            <option value="Stationery">Stationery</option>
            <option value="IT Equipment">IT Equipment</option>
            <option value="Canteen">Canteen</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Furniture">Furniture</option>
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
                    <span>{t("addSupplier")}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Supplier</DialogTitle>
                </DialogHeader>
                <form 
                  onSubmit={(e) => { 
                      e.preventDefault(); 
                      addMutaion.mutate(formData); 
                  }} 
                  className="space-y-4 pt-4"
                >
                    <div className="space-y-2">
                        <Label>Company Name</Label>
                        <Input required placeholder="e.g. Al Noor Eq" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                    </div>

                    <div className="space-y-2">
                        <Label>Contact Details (Phone/Email)</Label>
                        <Input required value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                <option value="Stationery">Stationery</option>
                                <option value="IT Equipment">IT Equipment</option>
                                <option value="Canteen">Canteen</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Last Order Date</Label>
                        <Input type="date" value={formData.lastOrder} onChange={e => setFormData({...formData, lastOrder: e.target.value})} />
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={addMutaion.isPending}>
                        {addMutaion.isPending ? "Adding..." : "Add Supplier"}
                    </Button>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="mt-2">
        {isLoading ? (
            <div className="flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : (
            <DataTable columns={tableCols} data={filteredData} />
        )}
      </section>
    </main>
  );
}

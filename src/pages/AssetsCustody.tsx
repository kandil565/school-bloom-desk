import { Shield, Search, Filter, Plus, Download } from "lucide-react";
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
  { key: "asset", label: "asset" },
  { key: "assignee", label: "assignedTo" },
  { key: "department", label: "department" },
  { key: "date", label: "date" },
  { key: "status", label: "status" },
];

const AssetsCustody = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    assetCode: "",
    assetName: "",
    assetType: "",
    category: "",
    purchaseDate: new Date().toISOString().split('T')[0],
    purchasePrice: 0,
    custodian: "",
    status: "Active",
  });

  const { data: assetsRes, isLoading: loadingAssets } = useQuery({
    queryKey: ["assets"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/assets"),
  });

  const { data: employeeRes } = useQuery({
    queryKey: ["employees"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/employees"),
  });

  const assetsData = (assetsRes?.data || []).map((ast: any) => {
    let empName = "Unassigned";
    let empDept = "N/A";

    if (ast.custodian && typeof ast.custodian === 'object') {
        empName = `${ast.custodian.firstName || ''} ${ast.custodian.lastName || ''}`.trim();
        empDept = ast.custodian.department || "N/A";
    } else if (ast.custodian && employeeRes?.data) {
        const emp = employeeRes.data.find(e => e._id === ast.custodian);
        if (emp) {
            empName = `${emp.firstName || ''} ${emp.lastName || ''}`.trim();
            empDept = emp.department || "N/A";
        }
    }

    return {
      ...ast,
      asset: `${ast.assetName || 'Unknown'} #${ast.assetCode || ''}`,
      assignee: empName,
      department: empDept,
      date: ast.purchaseDate ? new Date(ast.purchaseDate).toISOString().split('T')[0] : "-",
      status: ast.status || "Active"
    };
  });

  const categories = Array.from(new Set(assetsData.map((a: any) => a.category).filter(Boolean)));

  const filteredData = assetsData.filter((ast: any) => {
    const matchesSearch = 
      ast.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ast.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ast.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? ast.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const addAssetMutation = useMutation({
    mutationFn: (newRecord: any) => apiRequest("/assets", { method: "POST", body: JSON.stringify(newRecord) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      setIsAddModalOpen(false);
      setFormData({ assetCode: "", assetName: "", assetType: "", category: "", purchaseDate: new Date().toISOString().split('T')[0], purchasePrice: 0, custodian: "", status: "Active" });
      toast({ title: t("success") || "Success", description: "Asset assigned successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to add asset.", variant: "destructive" });
    }
  });

  const handleAddAsset = (e: React.FormEvent) => {
      e.preventDefault();
      addAssetMutation.mutate({
          ...formData,
          custodian: formData.custodian || undefined,
          assetCode: formData.assetCode || `AST-${Math.floor(Math.random() * 10000)}`
      });
  };

  const handleExport = () => {
    exportToCSV(filteredData, "Assets_Report");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={Shield} title="assets" description="assetsDescription" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="totalAssets" value={assetsData.length.toString()} color="bg-primary text-primary" />
        <SummaryCard label="assigned" value={assetsData.filter(a => a.custodian).length.toString()} color="bg-success text-success" />
        <SummaryCard label="available" value={assetsData.filter(a => !a.custodian).length.toString()} color="bg-accent text-accent" />
        <SummaryCard label="overdueReturns" value={assetsData.filter(a => a.status === 'Damaged').length.toString()} color="bg-destructive text-destructive" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
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

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">{t("allCategories") || "All Categories"}</option>
            {categories.map((cat: any) => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button onClick={handleExport} className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t("exportData")}</span>
          </button>
          
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    <Plus className="w-4 h-4" />
                    <span>{t("assignAsset")}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add / Assign Asset</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddAsset} className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Asset Name</Label>
                            <Input required value={formData.assetName} onChange={e => setFormData({...formData, assetName: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Asset Code</Label>
                            <Input placeholder="Auto generated if empty" value={formData.assetCode} onChange={e => setFormData({...formData, assetCode: e.target.value})} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Damaged">Damaged</option>
                                <option value="Under Repair">Under Repair</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Purchase Date</Label>
                            <Input type="date" required value={formData.purchaseDate} onChange={e => setFormData({...formData, purchaseDate: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Price (EGP)</Label>
                            <Input type="number" value={formData.purchasePrice} onChange={e => setFormData({...formData, purchasePrice: Number(e.target.value)})} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Assigned To (Custodian)</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.custodian} onChange={e => setFormData({...formData, custodian: e.target.value})}>
                            <option value="">Unassigned</option>
                            {(employeeRes?.data || []).map((emp: any) => (
                                <option key={emp._id} value={emp._id}>{emp.firstName} {emp.lastName} ({emp.department})</option>
                            ))}
                        </select>
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={addAssetMutation.isPending}>
                        {addAssetMutation.isPending ? "Assigning..." : "Assign Asset"}
                    </Button>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="mb-8 overflow-hidden">
        {loadingAssets ? (
            <div className="flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : (
            <DataTable columns={columns} data={filteredData} />
        )}
      </section>
    </div>
  );
};

export default AssetsCustody;

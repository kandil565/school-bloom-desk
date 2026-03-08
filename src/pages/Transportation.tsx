import { Bus, Search, Plus, Download } from "lucide-react";
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
  { key: "busNumber", label: "Bus Number" },
  { key: "driverName", label: "Driver" },
  { key: "route", label: "Route" },
  { key: "capacity", label: "Capacity" },
  { key: "status", label: "status" },
];

export default function Transportation() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    busNumber: "",
    driverName: "",
    route: "",
    capacity: 40,
    status: "Operational"
  });

  const { data: transRes, isLoading } = useQuery({
    queryKey: ["transportation"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/transportation"),
  });

  const transportationData = transRes?.data || [];

  const filteredData = transportationData.filter((item: any) => {
    const matchesSearch = 
        item.busNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.driverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.route?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const addMutaion = useMutation({
    mutationFn: (newRecord: any) => apiRequest("/transportation", { method: "POST", body: JSON.stringify(newRecord) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transportation"] });
      setIsAddModalOpen(false);
      setFormData({ busNumber: "", driverName: "", route: "", capacity: 40, status: "Operational" });
      toast({ title: t("success") || "Success", description: "Bus added successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to add bus.", variant: "destructive" });
    }
  });

  const handleExport = () => {
    exportToCSV(filteredData, "Transportation_Report");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  const totalBuses = transportationData.length;
  const operational = transportationData.filter(i => i.status === 'Operational').length;
  const maintenance = transportationData.filter(i => i.status === 'Maintenance').length;
  const totalCapacity = transportationData.reduce((sum, item) => sum + (item.capacity || 0), 0);
  
  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={Bus} title="transportation" description="busStatus" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="Total Buses" value={totalBuses.toString()} color="bg-primary text-primary" />
        <SummaryCard label="Active" value={operational.toString()} color="bg-success text-success" />
        <SummaryCard label="Maintenance" value={maintenance.toString()} color="bg-amber-500 text-amber-600" />
        <SummaryCard label="Total Capacity" value={totalCapacity.toString()} color="bg-accent text-accent" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("search") || "Search buses, drivers, routes..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 ps-10 pe-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Operational">Operational</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Out of Service">Out of Service</option>
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
                    <DialogTitle>Add Bus</DialogTitle>
                </DialogHeader>
                <form 
                  onSubmit={(e) => { 
                      e.preventDefault(); 
                      addMutaion.mutate(formData); 
                  }} 
                  className="space-y-4 pt-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Bus Number/ID</Label>
                            <Input required value={formData.busNumber} onChange={e => setFormData({...formData, busNumber: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Capacity</Label>
                            <Input type="number" required min="1" value={formData.capacity} onChange={e => setFormData({...formData, capacity: Number(e.target.value)})} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Driver Name</Label>
                        <Input required value={formData.driverName} onChange={e => setFormData({...formData, driverName: e.target.value})} />
                    </div>

                    <div className="space-y-2">
                        <Label>Route Details</Label>
                        <Input required value={formData.route} onChange={e => setFormData({...formData, route: e.target.value})} />
                    </div>

                    <div className="space-y-2">
                        <Label>Status</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                            <option value="Operational">Operational</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Out of Service">Out of Service</option>
                        </select>
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={addMutaion.isPending}>
                        {addMutaion.isPending ? "Adding..." : "Add Bus"}
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
            <DataTable columns={columns} data={filteredData} />
        )}
      </section>
    </div>
  );
}

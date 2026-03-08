import { Wrench, Search, Plus, Download } from "lucide-react";
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
  { key: "title", label: "workshop" },
  { key: "instructor", label: "instructor" },
  { key: "dateStr", label: "date" },
  { key: "participants", label: "participants" },
  { key: "status", label: "status" },
];

export default function Workshops() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    date: new Date().toISOString().split('T')[0],
    participants: "0",
    status: "Pending"
  });

  const { data: wsRes, isLoading } = useQuery({
    queryKey: ["workshops"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/workshops"),
  });

  const workshopsData = (wsRes?.data || []).map((item: any) => ({
    ...item,
    dateStr: item.date ? new Date(item.date).toLocaleDateString() : "-"
  }));

  const filteredData = workshopsData.filter((item: any) => {
    const matchesSearch = 
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.instructor?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const addMutaion = useMutation({
    mutationFn: (newRecord: any) => apiRequest("/workshops", { method: "POST", body: JSON.stringify(newRecord) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workshops"] });
      setIsAddModalOpen(false);
      setFormData({ title: "", instructor: "", date: new Date().toISOString().split('T')[0], participants: "0", status: "Pending" });
      toast({ title: t("success") || "Success", description: "Workshop added successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to add workshop.", variant: "destructive" });
    }
  });

  const handleExport = () => {
    exportToCSV(filteredData, "Workshops_Report");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  const totalItems = workshopsData.length;
  const completed = workshopsData.filter(i => i.status === 'Completed').length;
  const upcoming = workshopsData.filter(i => i.status === 'Pending').length;
  
  let totalParticipants = 0;
  workshopsData.forEach(i => {
      const p = parseInt(i.participants);
      if (!isNaN(p)) totalParticipants += p;
  });

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={Wrench} title="workshops" description="workshopsDescription" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="totalWorkshops" value={totalItems.toString()} color="bg-primary text-primary" />
        <SummaryCard label="Completed" value={completed.toString()} color="bg-success text-success" />
        <SummaryCard label="upcoming" value={upcoming.toString()} color="bg-accent text-accent" />
        <SummaryCard label="participants" value={totalParticipants.toString()} color="bg-destructive text-destructive" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("searchWorkshops") || "Search workshops..."}
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
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button onClick={handleExport} className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t("exportData")}</span>
          </button>
          
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    <Plus className="w-4 h-4" />
                    <span>{t("addWorkshop")}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Workshop</DialogTitle>
                </DialogHeader>
                <form 
                  onSubmit={(e) => { 
                      e.preventDefault(); 
                      addMutaion.mutate(formData); 
                  }} 
                  className="space-y-4 pt-4"
                >
                    <div className="space-y-2">
                        <Label>Workshop Title</Label>
                        <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    </div>

                    <div className="space-y-2">
                        <Label>Instructor</Label>
                        <Input required value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <Input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Participants Limit</Label>
                            <Input value={formData.participants} onChange={e => setFormData({...formData, participants: e.target.value})} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Status</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={addMutaion.isPending}>
                        {addMutaion.isPending ? "Adding..." : "Add Workshop"}
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

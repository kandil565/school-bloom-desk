import { AlertCircle, Search, Filter, Plus, Download } from "lucide-react";
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
  { key: "complaintId", label: "ID" },
  { key: "subject", label: "Subject" },
  { key: "category", label: "Category" },
  { key: "priority", label: "Priority" },
  { key: "status", label: "Status" },
  { key: "dateStr", label: "Date" },
];

export default function ComplaintsSuggestions() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    complaintId: "",
    complainantName: "",
    complainantEmail: "",
    category: "Academic",
    subject: "",
    description: "",
    priority: "Medium",
    status: "Open",
  });

  const { data: complaintsRes, isLoading: loadingComplaints } = useQuery({
    queryKey: ["complaints"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/complaints"),
  });

  const complaintsData = (complaintsRes?.data || []).map((comp: any) => {
    return {
      ...comp,
      dateStr: comp.createdAt ? new Date(comp.createdAt).toLocaleDateString() : "-",
    };
  });

  // Use defined categories if any, else extract from data
  const categories = ["Academic", "Facility", "Staff", "Transport", "Food", "Other"];

  const filteredData = complaintsData.filter((comp: any) => {
    const matchesSearch = 
      comp.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.complainantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.complaintId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? comp.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const addComplaintMutation = useMutation({
    mutationFn: (newRecord: any) => apiRequest("/complaints", { method: "POST", body: JSON.stringify(newRecord) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      setIsAddModalOpen(false);
      setFormData({ 
          complaintId: "", complainantName: "", complainantEmail: "",
          category: "Academic", subject: "", description: "", priority: "Medium", status: "Open"
      });
      toast({ title: t("success") || "Success", description: "Complaint submitted successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to submit complaint.", variant: "destructive" });
    }
  });

  const handleExport = () => {
    exportToCSV(filteredData, "Complaints_Report");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  const totalComplaints = complaintsData.length;
  const openComplaints = complaintsData.filter(c => c.status === 'Open').length;
  const resolvedComplaints = complaintsData.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;
  const criticalComplaints = complaintsData.filter(c => c.priority === 'Critical' && c.status !== 'Resolved' && c.status !== 'Closed').length;

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={AlertCircle} title="complaints" description="recentActivity" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="totalItems" value={totalComplaints.toString()} color="bg-primary text-primary" />
        <SummaryCard label="Pending" value={openComplaints.toString()} color="bg-accent text-accent" />
        <SummaryCard label="Completed" value={resolvedComplaints.toString()} color="bg-success text-success" />
        <SummaryCard label="urgent" value={criticalComplaints.toString()} color="bg-destructive text-destructive" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("search") || "Search complaints..."}
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
                    <span>{t("Action")}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Submit Complaint/Suggestion</DialogTitle>
                </DialogHeader>
                <form 
                  onSubmit={(e) => { 
                      e.preventDefault(); 
                      addComplaintMutation.mutate({
                          ...formData,
                          complaintId: formData.complaintId || `CPL-${Math.floor(Math.random() * 10000)}`
                      }); 
                  }} 
                  className="space-y-4 pt-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Your Name</Label>
                            <Input required value={formData.complainantName} onChange={e => setFormData({...formData, complainantName: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" value={formData.complainantEmail} onChange={e => setFormData({...formData, complainantEmail: e.target.value})} />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Priority</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Subject</Label>
                        <Input required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <textarea 
                            required 
                            rows={3}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.description} 
                            onChange={e => setFormData({...formData, description: e.target.value})} 
                        />
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={addComplaintMutation.isPending}>
                        {addComplaintMutation.isPending ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="mb-8 overflow-hidden">
        {loadingComplaints ? (
            <div className="flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : (
            <DataTable columns={columns} data={filteredData} />
        )}
      </section>
    </div>
  );
}

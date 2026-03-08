import { DollarSign, Search, Plus, Download } from "lucide-react";
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
  { key: "studentStr", label: "Student" },
  { key: "feeType", label: "Type" },
  { key: "amountStr", label: "Amount" },
  { key: "dueDateStr", label: "Due Date" },
  { key: "status", label: "Status" },
];

export default function FeeManagement() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    academicYear: new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
    feeType: "Tuition",
    amount: 0,
    dueDate: new Date().toISOString().split('T')[0],
    status: "Pending",
  });

  const { data: feesRes, isLoading: loadingFees } = useQuery({
    queryKey: ["fees"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/fees"),
  });

  const { data: studentsRes } = useQuery({
    queryKey: ["students"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/students"),
  });

  const feesData = (feesRes?.data || []).map((fee: any) => {
    let studentName = "Unknown";
    let rollNum = "";
    if (fee.studentId && typeof fee.studentId === 'object') {
        studentName = `${fee.studentId.firstName || ''} ${fee.studentId.lastName || ''}`.trim();
        rollNum = fee.studentId.rollNumber || "";
    } else if (fee.studentId && studentsRes?.data) {
        const student = studentsRes.data.find((s:any) => s._id === fee.studentId);
        if (student) {
            studentName = `${student.firstName || ''} ${student.lastName || ''}`.trim();
            rollNum = student.rollNumber || "";
        }
    }

    return {
      ...fee,
      studentStr: `${studentName} ${rollNum ? `(${rollNum})` : ''}`,
      amountStr: `${fee.amount || 0} EGP`,
      dueDateStr: fee.dueDate ? new Date(fee.dueDate).toLocaleDateString() : "-",
      status: fee.status || "Pending"
    };
  });

  const filteredData = feesData.filter((fee: any) => {
    const matchesSearch = fee.studentStr.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? fee.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const addFeeMutation = useMutation({
    mutationFn: (newRecord: any) => apiRequest("/fees", { method: "POST", body: JSON.stringify(newRecord) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fees"] });
      setIsAddModalOpen(false);
      
      setFormData(prev => ({ 
          ...prev,
          studentId: "", 
          amount: 0 
      }));
      toast({ title: t("success") || "Success", description: "Fee record added successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to add fee.", variant: "destructive" });
    }
  });

  const handleExport = () => {
    exportToCSV(filteredData, "Fees_Report");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  let totalAmount = 0;
  let paidAmount = 0;
  
  feesData.forEach((f:any) => {
      totalAmount += (f.amount || 0);
      if (f.status === 'Paid') paidAmount += (f.amount || 0);
  });
  
  const pendingAmount = totalAmount - paidAmount;
  const collectionRate = totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0;

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={DollarSign} title="fees" description="financialSummary" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="totalPaid" value={`${totalAmount.toLocaleString()} EGP`} color="bg-primary text-primary" />
        <SummaryCard label="Paid" value={`${paidAmount.toLocaleString()} EGP`} color="bg-success text-success" />
        <SummaryCard label="Pending" value={`${pendingAmount.toLocaleString()} EGP`} color="bg-accent text-accent" />
        <SummaryCard label="financialSummary" value={`${collectionRate}%`} color="bg-purple-500 text-purple-500" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search student..."
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
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
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
                    <span>{t("addItem")}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Fee Record</DialogTitle>
                </DialogHeader>
                <form 
                  onSubmit={(e) => { 
                      e.preventDefault(); 
                      addFeeMutation.mutate(formData); 
                  }} 
                  className="space-y-4 pt-4"
                >
                    <div className="space-y-2">
                        <Label>Student</Label>
                        <select required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})}>
                            <option value="">Select Student...</option>
                            {(studentsRes?.data || []).map((stu: any) => (
                                <option key={stu._id} value={stu._id}>{stu.firstName} {stu.lastName} ({stu.rollNumber})</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Fee Type</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.feeType} onChange={e => setFormData({...formData, feeType: e.target.value})}>
                                <option value="Tuition">Tuition</option>
                                <option value="Sports">Sports</option>
                                <option value="Transport">Transport</option>
                                <option value="Hostel">Hostel</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Amount (EGP)</Label>
                            <Input type="number" required min="1" value={formData.amount} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Due Date</Label>
                            <Input type="date" required value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Overdue">Overdue</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Academic Year</Label>
                        <Input required value={formData.academicYear} onChange={e => setFormData({...formData, academicYear: e.target.value})} />
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={addFeeMutation.isPending || !formData.studentId}>
                        {addFeeMutation.isPending ? "Adding..." : "Add Fee Record"}
                    </Button>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="mb-8 overflow-hidden">
        {loadingFees ? (
            <div className="flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : (
            <DataTable columns={columns} data={filteredData} />
        )}
      </section>
    </div>
  );
}

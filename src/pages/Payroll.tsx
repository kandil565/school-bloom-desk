import { Wallet, Search, Filter, Download, CreditCard } from "lucide-react";
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
  { key: "name", label: "employee" },
  { key: "monthStr", label: "date" },
  { key: "base", label: "baseSalary" },
  { key: "adds", label: "allowances" },
  { key: "deds", label: "deductions" },
  { key: "netStr", label: "netPay" },
  { key: "status", label: "status" },
];

const Payroll = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    month: new Date().toISOString().split('T')[0].substring(0, 7), // YYYY-MM
    baseSalary: 0,
    allowancesHRA: 0,
    allowancesDA: 0,
    allowancesOther: 0,
    deductionsPF: 0,
    deductionsTax: 0,
    deductionsInsurance: 0,
    deductionsOther: 0,
    status: "Draft",
  });

  const { data: payrollRes, isLoading: loadingPayroll } = useQuery({
    queryKey: ["payroll"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/payroll"),
  });

  const { data: employeeRes } = useQuery({
    queryKey: ["employees"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/employees"),
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EGP' }).format(amount || 0);
  };

  const payrollData = (payrollRes?.data || []).map((pay: any) => {
    let empName = "Unknown";
    if (pay.employeeId && typeof pay.employeeId === 'object') {
        empName = `${pay.employeeId.firstName || ''} ${pay.employeeId.lastName || ''}`.trim();
    } else if (employeeRes?.data) {
        const emp = employeeRes.data.find(e => e._id === pay.employeeId);
        if (emp) empName = `${emp.firstName || ''} ${emp.lastName || ''}`.trim();
    }

    const totalAdds = (pay.allowances?.hra || 0) + (pay.allowances?.da || 0) + (pay.allowances?.other || 0);
    const totalDeds = (pay.deductions?.pf || 0) + (pay.deductions?.tax || 0) + (pay.deductions?.insurance || 0) + (pay.deductions?.other || 0);

    return {
      ...pay,
      name: empName,
      monthStr: pay.month ? new Date(pay.month).toLocaleDateString([], { year: 'numeric', month: 'short' }) : "-",
      base: formatCurrency(pay.baseSalary),
      adds: formatCurrency(totalAdds),
      deds: formatCurrency(totalDeds),
      netStr: formatCurrency(pay.netSalary),
      status: pay.status || "Draft"
    };
  });

  const filteredData = payrollData.filter((pay: any) => {
    const matchesSearch = pay.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? pay.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const processPayrollMutation = useMutation({
    mutationFn: (newRecord: any) => {
        const totalAdds = newRecord.allowancesHRA + newRecord.allowancesDA + newRecord.allowancesOther;
        const totalDeds = newRecord.deductionsPF + newRecord.deductionsTax + newRecord.deductionsInsurance + newRecord.deductionsOther;
        const netSalary = newRecord.baseSalary + totalAdds - totalDeds;

        return apiRequest("/payroll", { 
            method: "POST", 
            body: JSON.stringify({
                employeeId: newRecord.employeeId,
                month: `${newRecord.month}-01`,
                baseSalary: newRecord.baseSalary,
                allowances: {
                    hra: newRecord.allowancesHRA,
                    da: newRecord.allowancesDA,
                    other: newRecord.allowancesOther,
                },
                deductions: {
                    pf: newRecord.deductionsPF,
                    tax: newRecord.deductionsTax,
                    insurance: newRecord.deductionsInsurance,
                    other: newRecord.deductionsOther,
                },
                netSalary: netSalary,
                status: newRecord.status,
                paymentDate: newRecord.status === "Paid" ? new Date().toISOString() : undefined
            }) 
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payroll"] });
      setIsAddModalOpen(false);
      
      // Reset form
      setFormData(prev => ({
          ...prev, 
          employeeId: "", 
          baseSalary: 0, 
          allowancesHRA: 0, 
          allowancesDA: 0, 
          allowancesOther: 0,
          deductionsPF: 0,
          deductionsTax: 0,
          deductionsInsurance: 0,
          deductionsOther: 0
      }));
      toast({ title: t("success") || "Success", description: "Payroll processed successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to process payroll.", variant: "destructive" });
    }
  });

  const handleExport = () => {
    exportToCSV(filteredData, "Payroll_Report");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  const handleEmployeeChange = (empId: string) => {
      const emp = employeeRes?.data?.find(e => e._id === empId);
      setFormData({
          ...formData,
          employeeId: empId,
          baseSalary: emp?.salary || 0,
      });
  };

  let totalPaid = 0;
  let totalPending = 0;
  payrollData.forEach((p:any) => {
      if (p.status === 'Paid') totalPaid += (p.netSalary || 0);
      else totalPending += (p.netSalary || 0);
  });

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={Wallet} title="payroll" description="payrollDescription" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="financialSummary" value={formatCurrency(totalPaid + totalPending)} color="bg-primary text-primary" />
        <SummaryCard label="Paid" value={formatCurrency(totalPaid)} color="bg-success text-success" />
        <SummaryCard label="pendingPayments" value={formatCurrency(totalPending)} color="bg-accent text-accent" />
        <SummaryCard label="totalEmployees" value={Array.from(new Set(payrollData.map((p:any)=>p.employeeId?._id || p.employeeId))).length.toString()} color="bg-blue-500 text-blue-500" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("searchPayroll")}
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
            <option value="">{t("allCategories") || "All Statuses"}</option>
            <option value="Draft">Draft</option>
            <option value="Approved">Approved</option>
            <option value="Paid">Paid</option>
          </select>
          <button onClick={handleExport} className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t("exportData")}</span>
          </button>
          
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    <CreditCard className="w-4 h-4" />
                    <span>{t("processPayroll")}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Process Payroll Record</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); processPayrollMutation.mutate(formData); }} className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Employee</Label>
                            <select required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.employeeId} onChange={e => handleEmployeeChange(e.target.value)}>
                                <option value="">Select Employee...</option>
                                {(employeeRes?.data || []).map((emp: any) => (
                                    <option key={emp._id} value={emp._id}>{emp.firstName} {emp.lastName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Payroll Month</Label>
                            <Input type="month" required value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})} />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Base Salary (EGP)</Label>
                        <Input type="number" required min="0" value={formData.baseSalary} onChange={e => setFormData({...formData, baseSalary: Number(e.target.value)})} />
                    </div>

                    <div className="p-3 border rounded-lg bg-muted/20 space-y-3">
                        <p className="font-semibold text-sm">Allowances</p>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-1"><Label className="text-xs">HRA</Label><Input type="number" value={formData.allowancesHRA} onChange={e => setFormData({...formData, allowancesHRA: Number(e.target.value)})} /></div>
                            <div className="space-y-1"><Label className="text-xs">DA</Label><Input type="number" value={formData.allowancesDA} onChange={e => setFormData({...formData, allowancesDA: Number(e.target.value)})} /></div>
                            <div className="space-y-1"><Label className="text-xs">Other</Label><Input type="number" value={formData.allowancesOther} onChange={e => setFormData({...formData, allowancesOther: Number(e.target.value)})} /></div>
                        </div>
                    </div>

                    <div className="p-3 border rounded-lg bg-muted/20 space-y-3">
                        <p className="font-semibold text-sm">Deductions</p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                            <div className="space-y-1"><Label className="text-xs">PF</Label><Input type="number" value={formData.deductionsPF} onChange={e => setFormData({...formData, deductionsPF: Number(e.target.value)})} /></div>
                            <div className="space-y-1"><Label className="text-xs">Tax</Label><Input type="number" value={formData.deductionsTax} onChange={e => setFormData({...formData, deductionsTax: Number(e.target.value)})} /></div>
                            <div className="space-y-1"><Label className="text-xs">Insurance</Label><Input type="number" value={formData.deductionsInsurance} onChange={e => setFormData({...formData, deductionsInsurance: Number(e.target.value)})} /></div>
                            <div className="space-y-1"><Label className="text-xs">Other</Label><Input type="number" value={formData.deductionsOther} onChange={e => setFormData({...formData, deductionsOther: Number(e.target.value)})} /></div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Status</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                            <option value="Draft">Draft</option>
                            <option value="Approved">Approved</option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>

                    <div className="bg-primary/10 p-4 rounded-xl flex justify-between items-center mt-4">
                        <span className="font-bold">Estimated Net Salary:</span>
                        <span className="font-bold text-lg text-primary">
                            EGP {(formData.baseSalary + formData.allowancesHRA + formData.allowancesDA + formData.allowancesOther - formData.deductionsPF - formData.deductionsTax - formData.deductionsInsurance - formData.deductionsOther).toLocaleString()}
                        </span>
                    </div>

                    <Button type="submit" className="w-full mt-4" disabled={processPayrollMutation.isPending || !formData.employeeId}>
                        {processPayrollMutation.isPending ? "Processing..." : "Process Payroll"}
                    </Button>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="mb-8 overflow-hidden">
        {loadingPayroll ? (
            <div className="flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : (
            <DataTable columns={columns} data={filteredData} />
        )}
      </section>
    </div>
  );
};

export default Payroll;

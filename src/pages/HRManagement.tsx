import { Users, Search, Filter, Plus, Download } from "lucide-react";
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

const cols = [
  { key: "name", label: "employee" },
  { key: "position", label: "position" },
  { key: "department", label: "department" },
  { key: "joined", label: "joinDate" },
  { key: "status", label: "status" },
];

const HRManagement = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    department: "",
    dateOfJoining: new Date().toISOString().split('T')[0],
    isActive: true,
  });

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/employees"),
  });

  const employeeData = (apiResponse?.data || []).map((emp: any) => ({
    ...emp,
    name: `${emp.firstName || ''} ${emp.lastName || ''}`.trim(),
    joined: emp.dateOfJoining ? new Date(emp.dateOfJoining).toISOString().split('T')[0] : "-",
    status: emp.isActive ? "Active" : "Inactive"
  }));

  const filteredData = employeeData.filter((emp: any) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (emp.department || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept ? emp.department === filterDept : true;
    return matchesSearch && matchesDept;
  });

  const addEmployeeMutation = useMutation({
    mutationFn: (newEmp: any) => apiRequest("/employees", { method: "POST", body: JSON.stringify(newEmp) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setIsAddModalOpen(false);
      setFormData({ firstName: "", lastName: "", email: "", position: "", department: "", dateOfJoining: new Date().toISOString().split('T')[0], isActive: true });
      toast({ title: t("success") || "Success", description: "Employee added successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to add employee.", variant: "destructive" });
    }
  });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployeeMutation.mutate({
      ...formData,
      employeeId: `EMP-${Math.floor(Math.random() * 10000)}`
    });
  };

  const handleExport = () => {
    exportToCSV(filteredData, "Employees_List");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  const departments = Array.from(new Set(employeeData.map((e: any) => e.department).filter(Boolean)));

  return (
    <main className="flex flex-col gap-6 md:gap-8 w-full hr-portal-view pb-10">
      <PageHeader icon={Users} title="hr" description="hrDescription" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mt-1 mb-2">
        <SummaryCard label="totalEmployees" value={employeeData.length.toString()} color="bg-blue-500 text-blue-600" />
        <SummaryCard label="activeStaff" value={employeeData.filter((e: any) => e.isActive).length.toString()} color="bg-emerald-500 text-emerald-600" />
        <SummaryCard label="onLeave" value={employeeData.filter((e: any) => !e.isActive).length.toString()} color="bg-amber-500 text-amber-600" />
        <SummaryCard label="inactive" value="0" color="bg-red-500 text-red-600" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("search") || "Search employees..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 ps-10 pe-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="">{t("allCategories") || "All Departments"}</option>
            {departments.map((dept: any) => (
               <option key={dept} value={dept}>{dept}</option>
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
                <span>{t("addEmployee") || "Add Employee"}</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddEmployee} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input required value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Date of Joining</Label>
                  <Input type="date" required value={formData.dateOfJoining} onChange={e => setFormData({...formData, dateOfJoining: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={formData.isActive.toString()} 
                    onChange={e => setFormData({...formData, isActive: e.target.value === 'true'})}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive / On Leave</option>
                  </select>
                </div>
                <Button type="submit" className="w-full mt-6" disabled={addEmployeeMutation.isPending}>
                  {addEmployeeMutation.isPending ? "Adding..." : "Add Employee"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

        </div>
      </div>

      <section className="mb-8 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <DataTable columns={cols} data={filteredData} />
        )}
      </section>
    </main>
  );
};

export default HRManagement;

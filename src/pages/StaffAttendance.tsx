import { UserCheck, Search, Filter, Plus, Download } from "lucide-react";
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
  { key: "date", label: "date" },
  { key: "checkIn", label: "checkIn" },
  { key: "checkOut", label: "checkOut" },
  { key: "status", label: "status" },
];

const StaffAttendance = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    date: new Date().toISOString().split('T')[0],
    status: "Present",
    checkInTime: "08:00",
    checkOutTime: "15:00",
  });

  const { data: attendanceRes, isLoading: loadingAttendance } = useQuery({
    queryKey: ["attendance"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/attendance"),
  });

  const { data: employeeRes } = useQuery({
    queryKey: ["employees"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/employees"),
  });

  const attendanceData = (attendanceRes?.data || []).map((att: any) => {
    // Populate employee name from employeeRes if populated is missing
    let empName = "Unknown";
    if (att.employeeId && typeof att.employeeId === 'object') {
        empName = `${att.employeeId.firstName || ''} ${att.employeeId.lastName || ''}`.trim();
    } else if (employeeRes?.data) {
        const emp = employeeRes.data.find(e => e._id === att.employeeId);
        if (emp) empName = `${emp.firstName || ''} ${emp.lastName || ''}`.trim();
    }

    // format time 
    const formatTime = (dateStr: string) => {
      if (!dateStr) return "—";
      return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return {
      ...att,
      name: empName,
      date: att.date ? new Date(att.date).toISOString().split('T')[0] : "-",
      checkIn: formatTime(att.checkInTime),
      checkOut: formatTime(att.checkOutTime),
      status: att.status || "Present"
    };
  });

  const filteredData = attendanceData.filter((att: any) => {
    const matchesSearch = att.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterDate ? att.date === filterDate : true;
    return matchesSearch && matchesDate;
  });

  const addAttendanceMutation = useMutation({
    mutationFn: (newRecord: any) => {
        // Construct full ISO strings for times
        const dateStr = newRecord.date;
        const checkInIso = newRecord.status === "Absent" || !newRecord.checkInTime ? undefined : new Date(`${dateStr}T${newRecord.checkInTime}:00`).toISOString();
        const checkOutIso = newRecord.status === "Absent" || !newRecord.checkOutTime ? undefined : new Date(`${dateStr}T${newRecord.checkOutTime}:00`).toISOString();
        
        return apiRequest("/attendance", { 
            method: "POST", 
            body: JSON.stringify({
                employeeId: newRecord.employeeId,
                date: dateStr,
                status: newRecord.status,
                checkInTime: checkInIso,
                checkOutTime: checkOutIso
            }) 
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      setIsAddModalOpen(false);
      setFormData({ employeeId: "", date: new Date().toISOString().split('T')[0], status: "Present", checkInTime: "08:00", checkOutTime: "15:00" });
      toast({ title: t("success") || "Success", description: "Attendance recorded." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to record attendance.", variant: "destructive" });
    }
  });

  const handleExport = () => {
    exportToCSV(filteredData, "Staff_Attendance");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = attendanceData.filter(a => a.date === todayStr);

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={UserCheck} title="attendance" description="attendanceDescription" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="todayAttendance" value={todayAttendance.filter(a => a.status === 'Present').length.toString()} color="bg-success text-success" />
        <SummaryCard label="absent" value={todayAttendance.filter(a => a.status === 'Absent').length.toString()} color="bg-destructive text-destructive" />
        <SummaryCard label="lateArrivals" value={todayAttendance.filter(a => a.status === 'Late').length.toString()} color="bg-accent text-accent" />
        <SummaryCard label="onLeave" value={todayAttendance.filter(a => a.status === 'Leave').length.toString()} color="bg-primary text-primary" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
                type="text"
                placeholder={t("search") || "Search employee..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 ps-10 pe-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <Input 
                type="date"
                className="flex-1 md:flex-none h-11 w-auto rounded-xl border border-border bg-card" 
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
            />
            
            <button onClick={handleExport} className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{t("exportData")}</span>
            </button>
            
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        <Plus className="w-4 h-4" />
                        <span>Add Record</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Attendance Record</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => { e.preventDefault(); addAttendanceMutation.mutate(formData); }} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Employee</Label>
                            <select required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})}>
                                <option value="">Select Employee...</option>
                                {(employeeRes?.data || []).map((emp: any) => (
                                    <option key={emp._id} value={emp._id}>{emp.firstName} {emp.lastName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Date</Label>
                                <Input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                    <option value="Late">Late</option>
                                    <option value="Leave">Leave</option>
                                </select>
                            </div>
                        </div>
                        {formData.status !== "Absent" && formData.status !== "Leave" && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Check In Time</Label>
                                    <Input type="time" value={formData.checkInTime} onChange={e => setFormData({...formData, checkInTime: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Check Out Time</Label>
                                    <Input type="time" value={formData.checkOutTime} onChange={e => setFormData({...formData, checkOutTime: e.target.value})} />
                                </div>
                            </div>
                        )}
                        <Button type="submit" className="w-full mt-6" disabled={addAttendanceMutation.isPending || !formData.employeeId}>
                            {addAttendanceMutation.isPending ? "Saving..." : "Save Record"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
      </div>

      <section className="mb-8 overflow-hidden">
        {loadingAttendance ? (
            <div className="flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : (
            <DataTable columns={columns} data={filteredData} />
        )}
      </section>
    </div>
  );
};

export default StaffAttendance;

import { GraduationCap, Search, Filter, Plus, Download } from "lucide-react";
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
    { key: "rollNumber", label: "rollNumber" },
    { key: "name", label: "fullName" },
    { key: "grade", label: "grade" },
    { key: "class", label: "studentClass" },
    { key: "parentName", label: "parentName" },
    { key: "status", label: "status" },
];

const StudentManagement = () => {
    const { t } = useLanguage();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    
    const [searchTerm, setSearchTerm] = useState("");
    const [filterGrade, setFilterGrade] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: new Date().toISOString().split('T')[0],
        gender: "Male",
        email: "",
        grade: "",
        section: "",
        parentName: "",
        isActive: true,
    });

    const { data: apiResponse, isLoading, error } = useQuery({
        queryKey: ["students"],
        queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/students"),
    });

    const studentData = (apiResponse?.data || []).map((s: any) => ({
        ...s,
        name: `${s.firstName || ''} ${s.lastName || ''}`.trim(),
        class: s.section || '',
        status: s.isActive ? 'Active' : 'Inactive',
    }));

    const filteredData = studentData.filter((s: any) => {
        const matchesSearch = (s.name?.toLowerCase().includes(searchTerm.toLowerCase())) || 
                              (s.rollNumber?.includes(searchTerm));
        const matchesGrade = filterGrade ? s.grade === filterGrade : true;
        return matchesSearch && matchesGrade;
    });

    const grades = Array.from(new Set(studentData.map((s: any) => s.grade).filter(Boolean)));

    const handleExport = () => {
        exportToCSV(filteredData, "Students_List");
        toast({ title: "Export Successful", description: "Data exported to CSV" });
    };

    const addStudentMutation = useMutation({
        mutationFn: (newStudent: any) => apiRequest("/students", { method: "POST", body: JSON.stringify(newStudent) }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["students"] });
          setIsAddModalOpen(false);
          setFormData({ firstName: "", lastName: "", dateOfBirth: new Date().toISOString().split('T')[0], gender: "Male", email: "", grade: "", section: "", parentName: "", isActive: true });
          toast({ title: t("success") || "Success", description: "Student added successfully." });
        },
        onError: (error: any) => {
          toast({ title: t("error") || "Error", description: error.message || "Failed to add student.", variant: "destructive" });
        }
    });
    
    const handleAddStudent = (e: React.FormEvent) => {
        e.preventDefault();
        addStudentMutation.mutate({
          ...formData,
          rollNumber: `ST-${Math.floor(Math.random() * 100000)}`
        });
    };

    return (
        <main className="flex flex-col gap-6 md:gap-8 w-full students-portal-view pb-10">
            <PageHeader icon={GraduationCap} title="students" description="studentsDescription" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <SummaryCard label="totalStudents" value={studentData.length.toString()} color="bg-indigo-500 text-indigo-600" />
                <SummaryCard label="activeStudents" value={studentData.filter((s:any) => s.isActive).length.toString()} color="bg-emerald-500 text-emerald-600" />
                <SummaryCard label="pendingFees" value="EGP 0" color="bg-destructive text-destructive" />
                <SummaryCard label="graduated" value="0" color="bg-amber-500 text-amber-600" />
            </div>

            <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder={t("searchStudent")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-11 ps-10 pe-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <select 
                        className="flex-1 md:flex-none h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
                        value={filterGrade}
                        onChange={(e) => setFilterGrade(e.target.value)}
                    >
                        <option value="">{t("allGrades") || "All Grades"}</option>
                        {grades.map((grade: any) => (
                           <option key={grade} value={grade}>{grade}</option>
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
                                <span>{t("addStudent")}</span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{t("addStudent") || "Add Student"}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddStudent} className="space-y-4 pt-4">
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Date of Birth</Label>
                                        <Input type="date" required value={formData.dateOfBirth} onChange={e => setFormData({...formData, dateOfBirth: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Gender</Label>
                                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Grade</Label>
                                        <Input required value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Section Class</Label>
                                        <Input required value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Parent Name</Label>
                                    <Input required value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Student Email (Optional)</Label>
                                    <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                </div>
                                <Button type="submit" className="w-full mt-6" disabled={addStudentMutation.isPending}>
                                    {addStudentMutation.isPending ? "Adding..." : "Add Student"}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <section className="mb-8 overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center p-20">
                        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    </div>
                ) : error ? (
                    <div className="p-8 text-center text-destructive bg-destructive/10 rounded-xl">
                        {t("errorLoadingData")}
                    </div>
                ) : (
                    <DataTable
                        columns={cols}
                        data={filteredData}
                    />
                )}
            </section>
        </main>
    );
};

export default StudentManagement;

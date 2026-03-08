import { FileText, Search, Filter, Plus, Download } from "lucide-react";
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
  { key: "subjectName", label: "Subject" },
  { key: "semester", label: "Semester" },
  { key: "marks", label: "Marks" },
  { key: "grade", label: "Grade" },
];

export default function GradesAssessment() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSemester, setFilterSemester] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    subjectName: "",
    academicYear: new Date().getFullYear().toString() + "-" + (new Date().getFullYear() + 1).toString(),
    semester: "Semester 1",
    marks: 0,
    totalMarks: 100,
    remarks: "",
  });

  const { data: gradesRes, isLoading: loadingGrades } = useQuery({
    queryKey: ["grades"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/grades"),
  });

  const { data: studentsRes } = useQuery({
    queryKey: ["students"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/students"),
  });

  const gradesData = (gradesRes?.data || []).map((g: any) => {
    let studentName = "Unknown";
    let rollNum = "";
    if (g.studentId && typeof g.studentId === 'object') {
        studentName = `${g.studentId.firstName || ''} ${g.studentId.lastName || ''}`.trim();
        rollNum = g.studentId.rollNumber || "";
    } else if (g.studentId && studentsRes?.data) {
        const student = studentsRes.data.find(s => s._id === g.studentId);
        if (student) {
            studentName = `${student.firstName || ''} ${student.lastName || ''}`.trim();
            rollNum = student.rollNumber || "";
        }
    }

    return {
      ...g,
      studentStr: `${studentName} ${rollNum ? `(${rollNum})` : ''}`,
      marks: `${g.marks || 0} / ${g.totalMarks || 100}`,
      grade: g.grade || 'N/A'
    };
  });

  const semesters = Array.from(new Set(gradesData.map((g: any) => g.semester).filter(Boolean)));

  const filteredData = gradesData.filter((g: any) => {
    const matchesSearch = 
      g.studentStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.subjectName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = filterSemester ? g.semester === filterSemester : true;
    return matchesSearch && matchesSemester;
  });

  const calculateGrade = (marks: number, total: number) => {
      const perc = (marks / total) * 100;
      if (perc >= 90) return 'A+';
      if (perc >= 80) return 'A';
      if (perc >= 70) return 'B';
      if (perc >= 60) return 'C';
      if (perc >= 50) return 'D';
      return 'F';
  };

  const addGradeMutation = useMutation({
    mutationFn: (newRecord: any) => {
        const percentage = (newRecord.marks / newRecord.totalMarks) * 100;
        const autoGrade = calculateGrade(newRecord.marks, newRecord.totalMarks);
        return apiRequest("/grades", { 
            method: "POST", 
            body: JSON.stringify({
                ...newRecord,
                percentage,
                grade: autoGrade
            }) 
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grades"] });
      setIsAddModalOpen(false);
      
      // Keep structural defaults
      setFormData(prev => ({ 
          ...prev,
          studentId: "", 
          subjectName: "", 
          marks: 0, 
          remarks: "" 
      }));
      toast({ title: t("success") || "Success", description: "Grade recorded successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to add grade.", variant: "destructive" });
    }
  });

  const handleExport = () => {
    exportToCSV(filteredData, "Grades_Report");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  // Stats
  const totalRecords = gradesData.length;
  const passedRecords = gradesData.filter(g => g.grade !== 'F' && g.grade !== 'N/A').length;
  const passRate = totalRecords > 0 ? Math.round((passedRecords / totalRecords) * 100) : 0;

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={FileText} title="grades" description="academicPerformance" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="totalRecords" value={totalRecords.toString()} color="bg-primary text-primary" />
        <SummaryCard label="passRate" value={`${passRate}%`} color="bg-success text-success" />
        <SummaryCard label="totalStudents" value={Array.from(new Set(gradesData.map((g:any)=>g.studentId?._id || g.studentId))).length.toString()} color="bg-accent text-accent" />
        <SummaryCard label="failed" value={(totalRecords - passedRecords).toString()} color="bg-destructive text-destructive" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("search") || "Search student or subject..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 ps-10 pe-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
          >
            <option value="">{t("allCategories") || "All Semesters"}</option>
            {semesters.map((sem: any) => (
                <option key={sem} value={sem}>{sem}</option>
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
                    <span>{t("addItem")}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Grade Record</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); addGradeMutation.mutate(formData); }} className="space-y-4 pt-4">
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
                            <Label>Subject</Label>
                            <Input required value={formData.subjectName} onChange={e => setFormData({...formData, subjectName: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Semester</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.semester} onChange={e => setFormData({...formData, semester: e.target.value})}>
                                <option value="Semester 1">Semester 1</option>
                                <option value="Semester 2">Semester 2</option>
                                <option value="Summer">Summer</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Obtained Marks</Label>
                            <Input type="number" required min="0" value={formData.marks} onChange={e => setFormData({...formData, marks: Number(e.target.value)})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Total Marks</Label>
                            <Input type="number" required min="1" value={formData.totalMarks} onChange={e => setFormData({...formData, totalMarks: Number(e.target.value)})} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Academic Year</Label>
                        <Input required value={formData.academicYear} onChange={e => setFormData({...formData, academicYear: e.target.value})} />
                    </div>

                    <div className="bg-primary/10 p-4 rounded-xl flex justify-between items-center mt-4">
                        <span className="font-bold">Auto-calculated Grade:</span>
                        <span className="font-bold text-lg text-primary">
                            {calculateGrade(formData.marks, formData.totalMarks)}
                        </span>
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={addGradeMutation.isPending || !formData.studentId}>
                        {addGradeMutation.isPending ? "Saving..." : "Save Grade"}
                    </Button>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="mb-8 overflow-hidden">
        {loadingGrades ? (
            <div className="flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : (
            <DataTable columns={columns} data={filteredData} />
        )}
      </section>
    </div>
  );
}

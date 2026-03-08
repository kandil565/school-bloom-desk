import { BookOpen, Search, Plus, Download } from "lucide-react";
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
  { key: "title", label: "Title" },
  { key: "courseCode", label: "Course Code" },
  { key: "department", label: "Department" },
  { key: "credits", label: "Credits" },
  { key: "status", label: "status" },
];

export default function CurriculumManagement() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    courseCode: "",
    department: "Science",
    credits: 3,
    status: "Active"
  });

  const { data: currRes, isLoading } = useQuery({
    queryKey: ["curriculum"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/curriculum"),
  });

  const curriculumsData = currRes?.data || [];

  const filteredData = curriculumsData.filter((item: any) => {
    const matchesSearch = 
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.courseCode?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment ? item.department === filterDepartment : true;
    return matchesSearch && matchesDepartment;
  });

  const addMutaion = useMutation({
    mutationFn: (newRecord: any) => apiRequest("/curriculum", { method: "POST", body: JSON.stringify(newRecord) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curriculum"] });
      setIsAddModalOpen(false);
      setFormData({ title: "", courseCode: "", department: "Science", credits: 3, status: "Active" });
      toast({ title: t("success") || "Success", description: "Curriculum added successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to add curriculum.", variant: "destructive" });
    }
  });

  const handleExport = () => {
    exportToCSV(filteredData, "Curriculum_Report");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  const totalCourses = curriculumsData.length;
  const activeCourses = curriculumsData.filter(i => i.status === 'Active').length;
  const totalCredits = curriculumsData.reduce((sum, item) => sum + (item.credits || 0), 0);
  
  const categories = Array.from(new Set(curriculumsData.map(item => item.department))).filter(Boolean);

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={BookOpen} title="curriculum" description="manageLand" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <SummaryCard label="courses" value={totalCourses.toString()} color="bg-primary text-primary" />
        <SummaryCard label="Active" value={activeCourses.toString()} color="bg-success text-success" />
        <SummaryCard label="totalEmployees" value={`${totalCredits} Credits`} color="bg-accent text-accent" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("search") || "Search courses..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 ps-10 pe-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">{t("allCategories") || "All Departments"}</option>
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
                    <span>{t("addItem")}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Course</DialogTitle>
                </DialogHeader>
                <form 
                  onSubmit={(e) => { 
                      e.preventDefault(); 
                      addMutaion.mutate(formData); 
                  }} 
                  className="space-y-4 pt-4"
                >
                    <div className="space-y-2">
                        <Label>Course Title</Label>
                        <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Course Code</Label>
                            <Input required value={formData.courseCode} onChange={e => setFormData({...formData, courseCode: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Credits</Label>
                            <Input type="number" required min="1" value={formData.credits} onChange={e => setFormData({...formData, credits: Number(e.target.value)})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Department</Label>
                            <Input required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={addMutaion.isPending}>
                        {addMutaion.isPending ? "Adding..." : "Add Course"}
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

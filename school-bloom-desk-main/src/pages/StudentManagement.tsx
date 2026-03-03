import { GraduationCap, Search, Filter, Plus, Download } from "lucide-react";
import { PageHeader, DataTable, SummaryCard } from "@/components/PageShared";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const cols = [
    { key: "rollNumber", label: "rollNumber" },
    { key: "name", label: "fullName" },
    { key: "grade", label: "grade" },
    { key: "class", label: "studentClass" },
    { key: "parentName", label: "parentName" },
    { key: "status", label: "status" },
];

const students = [
    { rollNumber: "1001", name: "أحمد علي", grade: "10th", class: "A", parentName: "علي محمد", status: "Active" },
    { rollNumber: "1002", name: "ليلى حسن", grade: "10th", class: "B", parentName: "حسن محمود", status: "Active" },
    { rollNumber: "1003", name: "يوسف ابراهيم", grade: "11th", class: "A", parentName: "ابراهيم خالد", status: "Active" },
    { rollNumber: "1004", name: "فاطمة زهراء", grade: "9th", class: "C", parentName: "سيد جابر", status: "Active" },
    { rollNumber: "1005", name: "محمود حسن", grade: "12th", class: "A", parentName: "حسن علي", status: "Graduated" },
    { rollNumber: "1006", name: "مريم سعيد", grade: "8th", class: "B", parentName: "سعيد نور", status: "Active" },
    { rollNumber: "1007", name: "خالد منصور", grade: "10th", class: "A", parentName: "منصور أحمد", status: "Active" },
    { rollNumber: "1008", name: "نادية يوسف", grade: "11th", class: "B", parentName: "يوسف ممدوح", status: "Inactive" },
    { rollNumber: "1009", name: "عمر فريد", grade: "9th", class: "A", parentName: "فريد شوقي", status: "Active" },
    { rollNumber: "1010", name: "هناء ذكي", grade: "12th", class: "C", parentName: "ذكي رشاد", status: "Active" },
];

const StudentManagement = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <main className="flex flex-col gap-6 md:gap-8 w-full students-portal-view pb-10">
            <PageHeader icon={GraduationCap} title="students" description="studentsDescription" />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <SummaryCard label="totalStudents" value="1,240" color="bg-indigo-500 text-indigo-600" />
                <SummaryCard label="activeStudents" value="1,180" color="bg-emerald-500 text-emerald-600" />
                <SummaryCard label="pendingFees" value="EGP 12,450" color="bg-destructive text-destructive" />
                <SummaryCard label="graduated" value="152" color="bg-amber-500 text-amber-600" />
            </div>

            {/* Actions Bar */}
            <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder={t("searchStudent")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-11 ps-10 pe-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                        <Filter className="w-4 h-4" />
                        <span>{t("allGrades")}</span>
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">{t("exportData")}</span>
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        <Plus className="w-4 h-4" />
                        <span>{t("addStudent")}</span>
                    </button>
                </div>
            </div>

            <section className="mb-8 overflow-hidden">
                <DataTable
                    columns={cols}
                    data={students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.rollNumber.includes(searchTerm))}
                />
            </section>
        </main>
    );
};

export default StudentManagement;

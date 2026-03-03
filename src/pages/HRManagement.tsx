import { Users } from "lucide-react";
import { PageHeader, DataTable, SummaryCard } from "@/components/PageShared";

const cols = [
  { key: "name", label: "employee" },
  { key: "position", label: "position" },
  { key: "department", label: "department" },
  { key: "joined", label: "joinDate" },
  { key: "status", label: "status" },
];

const employees = [
  { name: "أحمد سيد", position: "Senior Teacher", department: "Mathematics", joined: "2019-08-15", status: "Active" },
  { name: "سارة محمود", position: "Lab Technician", department: "Science", joined: "2021-01-10", status: "Active" },
  { name: "محمد حسن", position: "Teacher", department: "English", joined: "2020-09-01", status: "On Leave" },
  { name: "فاطمة إبراهيم", position: "Coordinator", department: "Arabic", joined: "2018-03-20", status: "Active" },
  { name: "خالد علي", position: "Coach", department: "PE", joined: "2022-06-12", status: "Active" },
  { name: "نورا سالم", position: "IT Support", department: "IT", joined: "2023-02-01", status: "Inactive" },
];

const HRManagement = () => (
  <main className="flex flex-col gap-6 md:gap-8 w-full hr-portal-view">
    <PageHeader icon={Users} title="hr" description="hrDescription" />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mt-1 mb-2">
      <SummaryCard label="totalEmployees" value="248" color="bg-blue-500 text-blue-600" />
      <SummaryCard label="activeStaff" value="230" color="bg-emerald-500 text-emerald-600" />
      <SummaryCard label="onLeave" value="12" color="bg-amber-500 text-amber-600" />
      <SummaryCard label="inactive" value="6" color="bg-red-500 text-red-600" />
    </div>

    <section className="mb-8">
      <DataTable columns={cols} data={employees} />
    </section>
  </main>
);

export default HRManagement;

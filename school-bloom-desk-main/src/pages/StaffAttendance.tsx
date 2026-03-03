import { UserCheck } from "lucide-react";
import { PageHeader, DataTable, SummaryCard } from "@/components/PageShared";

const columns = [
  { key: "name", label: "employee" },
  { key: "department", label: "department" },
  { key: "checkIn", label: "checkIn" },
  { key: "checkOut", label: "checkOut" },
  { key: "status", label: "status" },
];

const data = [
  { name: "أحمد سيد", department: "Mathematics", checkIn: "07:45 AM", checkOut: "03:15 PM", status: "Present" },
  { name: "سارة محمود", department: "Science", checkIn: "07:50 AM", checkOut: "03:20 PM", status: "Present" },
  { name: "محمد حسن", department: "English", checkIn: "—", checkOut: "—", status: "Absent" },
  { name: "فاطمة إبراهيم", department: "Arabic", checkIn: "08:00 AM", checkOut: "03:00 PM", status: "Present" },
  { name: "خالد علي", department: "PE", checkIn: "07:55 AM", checkOut: "—", status: "Late" },
  { name: "نورا سالم", department: "IT", checkIn: "07:30 AM", checkOut: "03:30 PM", status: "Present" },
];

const StaffAttendance = () => (
  <div className="space-y-6">
    <PageHeader icon={UserCheck} title="attendance" description="attendanceDescription" />
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <SummaryCard label="todayAttendance" value="213" color="bg-success" />
      <SummaryCard label="absent" value="18" color="bg-destructive" />
      <SummaryCard label="lateArrivals" value="12" color="bg-accent" />
      <SummaryCard label="onLeave" value="5" color="bg-primary" />
    </div>
    <DataTable columns={columns} data={data} />
  </div>
);

export default StaffAttendance;

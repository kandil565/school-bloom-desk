import { Wallet, Search, Filter, Plus, Download, CreditCard } from "lucide-react";
import { PageHeader, DataTable, SummaryCard } from "@/components/PageShared";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const columns = [
  { key: "name", label: "employee" },
  { key: "baseSalary", label: "baseSalary" },
  { key: "allowances", label: "allowances" },
  { key: "deductions", label: "deductions" },
  { key: "net", label: "netPay" },
  { key: "status", label: "status" },
];

const payrollData = [
  { name: "أحمد سيد", baseSalary: "3,200 ج.م", allowances: "400 ج.م", deductions: "280 ج.م", net: "3,320 ج.م", status: "Paid" },
  { name: "سارة محمود", baseSalary: "2,800 ج.م", allowances: "300 ج.م", deductions: "230 ج.م", net: "2,870 ج.م", status: "Paid" },
  { name: "محمد حسن", baseSalary: "2,600 ج.م", allowances: "250 ج.م", deductions: "210 ج.م", net: "2,640 ج.م", status: "Pending" },
  { name: "فاطمة إبراهيم", baseSalary: "3,000 ج.م", allowances: "350 ج.م", deductions: "260 ج.م", net: "3,090 ج.م", status: "Paid" },
  { name: "خالد علي", baseSalary: "2,400 ج.م", allowances: "200 ج.م", deductions: "190 ج.م", net: "2,410 ج.م", status: "Pending" },
  { name: "نورا سالم", baseSalary: "2,900 ج.م", allowances: "320 ج.م", deductions: "240 ج.م", net: "2,980 ج.م", status: "Paid" },
];

const Payroll = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = payrollData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={Wallet} title="payroll" description="payrollDescription" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="financialSummary" value="2,450,230 ج.م" color="bg-primary text-primary" />
        <SummaryCard label="Paid" value="1,938,400 ج.م" color="bg-success text-success" />
        <SummaryCard label="pendingPayments" value="511,830 ج.م" color="bg-accent text-accent" />
        <SummaryCard label="totalEmployees" value="248" color="bg-destructive text-destructive" />
      </div>

      {/* Modern Action Bar */}
      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in" style={{ animationDelay: "100ms" }}>
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

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" />
            <span>{t("allClasses")}</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t("exportData")}</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <CreditCard className="w-4 h-4" />
            <span>{t("processPayroll")}</span>
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default Payroll;

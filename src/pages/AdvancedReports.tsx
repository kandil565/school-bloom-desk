import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

export default function AdvancedReports() {
  const { t } = useLanguage();
  const { toast } = useToast();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("advanced_reports")}</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("generated")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("scheduled")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("exportData")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t("recentReports")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{t("attendanceReport")}</h3>
                <p className="text-sm text-gray-500">{t("attendanceReportDesc")}</p>
              </div>
              <Button size="sm" variant="outline" className="gap-2" onClick={() => toast({ title: "Downloading Report", description: "Your report is being generated and will download shortly." })}>
                <Download className="h-4 w-4" />
                {t("exportData")}
              </Button>
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{t("payrollSummary")}</h3>
                <p className="text-sm text-gray-500">{t("payrollSummaryDesc")}</p>
              </div>
              <Button size="sm" variant="outline" className="gap-2" onClick={() => toast({ title: "Downloading Report", description: "Your report is being generated and will download shortly." })}>
                <Download className="h-4 w-4" />
                {t("exportData")}
              </Button>
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{t("inventoryReport")}</h3>
                <p className="text-sm text-gray-500">{t("inventoryReportDesc")}</p>
              </div>
              <Button size="sm" variant="outline" className="gap-2" onClick={() => toast({ title: "Downloading Report", description: "Your report is being generated and will download shortly." })}>
                <Download className="h-4 w-4" />
                {t("exportData")}
              </Button>
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{t("financialReport")}</h3>
                <p className="text-sm text-gray-500">{t("financialReportDesc")}</p>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                {t("exportData")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

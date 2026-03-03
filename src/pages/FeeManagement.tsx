import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FeeManagement() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("fees")}</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("addItem")}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("totalPaid")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250,000 ج.م</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("Paid")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">210,500 ج.م</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("Pending")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">39,500 ج.م</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("financialSummary")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84.2%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            {t("pendingFees")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">أحمد علي</h3>
                  <p className="text-sm text-gray-600">{t("courses")} - {t("September")}</p>
                  <p className="text-xs text-gray-400 mt-1">تاريخ الاستحقاق: 30 سبتمبر 2025</p>
                </div>
                <span className="font-bold text-lg text-red-600">5,000 ج.م</span>
              </div>
              <Button className="w-full mt-3" size="sm">{t("send")}</Button>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">فاطمة محمد</h3>
                  <p className="text-sm text-gray-600">{t("activities")}</p>
                  <p className="text-xs text-gray-400 mt-1">تاريخ الاستحقاق: 15 مارس 2026</p>
                </div>
                <span className="font-bold text-lg text-red-600">2,500 ج.م</span>
              </div>
              <Button className="w-full mt-3" size="sm">{t("send")}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

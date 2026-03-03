import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Notifications() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("notificationsSystem")}</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("sendMessage")}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("Action")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("viewAll")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,089</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("Pending")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">معدل الفتح</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.3%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {t("recentActivity")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{t("attendance")}</h3>
                  <p className="text-sm text-gray-600">أخطر الطلاب الغائبين اليوم</p>
                  <p className="text-xs text-gray-400">قبل 30 دقيقة</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">SMS</span>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">تنبيه {t("fees")}</h3>
                  <p className="text-sm text-gray-600">تذكير بموعد دفع {t("fees")}</p>
                  <p className="text-xs text-gray-400">قبل ساعة</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Email</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

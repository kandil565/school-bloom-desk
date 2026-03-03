import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Transportation() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("transportation")}</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("addItem")}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("Active")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("totalStudents")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("employee")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("course")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("busStatus")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{t("pending")} رقم 01</h3>
                  <p className="text-sm text-gray-500">{t("employee")}: محمد أحمد</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{t("operational")}</span>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{t("pending")} رقم 02</h3>
                  <p className="text-sm text-gray-500">{t("employee")}: علي محمود</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{t("maintenance")}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

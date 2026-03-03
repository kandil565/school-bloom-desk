import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CurriculumManagement() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("curriculum")}</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("addItem")}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("courses")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("allClasses")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("totalEmployees")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("manageLand")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">{t("morning")}</h3>
              <p className="text-sm text-gray-500">8:00 {t("morning")} - 12:00 {t("noon")}</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">{t("evening")}</h3>
              <p className="text-sm text-gray-500">2:00 {t("afternoon")} - 5:00 {t("evening")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

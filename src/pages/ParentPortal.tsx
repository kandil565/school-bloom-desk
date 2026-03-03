import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ParentPortal() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("parent_portal")}</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("Student")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold">أحمد علي</h3>
                <p className="text-sm text-gray-500">{t("studentClass")}: الرابع الابتدائي</p>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold">فاطمة علي</h3>
                <p className="text-sm text-gray-500">{t("studentClass")}: الثاني الإعدادي</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t("Action")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-3 py-2">
                <p className="font-semibold text-sm">{t("absent")}</p>
                <p className="text-xs text-gray-500">1 ساعة مضت</p>
              </div>
              <div className="border-l-4 border-green-500 pl-3 py-2">
                <p className="font-semibold text-sm">{t("grade")}</p>
                <p className="text-xs text-gray-500">3 ساعات مضت</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {t("parentConnect")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button className="w-full">{t("teacherContact")}</Button>
            <Button variant="outline" className="w-full">{t("schoolAdmin")}</Button>
            <Button variant="outline" className="w-full">{t("email")}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function ParentPortal() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">بوابة الأهالي</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">أطفالك المسجلون</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold">أحمد علي</h3>
                <p className="text-sm text-gray-500">الصف: الرابع الابتدائي</p>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold">فاطمة علي</h3>
                <p className="text-sm text-gray-500">الصف: الثاني الإعدادي</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إشعارات جديدة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-3 py-2">
                <p className="font-semibold text-sm">غياب الطالب</p>
                <p className="text-xs text-gray-500">1 ساعة مضت</p>
              </div>
              <div className="border-l-4 border-green-500 pl-3 py-2">
                <p className="font-semibold text-sm">درجات جديدة</p>
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
            الاتصال بالمدرسة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button className="w-full">التواصل مع المعلم</Button>
            <Button variant="outline" className="w-full">التواصل مع الإدارة</Button>
            <Button variant="outline" className="w-full">البريد الإلكتروني</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

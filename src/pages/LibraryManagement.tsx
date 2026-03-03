import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function LibraryManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">إدارة المكتبة</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة كتاب
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الكتب</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,420</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">الكتب المستعارة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">347</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">الكتب المفقودة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">الفئات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة الكتب</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">تعلم الرياضيات</h3>
                  <p className="text-sm text-gray-500">المؤلف: أحمد محمد</p>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mt-2 inline-block">متاح</span>
                </div>
                <span>نسخة: 5</span>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">اللغة العربية</h3>
                  <p className="text-sm text-gray-500">المؤلف: فاطمة علي</p>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mt-2 inline-block">مستعار</span>
                </div>
                <span>نسخة: 3</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

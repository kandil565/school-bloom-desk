import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Archive } from "lucide-react";

export default function DigitalArchive() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">الأرشيف الرقمي</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          رفع وثيقة
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الوثائق</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,562</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">الملفات الطلابية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المستخدمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245 GB</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المتاحة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">755 GB</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            الملفات الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">ملف الطالب - أحمد علي</h3>
                <p className="text-sm text-gray-500">الشهادات والوثائق</p>
                <p className="text-xs text-gray-400">تم رفعه قبل يومين</p>
              </div>
              <Button variant="outline" size="sm">تحميل</Button>
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">تقرير الفصل الأول</h3>
                <p className="text-sm text-gray-500">أداء الطلاب</p>
                <p className="text-xs text-gray-400">تم رفعه قبل أسبوع</p>
              </div>
              <Button variant="outline" size="sm">تحميل</Button>
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">سجل الحضور الدوري</h3>
                <p className="text-sm text-gray-500">الحضور والغياب</p>
                <p className="text-xs text-gray-400">تم رفعه قبل أسبوع</p>
              </div>
              <Button variant="outline" size="sm">تحميل</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

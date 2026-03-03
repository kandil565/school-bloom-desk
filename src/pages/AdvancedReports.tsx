import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export default function AdvancedReports() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">التقارير المتقدمة</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">التقارير المُنشأة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">التقارير المجدولة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">التقارير المُصدَّرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            تقارير متاحة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">تقرير الحضور الشامل</h3>
                <p className="text-sm text-gray-500">تقرير شامل لحضور الطلاب والموظفين</p>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                تنزيل
              </Button>
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">تقرير الأداء الأكاديمي</h3>
                <p className="text-sm text-gray-500">تحليل الدرجات والمستويات الأكاديمية</p>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                تنزيل
              </Button>
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">تقرير الموارد المالية</h3>
                <p className="text-sm text-gray-500">تقرير التكاليف والإيرادات</p>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                تنزيل
              </Button>
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">تقرير إدارة الموارد البشرية</h3>
                <p className="text-sm text-gray-500">كشف الرواتب والعاملين</p>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                تنزيل
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

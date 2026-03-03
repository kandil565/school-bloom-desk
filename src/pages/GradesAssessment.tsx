import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function GradesAssessment() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">الدرجات والتقييم</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة درجات
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">الطلاب المقركين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">الاختبارات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المتوسط العام</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82.5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المتأخرون</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>كشوفات الدرجات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">الفترة الأولى</h3>
                <p className="text-sm text-gray-500">من 1 سبتمبر - 30 نوفمبر</p>
              </div>
              <Button variant="outline">عرض</Button>
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">الفترة الثانية</h3>
                <p className="text-sm text-gray-500">من 1 ديسمبر - 28 فبراير</p>
              </div>
              <Button variant="outline">عرض</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CurriculumManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">إدارة المنهج الدراسي</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة مقرر
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المقررات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">الفصول</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المعلمون</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الجدول الزمني للدروس</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">الفترة الصباحية</h3>
              <p className="text-sm text-gray-500">8:00 صباحاً - 12:00 ظهراً</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">الفترة المسائية</h3>
              <p className="text-sm text-gray-500">2:00 ظهراً - 5:00 مساءً</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

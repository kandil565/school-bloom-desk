import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from "lucide-react";

export default function ComplaintsSuggestions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">الشكاوى والمقترحات</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة شكوى/مقترح
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">الشكاوى المعلقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المحلولة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المقترحات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">معدل الرضا</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            الشكاوى الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">مشكلة مع الحافلة رقم 5</h3>
                  <p className="text-sm text-gray-600">تأخر متكرر في الوصول</p>
                  <p className="text-xs text-gray-400 mt-1">مقدمة من: أم علي</p>
                </div>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">عاجلة</span>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">اقتراح لتحسين المقصف</h3>
                  <p className="text-sm text-gray-600">إضافة وجبات صحية متنوعة</p>
                  <p className="text-xs text-gray-400 mt-1">مقدمة من: والد أحمد</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">قيد الدراسة</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, PieChart, TrendingUp } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">لوحة التحكم الذكية</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              أداء الطلاب
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82.5%</div>
            <p className="text-xs text-green-500">↑ 5.2% من الشهر الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">معدل الحضور</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.8%</div>
            <p className="text-xs text-green-500">↑ 2.1% من الشهر الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">رضا الأهالي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.3%</div>
            <p className="text-xs text-green-500">↑ 3.4% من العام الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">النمو الإجمالي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-blue-500">مقارنة بالعام السابق</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              اتجاه الأداء الأكاديمي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">الفترة الأولى</span>
                  <span className="text-sm font-semibold">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">الفترة الثانية</span>
                  <span className="text-sm font-semibold">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">الفترة الثالثة</span>
                  <span className="text-sm font-semibold">89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "89%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              توزيع الطلاب
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>المرحلة الابتدائية</span>
                  <span className="font-semibold">450</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>المرحلة الإعدادية</span>
                  <span className="font-semibold">380</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>المرحلة الثانوية</span>
                  <span className="font-semibold">420</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            مؤشرات الأداء الرئيسية (KPIs)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center border rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600">1,250</div>
              <p className="text-sm text-gray-600 mt-2">إجمالي الطلاب</p>
            </div>
            <div className="text-center border rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600">85</div>
              <p className="text-sm text-gray-600 mt-2">الموظفون</p>
            </div>
            <div className="text-center border rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-600">4.5/5</div>
              <p className="text-sm text-gray-600 mt-2">متوسط التقييم</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

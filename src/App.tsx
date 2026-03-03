import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardHome from "@/pages/DashboardHome";
import LoginPage from "@/pages/LoginPage";
import { LanguageProvider } from "@/contexts/LanguageContext";
import StaffAttendance from "@/pages/StaffAttendance";
import HRManagement from "@/pages/HRManagement";
import Payroll from "@/pages/Payroll";
import Canteen from "@/pages/Canteen";
import Inventory from "@/pages/Inventory";
import Suppliers from "@/pages/Suppliers";
import Workshops from "@/pages/Workshops";
import AssetsCustody from "@/pages/AssetsCustody";
import Reports from "@/pages/Reports";
import StudentManagement from "@/pages/StudentManagement";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import SignOutPage from "@/pages/SignOutPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/hr" element={<HRManagement />} />
              <Route path="/students" element={<StudentManagement />} />
              <Route path="/attendance" element={<StaffAttendance />} />
              <Route path="/hr" element={<HRManagement />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/canteen" element={<Canteen />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/assets" element={<AssetsCustody />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/signout" element={<SignOutPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

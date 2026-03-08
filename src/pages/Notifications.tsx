import { Bell, Search, Plus, Download } from "lucide-react";
import { PageHeader, DataTable, SummaryCard } from "@/components/PageShared";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-config";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { exportToCSV } from "@/lib/exportUtils";

const columns = [
  { key: "title", label: "Title" },
  { key: "message", label: "Message" },
  { key: "type", label: "Type" },
  { key: "isReadStr", label: "Status" },
  { key: "dateStr", label: "Date" },
];

export default function Notifications() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    message: "",
    type: "Info",
    isRead: false,
  });

  const { data: notificationsRes, isLoading: loadingNotifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/notifications"),
  });

  const notificationsData = (notificationsRes?.data || []).map((notif: any) => {
    return {
      ...notif,
      isReadStr: notif.isRead ? "Read" : "Unread",
      dateStr: notif.createdAt ? new Date(notif.createdAt).toLocaleString() : "-",
    };
  });

  const filteredData = notificationsData.filter((notif: any) => {
    const matchesSearch = 
      notif.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? notif.type === filterType : true;
    return matchesSearch && matchesType;
  });

  const addNotificationMutation = useMutation({
    mutationFn: (newRecord: any) => apiRequest("/notifications", { method: "POST", body: JSON.stringify(newRecord) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      setIsAddModalOpen(false);
      setFormData({ 
          userId: "", title: "", message: "", type: "Info", isRead: false
      });
      toast({ title: t("success") || "Success", description: "Notification sent successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to send notification.", variant: "destructive" });
    }
  });

  const handleExport = () => {
    exportToCSV(filteredData, "Notifications_Report");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  const totalNotifs = notificationsData.length;
  const readNotifs = notificationsData.filter(n => n.isRead).length;
  const unreadNotifs = notificationsData.filter(n => !n.isRead).length;
  const openRate = totalNotifs > 0 ? Math.round((readNotifs / totalNotifs) * 100) : 0;

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={Bell} title="notificationsSystem" description="recentActivity" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="totalItems" value={totalNotifs.toString()} color="bg-primary text-primary" />
        <SummaryCard label="viewAll" value={readNotifs.toString()} color="bg-success text-success" />
        <SummaryCard label="Pending" value={unreadNotifs.toString()} color="bg-accent text-accent" />
        <SummaryCard label="Action" value={`${openRate}%`} color="bg-purple-500 text-purple-500" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("search") || "Search notifications..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 ps-10 pe-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Info">Info</option>
            <option value="Warning">Warning</option>
            <option value="Success">Success</option>
            <option value="Error">Error</option>
          </select>

          <button onClick={handleExport} className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t("exportData")}</span>
          </button>
          
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    <Plus className="w-4 h-4" />
                    <span>{t("sendMessage")}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Send Notification</DialogTitle>
                </DialogHeader>
                <form 
                  onSubmit={(e) => { 
                      e.preventDefault(); 
                      addNotificationMutation.mutate(formData); 
                  }} 
                  className="space-y-4 pt-4"
                >
                    <div className="space-y-2">
                        <Label>User ID (MongoDB ObjectId)</Label>
                        <Input required placeholder="e.g. 60d21b4667d0d8992e610c85" value={formData.userId} onChange={e => setFormData({...formData, userId: e.target.value})} />
                        <p className="text-xs text-muted-foreground">User ID to target this notification.</p>
                    </div>

                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Message</Label>
                        <textarea 
                            required 
                            rows={3}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.message} 
                            onChange={e => setFormData({...formData, message: e.target.value})} 
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Type</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                            <option value="Info">Info</option>
                            <option value="Warning">Warning</option>
                            <option value="Success">Success</option>
                            <option value="Error">Error</option>
                        </select>
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={addNotificationMutation.isPending}>
                        {addNotificationMutation.isPending ? "Sending..." : "Send Notification"}
                    </Button>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="mb-8 overflow-hidden">
        {loadingNotifications ? (
            <div className="flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : (
            <DataTable columns={columns} data={filteredData} />
        )}
      </section>
    </div>
  );
}

import { Calendar, Search, Filter, Plus, Download } from "lucide-react";
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
  { key: "eventName", label: "Title" },
  { key: "eventType", label: "Category" },
  { key: "startDateStr", label: "Start Date" },
  { key: "location", label: "Location" },
  { key: "status", label: "status" },
];

export default function EventsActivities() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    description: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    location: "",
    organizer: "",
    budget: 0,
    status: "Planned",
  });

  const { data: eventsRes, isLoading: loadingEvents } = useQuery({
    queryKey: ["events"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/events"),
  });

  const eventsData = (eventsRes?.data || []).map((ev: any) => {
    return {
      ...ev,
      startDateStr: ev.startDate ? new Date(ev.startDate).toLocaleDateString() : "-",
      status: ev.status || "Planned"
    };
  });

  const types = Array.from(new Set(eventsData.map((e: any) => e.eventType).filter(Boolean)));

  const filteredData = eventsData.filter((ev: any) => {
    const matchesSearch = 
      ev.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? ev.eventType === filterType : true;
    return matchesSearch && matchesType;
  });

  const addEventMutation = useMutation({
    mutationFn: (newRecord: any) => {
        return apiRequest("/events", { 
            method: "POST", 
            body: JSON.stringify({
                ...newRecord,
                endDate: newRecord.endDate || undefined
            }) 
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setIsAddModalOpen(false);
      setFormData({ 
          eventName: "", eventType: "", description: "", 
          startDate: new Date().toISOString().split('T')[0], endDate: "", 
          location: "", organizer: "", budget: 0, status: "Planned" 
      });
      toast({ title: t("success") || "Success", description: "Event added successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to add event.", variant: "destructive" });
    }
  });

  const handleExport = () => {
    exportToCSV(filteredData, "Events_Report");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  const totalEvents = eventsData.length;
  const upcomingEvents = eventsData.filter(e => e.status === 'Planned').length;
  const completedEvents = eventsData.filter(e => e.status === 'Completed').length;
  let totalParticipants = 0;
  eventsData.forEach((e:any) => totalParticipants += (e.participants?.length || 0));

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={Calendar} title="events" description="upcoming" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="upcoming" value={upcomingEvents.toString()} color="bg-primary text-primary" />
        <SummaryCard label="Completed" value={completedEvents.toString()} color="bg-success text-success" />
        <SummaryCard label="participants" value={totalParticipants.toString()} color="bg-accent text-accent" />
        <SummaryCard label="totalItems" value={totalEvents.toString()} color="bg-purple-500 text-purple-500" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("search") || "Search events..."}
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
            <option value="">{t("allCategories") || "All Event Types"}</option>
            {types.map((type: any) => (
                <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <button onClick={handleExport} className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t("exportData")}</span>
          </button>
          
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    <Plus className="w-4 h-4" />
                    <span>{t("addItem")}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); addEventMutation.mutate(formData); }} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label>Event Name</Label>
                        <Input required value={formData.eventName} onChange={e => setFormData({...formData, eventName: e.target.value})} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Event Type (Category)</Label>
                            <Input required value={formData.eventType} onChange={e => setFormData({...formData, eventType: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                <option value="Planned">Planned</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input type="date" required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>End Date (Optional)</Label>
                            <Input type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Budget</Label>
                            <Input type="number" min="0" value={formData.budget} onChange={e => setFormData({...formData, budget: Number(e.target.value)})} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Organizer</Label>
                        <Input value={formData.organizer} onChange={e => setFormData({...formData, organizer: e.target.value})} />
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={addEventMutation.isPending}>
                        {addEventMutation.isPending ? "Saving..." : "Save Event"}
                    </Button>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="mb-8 overflow-hidden">
        {loadingEvents ? (
            <div className="flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : (
            <DataTable columns={columns} data={filteredData} />
        )}
      </section>
    </div>
  );
}

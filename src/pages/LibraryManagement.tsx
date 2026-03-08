import { BookOpen, Search, Filter, Plus, Download } from "lucide-react";
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
  { key: "bookId", label: "Book ID" },
  { key: "title", label: "Title" },
  { key: "author", label: "Author" },
  { key: "category", label: "Category" },
  { key: "statusStr", label: "Availability" },
];

export default function LibraryManagement() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    bookId: "",
    title: "",
    author: "",
    isbn: "",
    category: "",
    quantity: 1,
    availableQuantity: 1,
    publisher: "",
    publicationYear: new Date().getFullYear(),
  });

  const { data: libraryRes, isLoading: loadingLibrary } = useQuery({
    queryKey: ["library"],
    queryFn: () => apiRequest<{ success: boolean; data: any[] }>("/library"),
  });

  const libraryData = (libraryRes?.data || []).map((book: any) => {
    return {
      ...book,
      statusStr: `${book.availableQuantity || 0} / ${book.quantity || 0} Available`,
    };
  });

  const categories = Array.from(new Set(libraryData.map((b: any) => b.category).filter(Boolean)));

  const filteredData = libraryData.filter((book: any) => {
    const matchesSearch = 
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? book.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const addBookMutation = useMutation({
    mutationFn: (newRecord: any) => apiRequest("/library", { method: "POST", body: JSON.stringify(newRecord) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library"] });
      setIsAddModalOpen(false);
      setFormData({ bookId: "", title: "", author: "", isbn: "", category: "", quantity: 1, availableQuantity: 1, publisher: "", publicationYear: new Date().getFullYear() });
      toast({ title: t("success") || "Success", description: "Book added successfully." });
    },
    onError: (error: any) => {
      toast({ title: t("error") || "Error", description: error.message || "Failed to add book.", variant: "destructive" });
    }
  });

  const handleAddBook = (e: React.FormEvent) => {
      e.preventDefault();
      addBookMutation.mutate({
          ...formData,
          bookId: formData.bookId || `BK-${Math.floor(Math.random() * 10000)}`
      });
  };

  const handleExport = () => {
    exportToCSV(filteredData, "Library_Report");
    toast({ title: "Export Successful", description: "Data exported to CSV" });
  };

  let totalItems = 0;
  let totalAvailable = 0;
  libraryData.forEach((book:any) => {
      totalItems += (book.quantity || 0);
      totalAvailable += (book.availableQuantity || 0);
  });

  return (
    <div className="space-y-6 pb-10">
      <PageHeader icon={BookOpen} title="library" description="libraryDescription" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard label="totalItems" value={totalItems.toString()} color="bg-primary text-primary" />
        <SummaryCard label="available" value={totalAvailable.toString()} color="bg-success text-success" />
        <SummaryCard label="borrowing" value={(totalItems - totalAvailable).toString()} color="bg-accent text-accent" />
        <SummaryCard label="allCategories" value={categories.length.toString()} color="bg-purple-500 text-purple-500" />
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("search") || "Search books..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 ps-10 pe-4 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none h-11 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">{t("allCategories") || "All Categories"}</option>
            {categories.map((cat: any) => (
                <option key={cat} value={cat}>{cat}</option>
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
                    <DialogTitle>Add New Book</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddBook} className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Book Title</Label>
                            <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Book ID</Label>
                            <Input placeholder="Auto generated if empty" value={formData.bookId} onChange={e => setFormData({...formData, bookId: e.target.value})} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Author</Label>
                            <Input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Quantity</Label>
                            <Input type="number" required min="1" value={formData.quantity} onChange={e => setFormData({...formData, quantity: Number(e.target.value), availableQuantity: Number(e.target.value)})} />
                        </div>
                        <div className="space-y-2">
                            <Label>ISBN (Optional)</Label>
                            <Input value={formData.isbn} onChange={e => setFormData({...formData, isbn: e.target.value})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Publisher (Optional)</Label>
                            <Input value={formData.publisher} onChange={e => setFormData({...formData, publisher: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label>Publication Year (Optional)</Label>
                            <Input type="number" value={formData.publicationYear} onChange={e => setFormData({...formData, publicationYear: Number(e.target.value)})} />
                        </div>
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={addBookMutation.isPending}>
                        {addBookMutation.isPending ? "Adding..." : "Add Book"}
                    </Button>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="mb-8 overflow-hidden">
        {loadingLibrary ? (
            <div className="flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
        ) : (
            <DataTable columns={columns} data={filteredData} />
        )}
      </section>
    </div>
  );
}

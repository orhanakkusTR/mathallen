import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Tag,
  Package,
  Mail,
  Calendar,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO_URL = "https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/3458r0m2_logo-mat.png";

const categories = [
  "Färska frukter & grönsaker",
  "Dagligvaror",
  "Kött & chark",
  "Mejeri",
  "Specialprodukter",
];

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

export default function AdminDashboard() {
  const [offers, setOffers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  const currentWeek = getWeekNumber(new Date());
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    product_name: "",
    original_price: "",
    offer_price: "",
    unit: "st",
    image_url: "",
    category: categories[0],
    week_number: currentWeek,
    year: currentYear,
    is_active: true,
  });

  const token = localStorage.getItem("mathallen_admin_token");

  const axiosAuth = axios.create({
    baseURL: API,
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const [offersRes, messagesRes] = await Promise.all([
        axiosAuth.get("/offers?active_only=false"),
        axiosAuth.get("/contact/messages"),
      ]);
      setOffers(offersRes.data);
      setMessages(messagesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("mathallen_admin_token");
        navigate("/admin");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mathallen_admin_token");
    navigate("/admin");
  };

  const openCreateDialog = () => {
    setEditingOffer(null);
    setFormData({
      product_name: "",
      original_price: "",
      offer_price: "",
      unit: "st",
      image_url: "",
      category: categories[0],
      week_number: currentWeek,
      year: currentYear,
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (offer) => {
    setEditingOffer(offer);
    setFormData({
      product_name: offer.product_name,
      original_price: offer.original_price?.toString() || "",
      offer_price: offer.offer_price.toString(),
      unit: offer.unit,
      image_url: offer.image_url || "",
      category: offer.category,
      week_number: offer.week_number,
      year: offer.year,
      is_active: offer.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      offer_price: parseFloat(formData.offer_price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
    };

    try {
      if (editingOffer) {
        await axiosAuth.put(`/offers/${editingOffer.id}`, data);
        toast.success("Erbjudandet har uppdaterats!");
      } else {
        await axiosAuth.post("/offers", data);
        toast.success("Nytt erbjudande har skapats!");
      }
      setIsDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error saving offer:", error);
      toast.error("Något gick fel. Försök igen.");
    }
  };

  const handleDelete = async (offerId) => {
    try {
      await axiosAuth.delete(`/offers/${offerId}`);
      toast.success("Erbjudandet har tagits bort!");
      setDeleteConfirm(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting offer:", error);
      toast.error("Kunde inte ta bort erbjudandet.");
    }
  };

  const toggleOfferActive = async (offer) => {
    try {
      await axiosAuth.put(`/offers/${offer.id}`, { is_active: !offer.is_active });
      toast.success(offer.is_active ? "Erbjudandet har inaktiverats" : "Erbjudandet är nu aktivt");
      fetchData();
    } catch (error) {
      console.error("Error toggling offer:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-red-600 text-white py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={LOGO_URL} 
              alt="Mathallen Malmö" 
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-red-100 hover:text-white text-sm transition-colors"
              data-testid="view-site-link"
            >
              Visa webbplatsen →
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-100 hover:text-white hover:bg-red-700"
              data-testid="logout-button"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logga ut
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm" data-testid="stat-active-offers">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <Tag className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">
                  {offers.filter((o) => o.is_active).length}
                </p>
                <p className="text-stone-500 text-sm">Aktiva erbjudanden</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm" data-testid="stat-total-offers">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">{offers.length}</p>
                <p className="text-stone-500 text-sm">Totalt erbjudanden</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm" data-testid="stat-messages">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">{messages.length}</p>
                <p className="text-stone-500 text-sm">Meddelanden</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm" data-testid="stat-week">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">v.{currentWeek}</p>
                <p className="text-stone-500 text-sm">Nuvarande vecka</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="offers" className="space-y-6">
          <TabsList className="bg-white shadow-sm" data-testid="admin-tabs">
            <TabsTrigger value="offers">Erbjudanden</TabsTrigger>
            <TabsTrigger value="messages">Meddelanden</TabsTrigger>
          </TabsList>

          {/* Offers Tab */}
          <TabsContent value="offers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-stone-900">Alla erbjudanden</h2>
              <Button
                onClick={openCreateDialog}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
                data-testid="create-offer-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nytt erbjudande
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full admin-table" data-testid="offers-table">
                <thead>
                  <tr className="border-b border-stone-100">
                    <th className="text-left py-4 px-6 text-stone-600">Produkt</th>
                    <th className="text-left py-4 px-6 text-stone-600 hidden md:table-cell">Kategori</th>
                    <th className="text-left py-4 px-6 text-stone-600">Pris</th>
                    <th className="text-left py-4 px-6 text-stone-600 hidden sm:table-cell">Vecka</th>
                    <th className="text-left py-4 px-6 text-stone-600">Status</th>
                    <th className="text-right py-4 px-6 text-stone-600">Åtgärder</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((offer) => (
                    <tr key={offer.id} className="border-b border-stone-50 last:border-0" data-testid={`offer-row-${offer.id}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {offer.image_url ? (
                            <img
                              src={offer.image_url}
                              alt={offer.product_name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                              <Package className="w-5 h-5 text-stone-400" />
                            </div>
                          )}
                          <span className="font-medium text-stone-900">{offer.product_name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-stone-600 hidden md:table-cell">{offer.category}</td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-red-600">{offer.offer_price}:-</span>
                        {offer.original_price && (
                          <span className="text-stone-400 text-sm ml-1 line-through">
                            {offer.original_price}:-
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-stone-600 hidden sm:table-cell">v.{offer.week_number}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleOfferActive(offer)}
                          className="flex items-center gap-2"
                          data-testid={`toggle-offer-${offer.id}`}
                        >
                          {offer.is_active ? (
                            <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
                              <Eye className="w-3 h-3" /> Aktiv
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-stone-500 bg-stone-100 px-2 py-1 rounded-full text-xs font-medium">
                              <EyeOff className="w-3 h-3" /> Inaktiv
                            </span>
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(offer)}
                            className="hover:bg-stone-100"
                            data-testid={`edit-offer-${offer.id}`}
                          >
                            <Edit2 className="w-4 h-4 text-stone-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteConfirm(offer.id)}
                            className="hover:bg-red-50"
                            data-testid={`delete-offer-${offer.id}`}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {offers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-stone-500">
                        Inga erbjudanden ännu. Skapa ditt första!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4">
            <h2 className="text-xl font-semibold text-stone-900">Meddelanden från kunder</h2>
            <div className="space-y-4" data-testid="messages-list">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white rounded-xl p-6 shadow-sm"
                  data-testid={`message-${msg.id}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-stone-900">{msg.name}</h3>
                      <p className="text-stone-500 text-sm">{msg.email}</p>
                      {msg.phone && <p className="text-stone-500 text-sm">{msg.phone}</p>}
                    </div>
                    <span className="text-stone-400 text-xs">
                      {new Date(msg.created_at).toLocaleDateString("sv-SE")}
                    </span>
                  </div>
                  <p className="text-stone-700 bg-stone-50 rounded-lg p-4">{msg.message}</p>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="bg-white rounded-xl p-12 text-center text-stone-500">
                  Inga meddelanden ännu.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg" data-testid="offer-dialog">
          <DialogHeader>
            <DialogTitle>
              {editingOffer ? "Redigera erbjudande" : "Nytt erbjudande"}
            </DialogTitle>
            <DialogDescription>
              Fyll i informationen nedan för att {editingOffer ? "uppdatera" : "skapa"} erbjudandet.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product_name">Produktnamn *</Label>
              <Input
                id="product_name"
                value={formData.product_name}
                onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                required
                placeholder="T.ex. Färsk lax"
                data-testid="offer-product-name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="offer_price">Erbjudandepris (kr) *</Label>
                <Input
                  id="offer_price"
                  type="number"
                  step="0.01"
                  value={formData.offer_price}
                  onChange={(e) => setFormData({ ...formData, offer_price: e.target.value })}
                  required
                  placeholder="99"
                  data-testid="offer-price"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="original_price">Ordinarie pris (kr)</Label>
                <Input
                  id="original_price"
                  type="number"
                  step="0.01"
                  value={formData.original_price}
                  onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                  placeholder="149"
                  data-testid="offer-original-price"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unit">Enhet</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) => setFormData({ ...formData, unit: value })}
                >
                  <SelectTrigger data-testid="offer-unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="st">st</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="l">l</SelectItem>
                    <SelectItem value="förp">förp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger data-testid="offer-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="week_number">Vecka</Label>
                <Input
                  id="week_number"
                  type="number"
                  min="1"
                  max="53"
                  value={formData.week_number}
                  onChange={(e) => setFormData({ ...formData, week_number: parseInt(e.target.value) })}
                  data-testid="offer-week"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">År</Label>
                <Input
                  id="year"
                  type="number"
                  min="2024"
                  max="2030"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  data-testid="offer-year"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Bild-URL</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
                data-testid="offer-image-url"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_active" className="cursor-pointer">Aktivt erbjudande</Label>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                data-testid="offer-is-active"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Avbryt
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700" data-testid="save-offer-button">
                <Save className="w-4 h-4 mr-2" />
                {editingOffer ? "Spara ändringar" : "Skapa erbjudande"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent data-testid="delete-confirm-dialog">
          <DialogHeader>
            <DialogTitle>Ta bort erbjudande?</DialogTitle>
            <DialogDescription>
              Är du säker på att du vill ta bort detta erbjudande? Denna åtgärd kan inte ångras.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Avbryt
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(deleteConfirm)}
              data-testid="confirm-delete-button"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Ta bort
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

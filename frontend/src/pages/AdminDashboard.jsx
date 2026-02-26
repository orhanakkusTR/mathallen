import { useState, useEffect, useRef } from "react";
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
  Users,
  Image,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Upload,
  Loader2,
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
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const LOGO_URL = "https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/3458r0m2_logo-mat.png";

// Convert image URLs - handles both uploaded files and external URLs
function getImageUrl(url) {
  if (!url) return null;
  
  // If it starts with /uploads or /api/uploads, prepend the base URL
  if (url.startsWith('/uploads')) {
    return `${BASE_URL}/api${url}`;
  }
  if (url.startsWith('/api/uploads')) {
    return `${BASE_URL}${url}`;
  }
  
  // Already a direct link or other URL
  return url;
}

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
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
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
    sort_order: 0,
  });

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

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
      const [offersRes, messagesRes, subscribersRes] = await Promise.all([
        axiosAuth.get("/offers?active_only=false"),
        axiosAuth.get("/contact/messages"),
        axiosAuth.get("/newsletter/subscribers"),
      ]);
      // Sort offers by sort_order
      const sortedOffers = offersRes.data.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
      setOffers(sortedOffers);
      setMessages(messagesRes.data);
      setSubscribers(subscribersRes.data);
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
    setImagePreview("");
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
      sort_order: offers.length,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (offer) => {
    setEditingOffer(offer);
    setImagePreview(getImageUrl(offer.image_url) || "");
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
      sort_order: offer.sort_order || 0,
    });
    setIsDialogOpen(true);
  };

  const handleImageUrlChange = (url) => {
    setFormData({ ...formData, image_url: url });
    setImagePreview(getImageUrl(url));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Filen är för stor. Max 5MB tillåtet.");
      return;
    }

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      const response = await axios.post(`${API}/upload`, uploadFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.url;
      setFormData({ ...formData, image_url: imageUrl });
      setImagePreview(imageUrl);
      toast.success("Bilden har laddats upp!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Kunde inte ladda upp bilden");
    } finally {
      setUploading(false);
    }
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

  const moveOffer = async (index, direction) => {
    const newOffers = [...offers];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newOffers.length) return;
    
    // Swap positions
    [newOffers[index], newOffers[targetIndex]] = [newOffers[targetIndex], newOffers[index]];
    
    // Update sort_order for both
    try {
      await Promise.all([
        axiosAuth.put(`/offers/${newOffers[index].id}`, { sort_order: index }),
        axiosAuth.put(`/offers/${newOffers[targetIndex].id}`, { sort_order: targetIndex }),
      ]);
      setOffers(newOffers);
      toast.success("Ordningen har uppdaterats!");
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Kunde inte uppdatera ordningen.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-stone-900 text-white py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={LOGO_URL} 
              alt="Mathallen Malmö" 
              className="h-10 w-auto"
            />
            <span className="text-stone-400 text-sm hidden sm:inline">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-stone-400 hover:text-white text-sm transition-colors flex items-center gap-1"
              data-testid="view-site-link"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Visa webbplatsen</span>
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-stone-400 hover:text-white hover:bg-stone-800"
              data-testid="logout-button"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Logga ut</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm" data-testid="stat-active-offers">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <Tag className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">
                  {offers.filter((o) => o.is_active && o.week_number === currentWeek && o.year === currentYear).length}
                </p>
                <p className="text-stone-500 text-sm">Aktiva denna vecka</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm" data-testid="stat-subscribers">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">{subscribers.length}</p>
                <p className="text-stone-500 text-sm">Prenumeranter</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm" data-testid="stat-messages">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">{messages.length}</p>
                <p className="text-stone-500 text-sm">Meddelanden</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm" data-testid="stat-week">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">v.{currentWeek}</p>
                <p className="text-stone-500 text-sm">{currentYear}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="offers" className="space-y-6">
          <TabsList className="bg-white shadow-sm p-1 h-auto flex-wrap" data-testid="admin-tabs">
            <TabsTrigger value="offers" className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg px-4 py-2">
              <Tag className="w-4 h-4 mr-2" />
              Erbjudanden
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Prenumeranter
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg px-4 py-2">
              <Mail className="w-4 h-4 mr-2" />
              Meddelanden
            </TabsTrigger>
          </TabsList>

          {/* Offers Tab */}
          <TabsContent value="offers" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-stone-900">Erbjudanden</h2>
                <p className="text-stone-500 text-sm">Hantera och sortera veckans erbjudanden</p>
              </div>
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
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="offers-table">
                  <thead>
                    <tr className="border-b border-stone-100 bg-stone-50">
                      <th className="text-left py-3 px-4 text-stone-600 text-sm font-medium w-20">Ordning</th>
                      <th className="text-left py-3 px-4 text-stone-600 text-sm font-medium">Produkt</th>
                      <th className="text-left py-3 px-4 text-stone-600 text-sm font-medium hidden md:table-cell">Kategori</th>
                      <th className="text-left py-3 px-4 text-stone-600 text-sm font-medium">Pris</th>
                      <th className="text-left py-3 px-4 text-stone-600 text-sm font-medium hidden sm:table-cell">Vecka</th>
                      <th className="text-left py-3 px-4 text-stone-600 text-sm font-medium">Status</th>
                      <th className="text-right py-3 px-4 text-stone-600 text-sm font-medium">Åtgärder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map((offer, index) => (
                      <tr key={offer.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50" data-testid={`offer-row-${offer.id}`}>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => moveOffer(index, 'up')}
                              disabled={index === 0}
                            >
                              <ChevronUp className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => moveOffer(index, 'down')}
                              disabled={index === offers.length - 1}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {offer.image_url ? (
                              <img
                                src={getImageUrl(offer.image_url)}
                                alt={offer.product_name}
                                className="w-12 h-12 rounded-lg object-cover border border-stone-100"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center border border-stone-200">
                                <Image className="w-5 h-5 text-stone-400" />
                              </div>
                            )}
                            <span className="font-medium text-stone-900">{offer.product_name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-stone-600 text-sm hidden md:table-cell">{offer.category}</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-red-600">{offer.offer_price}:-</span>
                          {offer.original_price && (
                            <span className="text-stone-400 text-sm ml-1 line-through">
                              {offer.original_price}:-
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 hidden sm:table-cell">
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            offer.week_number === currentWeek && offer.year === currentYear
                              ? 'bg-green-100 text-green-700'
                              : 'bg-stone-100 text-stone-600'
                          }`}>
                            v.{offer.week_number}
                          </span>
                        </td>
                        <td className="py-3 px-4">
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
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(offer)}
                              className="hover:bg-stone-100 h-8 w-8"
                              data-testid={`edit-offer-${offer.id}`}
                            >
                              <Edit2 className="w-4 h-4 text-stone-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteConfirm(offer.id)}
                              className="hover:bg-red-50 h-8 w-8"
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
                        <td colSpan="7" className="py-12 text-center text-stone-500">
                          <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                          <p>Inga erbjudanden ännu.</p>
                          <p className="text-sm">Klicka på "Nytt erbjudande" för att skapa ditt första!</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers" className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-stone-900">Prenumeranter</h2>
              <p className="text-stone-500 text-sm">E-postadresser som prenumererar på nyhetsbrevet</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {subscribers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full" data-testid="subscribers-table">
                    <thead>
                      <tr className="border-b border-stone-100 bg-stone-50">
                        <th className="text-left py-3 px-6 text-stone-600 text-sm font-medium">#</th>
                        <th className="text-left py-3 px-6 text-stone-600 text-sm font-medium">E-postadress</th>
                        <th className="text-left py-3 px-6 text-stone-600 text-sm font-medium">Prenumererat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((sub, index) => (
                        <tr key={sub.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50">
                          <td className="py-3 px-6 text-stone-500">{index + 1}</td>
                          <td className="py-3 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <Mail className="w-4 h-4 text-green-600" />
                              </div>
                              <span className="font-medium text-stone-900">{sub.email}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-stone-500 text-sm">
                            {new Date(sub.subscribed_at).toLocaleDateString("sv-SE", {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-stone-500">
                  <Users className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                  <p>Inga prenumeranter ännu.</p>
                  <p className="text-sm">När besökare prenumererar på nyhetsbrevet visas de här.</p>
                </div>
              )}
            </div>

            {subscribers.length > 0 && (
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    const emails = subscribers.map(s => s.email).join('\n');
                    navigator.clipboard.writeText(emails);
                    toast.success("E-postadresser kopierade till urklipp!");
                  }}
                  className="rounded-xl"
                >
                  Kopiera alla e-postadresser
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-stone-900">Meddelanden</h2>
              <p className="text-stone-500 text-sm">Meddelanden från kontaktformuläret</p>
            </div>
            
            <div className="space-y-4" data-testid="messages-list">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-white rounded-xl p-6 shadow-sm"
                    data-testid={`message-${msg.id}`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
                      <div>
                        <h3 className="font-semibold text-stone-900">{msg.name}</h3>
                        <a href={`mailto:${msg.email}`} className="text-red-600 hover:text-red-700 text-sm">
                          {msg.email}
                        </a>
                        {msg.phone && (
                          <p className="text-stone-500 text-sm">
                            <a href={`tel:${msg.phone}`} className="hover:text-stone-700">{msg.phone}</a>
                          </p>
                        )}
                      </div>
                      <span className="text-stone-400 text-xs bg-stone-100 px-2 py-1 rounded-full">
                        {new Date(msg.created_at).toLocaleDateString("sv-SE", {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-stone-700 bg-stone-50 rounded-lg p-4 text-sm leading-relaxed">{msg.message}</p>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl p-12 text-center text-stone-500">
                  <Mail className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                  <p>Inga meddelanden ännu.</p>
                  <p className="text-sm">När kunder skickar meddelanden via kontaktformuläret visas de här.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" data-testid="offer-dialog">
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

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Produktbild</Label>
              <div className="flex gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex-1"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Laddar upp...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Ladda upp bild
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-stone-500">Max 5MB. Format: JPG, PNG, WebP, GIF</p>
            </div>

            {/* Image Preview */}
            <div className="space-y-2">
              <Label>Förhandsgranskning</Label>
              {imagePreview ? (
                <div className="relative bg-stone-50 rounded-xl overflow-hidden border-2 border-stone-200 p-4">
                  <img
                    src={imagePreview.startsWith('/') ? `${BASE_URL}${imagePreview.startsWith('/api') ? '' : '/api'}${imagePreview.startsWith('/api') ? imagePreview : imagePreview}` : imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-contain mx-auto"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-48 items-center justify-center flex-col text-stone-400">
                    <Image className="w-12 h-12 mb-2" />
                    <p className="text-sm">Kunde inte ladda bilden</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => {
                      setFormData({ ...formData, image_url: "" });
                      setImagePreview("");
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ) : (
                <div 
                  className="bg-stone-50 rounded-xl border-2 border-dashed border-stone-200 p-8 text-center cursor-pointer hover:bg-stone-100 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                  <p className="text-stone-500 text-sm font-medium">Klicka för att ladda upp en bild</p>
                  <p className="text-stone-400 text-xs mt-1">eller dra och släpp här</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between py-2 px-3 bg-stone-50 rounded-lg">
              <Label htmlFor="is_active" className="cursor-pointer">Aktivt erbjudande</Label>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                data-testid="offer-is-active"
              />
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Avbryt
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700" data-testid="save-offer-button">
                <Save className="w-4 h-4 mr-2" />
                {editingOffer ? "Spara" : "Skapa"}
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
          <DialogFooter className="gap-2">
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

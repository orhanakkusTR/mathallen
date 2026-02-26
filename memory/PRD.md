# Mathallen Malmö - Product Requirements Document

## Latest Update: 2026-02-26
- **Multi-Buy Badge Sistemi:** Admin panelinde "2 För", "3 För", "4 För" seçeneği, ürün kartlarında kırmızı yıldız badge
- **Kategori Filtreleme Sistemi:** Erbjudanden sayfasında üstte yatay filtre (masaüstü) ve dropdown (mobil)

## Original Problem Statement
Build a corporate website for Mathallen Malmö - a local supermarket (stormarknad) in Malmö, Sweden. The site should be warm, accessible, campaign-focused, and NOT e-commerce. Focus on promotion, campaigns, brand trust, and store information.

## User Personas
1. **Local Families** - Malmö residents doing weekly grocery shopping
2. **Price-conscious Shoppers** - Customers following weekly campaigns
3. **Store Administrators** - Staff managing weekly offers

## Core Requirements
- Swedish language throughout
- Red (#DC2626) color scheme
- Mobile-first, accessible design
- Admin panel for managing weekly campaigns
- Contact form with email notifications
- Google Maps integration
- No e-commerce (informational only)

## What's Been Implemented

### Backend (FastAPI + MongoDB)
- ✅ Admin authentication (JWT tokens)
- ✅ **Offers CRUD with MongoDB** (PERSISTENT - data survives restarts)
- ✅ Contact messages stored in MongoDB
- ✅ Newsletter subscriptions in MongoDB
- ✅ Chatbot leads capture in MongoDB
- ✅ Categories API with default data
- ✅ Protected admin routes

### Frontend (React + Tailwind + Shadcn/UI)
- ✅ Homepage with full-width hero video
- ✅ About page (Om oss) with split-layout hero and values section
- ✅ Weekly offers page (Veckans erbjudanden) with filtering
- ✅ Contact page with 2 store locations and Google Maps iframes
- ✅ Admin login page
- ✅ **Full Admin Dashboard** (offers management, subscribers, messages)
- ✅ Customer reviews section
- ✅ Newsletter signup form
- ✅ Cookie consent banner
- ✅ **Interactive Chatbot** (lead generation, store info)
- ✅ Payment method icons in footer (Visa, MC, Swish, Apple Pay)

### Recent Updates (2026-02-26)
- ✅ **Chatbot text made smaller and more compact**
- ✅ **Chatbot "Hitta oss" button now navigates to Contact page**
- ✅ **Verified MongoDB persistence** - all data survives server restarts

## Data Persistence Status
| Collection | Storage | Status |
|------------|---------|--------|
| offers | MongoDB | ✅ PERSISTENT |
| newsletter | MongoDB | ✅ PERSISTENT |
| contact_messages | MongoDB | ✅ PERSISTENT |
| leads | MongoDB | ✅ PERSISTENT |
| admins | MongoDB | ✅ PERSISTENT |

## Admin Credentials
- Username: `admin`
- Password: `mathallen2024`

## API Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/offers` - List all offers
- `GET /api/offers/current` - Current week offers
- `POST /api/offers` - Create offer (admin)
- `PUT /api/offers/{id}` - Update offer (admin)
- `DELETE /api/offers/{id}` - Delete offer (admin)
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter/subscribers` - List subscribers (admin)
- `POST /api/contact` - Submit contact form
- `GET /api/contact/messages` - List messages (admin)
- `POST /api/chat/lead` - Capture chatbot lead
- `GET /api/chat/leads` - List leads (admin)

## Prioritized Backlog

### P0 (Critical) - DONE
- [x] All core pages
- [x] Admin authentication
- [x] **Offer management with MongoDB persistence**
- [x] Admin Dashboard UI
- [x] Responsive design

### P1 (High Priority) - PENDING
- [ ] Configure Resend API key for email delivery
- [ ] Add real Google Maps review link

### P2 (Medium Priority) - FUTURE
- [ ] Hero video in .mp4 format (better browser support)
- [ ] Multi-week offer scheduling
- [ ] Enhanced Google Maps API integration

### P3 (Low Priority) - BACKLOG
- [ ] Recipe suggestions
- [ ] Loyalty program integration
- [ ] Offer analytics dashboard

## Known Considerations
- ⚠️ Hero video is .mov format (works but .mp4 would have better support)
- ⚠️ Email sending requires RESEND_API_KEY to be configured
- ⚠️ Google review link is placeholder (#)

## Tech Stack
- **Frontend:** React, Tailwind CSS, Shadcn/UI, Lucide React icons
- **Backend:** FastAPI, PyJWT, Motor (async MongoDB)
- **Database:** MongoDB (all collections persistent)
- **Deployment:** Preview environment on Emergent Platform

# Mathallen Malmö - Product Requirements Document

## Original Problem Statement
Build a corporate website for Mathallen Malmö - a local supermarket (stormarknad) in Malmö, Sweden. The site should be warm, accessible, campaign-focused, and NOT e-commerce. Focus on promotion, campaigns, brand trust, and store information.

## User Personas
1. **Local Families** - Malmö residents doing weekly grocery shopping
2. **Price-conscious Shoppers** - Customers following weekly campaigns
3. **Store Administrators** - Staff managing weekly offers

## Core Requirements
- Swedish language throughout
- ~~Warm orange/yellow~~ **Red (#DC2626)** color scheme (updated per user request)
- Mobile-first, accessible design
- Admin panel for managing weekly campaigns
- Contact form with email notifications
- Google Maps integration (implemented)
- No e-commerce (informational only)

## What's Been Implemented

### Backend (FastAPI)
- ✅ Admin authentication (JWT tokens)
- ✅ Offer CRUD operations (create, read, update, delete)
- ✅ Contact form with Resend email integration (MOCKED - needs API key)
- ✅ Categories API with default data
- ✅ Protected admin routes

### Frontend (React + Tailwind + Shadcn/UI)
- ✅ Homepage with full-width hero image
- ✅ About page (Om oss) with split-layout hero and values section with images
- ✅ Weekly offers page (Veckans erbjudanden) with filtering and split-layout hero
- ✅ Categories page (Sortiment) with product categories and split-layout hero
- ✅ Contact page with form, Google Maps, and split-layout hero
- ✅ Admin login page
- ✅ Admin dashboard (static - needs UI for offer management)

### Design Updates (2026-02-25)
- ✅ Color scheme changed from orange to RED per user request
- ✅ User-provided logo integrated in Header and Footer
- ✅ Split-layout hero design applied to all interior pages
- ✅ "Våra värderingar" section redesigned with image cards
- ✅ Responsive layout fixed for tablet screens (md: breakpoint)
- ✅ Mobile header optimized with contact info links
- ✅ Homepage offers limited to 4 items

## Admin Credentials
- Username: `admin`
- Password: `mathallen2024`

## Prioritized Backlog

### P0 (Critical) - Done
- [x] All core pages
- [x] Admin authentication
- [x] Offer management API
- [x] Split-layout hero on all pages
- [x] Responsive design (mobile, tablet, desktop)

### P1 (High Priority)
- [ ] Configure Resend API key for real email delivery
- [ ] Migrate in-memory data to MongoDB for persistence
- [ ] Build Admin Dashboard UI for offer CRUD operations

### P2 (Medium Priority)
- [ ] Hero video upload mechanism (external URLs blocked by CORS)
- [ ] Newsletter subscription form
- [ ] Multi-week offer scheduling

### P3 (Low Priority)
- [ ] Recipe suggestions
- [ ] Loyalty program integration
- [ ] Offer analytics

## Known Issues
- ⚠️ Data is in-memory (offers, categories) - not persistent
- ⚠️ Admin dashboard is static - needs UI implementation
- ⚠️ External video URLs blocked by CORS in environment

## Next Tasks
1. Migrate in-memory data to MongoDB for persistence
2. Build Admin Dashboard UI for managing offers
3. Add Resend API key to enable contact form emails

# Mathallen Malmö - Product Requirements Document

## Original Problem Statement
Build a corporate website for Mathallen Malmö - a local supermarket (stormarknad) in Malmö, Sweden. The site should be warm, accessible, campaign-focused, and NOT e-commerce. Focus on promotion, campaigns, brand trust, and store information.

## User Personas
1. **Local Families** - Malmö residents doing weekly grocery shopping
2. **Price-conscious Shoppers** - Customers following weekly campaigns
3. **Store Administrators** - Staff managing weekly offers

## Core Requirements
- Swedish language throughout
- Warm orange/yellow color scheme
- Mobile-first, accessible design
- Admin panel for managing weekly campaigns
- Contact form with email notifications
- Google Maps integration
- No e-commerce (informational only)

## What's Been Implemented (2026-02-25)

### Backend (FastAPI + MongoDB)
- ✅ Admin authentication (JWT tokens)
- ✅ Offer CRUD operations (create, read, update, delete)
- ✅ Contact form with Resend email integration (MOCKED - needs API key)
- ✅ Categories API with default data
- ✅ Protected admin routes

### Frontend (React + Tailwind + Shadcn/UI)
- ✅ Homepage with Bento Grid hero
- ✅ About page (Om oss) with company values and timeline
- ✅ Weekly offers page (Veckans erbjudanden) with filtering
- ✅ Categories page (Sortiment) with product categories
- ✅ Contact page with form and Google Maps
- ✅ Admin login page
- ✅ Admin dashboard with offer management

### Design
- ✅ Manrope + Public Sans fonts
- ✅ Orange (#F97316) and Amber (#FBBF24) accent colors
- ✅ Stone-50 background (#FAFAF9)
- ✅ Responsive design
- ✅ Swedish/Scandinavian minimalism

## Admin Credentials
- Username: `admin`
- Password: `mathallen2024`

## Prioritized Backlog

### P0 (Critical) - Done
- [x] All core pages
- [x] Admin authentication
- [x] Offer management

### P1 (High Priority)
- [ ] Configure Resend API key for real email delivery
- [ ] Add image upload for offers (currently URL-based)

### P2 (Medium Priority)
- [ ] Newsletter subscription
- [ ] Multi-week offer scheduling
- [ ] Offer analytics

### P3 (Low Priority)
- [ ] Recipe suggestions
- [ ] Loyalty program integration

## Next Tasks
1. Add Resend API key to enable contact form emails
2. Test email delivery with real recipients
3. Add more product images to offers

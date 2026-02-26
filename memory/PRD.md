# Mathallen Malmö - Product Requirements Document

## Original Problem Statement
Design and build a corporate yet warm, accessible, and campaign-focused website for a reliable, modern, and customer-centric stormarknad (supermarket) in Malmö, named "Mathallen Malmö." The website's primary goals are to position the brand, highlight weekly campaigns, provide a simple and trustworthy user experience, and motivate customers to visit the physical store. The site is not for e-commerce.

## User Language
Turkish

## Core Requirements

### 1. Homepage
- Hero area with video, CTA for weekly offers
- Customer reviews section
- Newsletter signup
- Content updated per user request

### 2. About Us Page
- Company story and values
- Image gallery

### 3. Weekly Campaigns (Veckans Erbjudanden)
- Page displaying all current product offers
- Category filtering system (implemented)
- Multi-Buy feature with conditional display logic (implemented)
- Product card design with yellow price box

### 4. Store Information & Contact
- Address, hours, contact form
- Maps for two locations
- Hero section uses video

### 5. Admin Panel
- Secure area for CRUD operations on weekly offers
- View newsletter subscribers
- See contact form messages
- Unit (Enhet) field is optional
- Multi-buy value is manual number input
- Drag-and-drop and numerical input for reordering offers
- Category dropdowns sorted alphabetically

### 6. Shop Page
- Placeholder for future e-commerce

### 7. SEO
- Optimized for search engines

### 8. Header
- White top bar, red main menu
- Fully sticky behavior on desktop and mobile

### 9. Footer
- Credit section for "Orvedo Co."

---

## What's Been Implemented

### Session: 2026-02-26
- **Ticket-edge effect removed** - User requested flat edges on yellow price boxes
- **Admin Panel verified working** - Category and Unit dropdowns function correctly

### Previous Sessions
- Offers page category filtering
- Multi-Buy "För" feature with conditional rendering
- Header redesign (white top-bar, red main-menu)
- Admin offer sorting (drag-and-drop + numerical)
- Admin panel enhancements (optional unit, alphabetical categories)
- Homepage offers section update
- Video integration on Contact and Offers pages
- Content & style updates
- Data persistence clarification
- Footer credits for Orvedo Co.

---

## Pending Issues

### P1 - High Priority
1. **Email functionality not active** - Needs `RESEND_API_KEY` in backend/.env
2. **"Write a Review" link placeholder** - Needs Google Maps review URL

### P2 - Medium Priority
1. **Hero video compatibility** - Recommend .mp4/.webm format for mat-video.mov

---

## Upcoming Tasks
- (P2) Enhance Google Maps integration with interactive map

## Future/Backlog
- (P2) Build Online Shop functionality

---

## Technical Architecture

```
/app/
├── backend/
│   ├── server.py        # FastAPI app, all API endpoints
│   └── uploads/         # Uploaded offer images
├── frontend/
│   ├── public/
│   │   ├── mat-video.mov
│   │   ├── contact-video.mov
│   │   └── logo-beyaz2.png
│   └── src/
│       ├── components/
│       │   ├── Footer.jsx
│       │   ├── Header.jsx
│       │   └── Layout.jsx
│       └── pages/
│           ├── AboutPage.jsx
│           ├── AdminDashboard.jsx
│           ├── AdminLogin.jsx
│           ├── ContactPage.jsx
│           ├── HomePage.jsx
│           ├── OffersPage.jsx
│           └── ShopPage.jsx
```

## Admin Credentials
- Username: admin
- Password: mathallen2024

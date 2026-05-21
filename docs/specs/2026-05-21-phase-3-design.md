# Design Specification: Phase 3 - Community & Affiliate

## 1. Goal
Add authentication, user profiles, history tracking, and affiliate recommendations to FitLaps.

## 2. Core Features
- **Authentication**: NextAuth.js (Email/Google).
- **User Profile**: Storage of user fitness stats and preferences.
- **History Tracking**: Ability to save and view past AI-generated plans.
- **Affiliate Recommendation**: Context-aware product recommendations based on user goals.

## 3. Database Schema Changes (Prisma)
- Add `User` model.
- Add `Account` and `Session` models (NextAuth).
- Add `PlanHistory` model (link to User, store JSON plan data).
- Add `Product` model (Affiliate links).

## 4. UI/UX
- Login/Register pages.
- Profile management page.
- History dashboard tab.
- "Recommended For You" sections in AI plan results.

## 5. Technology
- NextAuth.js
- Prisma
- Tailwind CSS

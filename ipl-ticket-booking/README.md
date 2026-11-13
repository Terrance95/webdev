# 🏏 IPL Matchday 2027 — Ticket Booking Portal

A fast, visually rich web application for booking official Indian Premier League stadium passes and tickets.

## ✨ Features
- **No Login Required**: Instant guest booking with zero friction or sign-in walls.
- **Cinematic Stadium Aesthetic**: Immersive night cricket stadium background with glowing floodlights, dynamic team crests, and dark glassmorphism cards.
- **Complete Booking Fields**: Full Name, Email Address, Mobile Number, Stand Selection (General & VIP), and Quantity Stepper.
- **Live Matchday Pass**: Interactive digital holographic stadium boarding pass preview updating in real-time as you fill details.
- **Resilient Dual Storage**:
  - Automatically saves tickets to Supabase cloud database if configured.
  - Automatically persists to local pass wallet (`localStorage`), so users never lose their booked passes even if offline.
- **Pass Wallet & History**: View, print, or cancel match passes with QR code mockups and gate entrance instructions.
- **Fixture Search & Filter**: Search upcoming IPL fixtures by franchise name, city, or stadium venue.

## 🚀 Quick Start

1. Install dependencies:
   ```sh
   npm install
   ```

2. Run local development server:
   ```sh
   npm run dev
   ```

3. Build for production:
   ```sh
   npm run build
   ```

## 🗄️ Supabase Setup (Optional Cloud Sync)

If you have a Supabase project:
1. Open your Supabase Dashboard → **SQL Editor**.
2. Run the SQL script located in [`supabase/schema.sql`](./supabase/schema.sql).
3. Ensure `.env.local` contains your project credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-or-publishable-key
   ```
4. Even without Supabase or if offline, the app functions smoothly using the local pass wallet!

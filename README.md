# Jonacart Next.js

Next.js rebuild of Jonacart (jonacart.com) — same UI style, PostgreSQL, search, login/signup, admin panel, Cash on Delivery + Razorpay (test mode) checkout.

## Setup (local)

```bash
cd jonacart-next
copy .env.example .env    # on Linux/Mac: cp .env.example .env
docker compose up -d
npm install
npm run db:push
npm run db:seed
npm run dev
```

- Store: http://localhost:3000
- Admin: http://localhost:3000/admin (default `admin` / `admin123` — change in `.env` before going live)

## Payments

- **Cash on Delivery** works out of the box.
- **Razorpay** is wired up in **test mode** using the sample test keys already in `.env`
  (`RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` / `NEXT_PUBLIC_RAZORPAY_KEY_ID`). Use Razorpay's
  [test card/UPI details](https://razorpay.com/docs/payments/payments/test-card-upi-details/) to try
  a payment. Swap in your own live keys later — no code changes needed.

## VPS deploy (Ubuntu)

1. Install Node 18+, PostgreSQL, Nginx, pm2
2. Clone/copy this folder to server
3. Set `.env` (see `.env.example`)
4. `npm install && npm run db:push && npm run db:seed && npm run build`
5. `pm2 start npm --name jonacart -- start`
6. Nginx reverse proxy → port 3000 + SSL

## Env vars

- `DATABASE_URL` — PostgreSQL connection
- `SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`
- `EMAIL_*` — order emails (optional)
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` — online pay (test keys included)

## Features

- Customer login / signup (session-based), checkout requires login
- Admin panel — products, categories, coupons, banner, orders, users
- Product search (`/shop?q=...`)
- COD + Razorpay (test mode) checkout
- PostgreSQL via Prisma (instead of JSON files)
- Full 82-product catalogue seeded from `prisma/data/products.json` — Personalised Gifts, Festive
  Gifts, Gourmet Hampers, Lifestyle Gifts and Kids Gifts, sourced from your CSV export. Edit that
  file (or use the admin panel) and re-run `npm run db:seed` any time the catalogue changes.


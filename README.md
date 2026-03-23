# Foodies (Client + Server)

Full-stack food ordering app with:
- Customer auth (JWT in HTTP-only cookie)
- Seller/admin auth (separate cookie)
- Product listing + add product with image upload (Cloudinary)
- Cart + addresses
- Orders (Cash on Delivery)

## Repo structure

- `client/`: React + Vite + Tailwind frontend
- `server/`: Express + MongoDB (Mongoose) API

## Prerequisites

- Node.js 18+ (recommended)
- MongoDB connection string (Atlas is fine)
- Cloudinary account (for image upload)

## Environment variables

### Server (`server/.env`)

Create `server/.env` with these keys:

- `PORT` (optional, defaults to `4000`)
- `MONGODB_URL` (example format: `mongodb+srv://user:pass@cluster...`  
  Note: the code appends `/foodies` automatically)
- `JWT_SECRET`
- `NODE_ENV` (`development` or `production`)
- `SELLER_EMAIL`
- `SELLER_PASSWORD`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Client (`client/src/.env`)

- `VITE_BACKEND_URL` (for local dev you likely want `http://localhost:4000`)
- `VITE_CURRENCY` (example: `$`)

Note: in the current code, several API calls are hard-coded to a deployed backend URL inside `client/src/context/AppContext.jsx`. If you want the client to use `VITE_BACKEND_URL` everywhere, update those axios URLs accordingly.

## Install & run (local development)

### 1) Start the server

```bash
cd server
npm install
npm run dev
```

Server runs on `http://localhost:4000` by default.

### 2) Start the client

```bash
cd client
npm install
npm run dev
```

Client runs on `http://localhost:5173` by default.

## API overview

Base URL: `http://localhost:4000`

### Auth (User) — `/api/user`

- `POST /register`
- `POST /login`
- `GET /is-auth` (requires user cookie)
- `POST /logout` (requires user cookie)
- `POST /forget` (password reset OTP flow)
- `POST /verify`
- `POST /reset`

### Auth (Seller) — `/api/seller`

- `POST /login`
- `GET /is-auth` (requires seller cookie)
- `POST /logout`

### Products — `/api/product`

- `POST /add` (seller-only, multipart; image field: `image`, JSON field: `productData`)
- `GET /list`
- `GET /:id`
- `POST /stock` (seller-only)

### Cart — `/api/cart`

- `POST /update` (user-only)

### Address — `/api/address`

- `POST /add` (user-only)
- `GET /get` (user-only)

### Orders — `/api/orders`

- `POST /cod` (user-only)
- `GET /user` (user-only)
- `GET /admin` (seller-only)

## CORS / cookies notes

- The server enables `credentials: true` CORS and sets HTTP-only cookies (`token`, `sellerToken`).
- Allowed origins are currently hard-coded in `server/index.js` (includes `http://localhost:5173` plus a deployed frontend URL). If your frontend runs on a different host/port, update that list.

## Security note (important)

There is a committed `server/.env` in this repo which contains secrets (JWT, DB credentials, Cloudinary keys). You should **rotate these secrets immediately** and avoid committing `.env` files going forward (use `.env.example` + local `.env` instead).


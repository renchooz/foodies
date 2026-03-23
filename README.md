# Foodies (Client + Server)

Full-stack food ordering app with:
- Customer auth (JWT in HTTP-only cookie)
- Seller/admin auth (separate cookie)
- Product listing + add product with image upload (Cloudinary)
- Cart + addresses
- Orders (Cash on Delivery)
- Password reset using OTP (OTP is returned in the API response)

## Repo structure

- `client/`: React + Vite frontend
- `server/`: Express + MongoDB (Mongoose) API

## Prerequisites

- Node.js 18+ (20+ recommended)
- MongoDB connection string (Atlas is fine)
- Cloudinary account (for image upload)
- A supported browser that allows cross-site cookies (the app uses `httpOnly` cookies with CORS credentials)

## Environment variables

### Server (`server/.env`)

Create `server/.env` with these keys:

- `PORT` (optional, defaults to `4000`)
- `MONGODB_URL` (example: `mongodb+srv://user:pass@cluster...`)  Note: the server appends `/foodies` automatically
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

Important: in the current code, many API calls are hard-coded to `https://foodies-backend-mu0d.onrender.com` (not just `AppContext.jsx`). If you want to run locally, update those URLs across `client/src/` (search for `foodies-backend-mu0d.onrender.com`).

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

- `POST /register` body: `{ name, email, password, phone }`
- `POST /login` body: `{ email, password }` (sets `token` cookie)
- `GET /is-auth` (requires `token` cookie)
- `POST /logout` (requires `token` cookie; clears cookie)
- `POST /forget` body: `{ phone }`
  Note: generates an OTP and returns it in the API response (no SMS integration in this code).
- `POST /verify` body: `{ phone, otp }`
- `POST /reset` body: `{ phone, newPassword }`

### Auth (Seller) — `/api/seller`

- `POST /login` body: `{ email, password }` (sets `sellerToken` cookie)
- `GET /is-auth` (requires `sellerToken` cookie)
- `POST /logout` (clears `sellerToken` cookie)

### Products — `/api/product`

- `POST /add` (seller-only, `multipart/form-data`)
  Fields: `image` (file), `productData` (JSON string)
- `GET /list`
- `GET /:id`
  Note: controller reads `req.body.id` (so this may not work as a normal `:id` route).
  This endpoint is not used by the current frontend.
- `POST /stock` (seller-only) body: `{ id, inStock }`

### Cart — `/api/cart`

- `POST /update` (user-only) body: `{ userId, cartItems }`
  Note: auth is validated via cookie, but the stored cart comes from the `userId` in the request body.

### Address — `/api/address`

- `POST /add` (user-only) body: `{ name, phone, street, city, state, country, pinCode }`
- `GET /get` (user-only) returns `{ addresses: [...] }`

### Orders — `/api/orders`

- `POST /cod` (user-only) body: `{ address, items }`
- `items`: array of `{ product: <productId>, quantity }`
- The server calculates: `sum(offerPrice * quantity) + 2% service charge`.
- Note: the backend stores `address` as a string and expects the address id for population; the current frontend passes the full address object.
- `GET /user` (user-only) returns populated orders for the logged-in user
- `GET /admin` (seller-only) returns orders where `paymentMethod === "COD"` OR `isPaid === true`
  Note: this codebase currently only creates COD orders.

## CORS / cookies notes

- The server enables `credentials: true` CORS and sets HTTP-only cookies (`token`, `sellerToken`).
- Allowed origins are hard-coded in `server/index.js` (includes `http://localhost:5173` plus a deployed frontend URL). Update that list if you run the client elsewhere.

## Security note

- Do not commit real secrets to the repo.
- Keep your server credentials in `server/.env` only.
- `client/src/.env` in this repo contains non-secret config (currency + intended backend URL).

## Docker (optional)

Build and run the server:

```bash
docker build -t foodies-server -f server/Dockerfile server
docker run --name foodies-server --rm -p 4000:4000 --env-file server/.env foodies-server
```

Build and run the client:

```bash
docker build -t foodies-client -f client/Dockerfile client
docker run --name foodies-client --rm -p 80:80 foodies-client
```

Note: the client currently uses hard-coded backend URLs in multiple files. If you want the Dockerized client to talk to your Dockerized server, update those URLs in `client/src/` first.


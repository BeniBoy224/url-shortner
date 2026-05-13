# LinkTo — URL Shortener & Click Tracker

A self-hosted URL shortener that tracks click analytics per link, including total click counts, click timeline, and generalised location data (country, region, city).

**Hosted Project**
- Create your own: `https://linkto.bltlabs.co.uk`

**Example**
- Original: `https://www.bbc.co.uk/news/articles/cn0pgl0vk0qo`
- Short: `https://linkto.bltlabs.co.uk/abc123`

## Features

- Create short links tied to your account
- Per-link dashboard with click timeline table, location chart, and total click count
- Edit or delete links at any time
- Rate-limited redirect endpoint
- Authentication with username/password (NextAuth v5)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL via Prisma 7
- **Auth:** NextAuth v5
- **UI:** Tailwind CSS + shadcn/ui

---

## Production Setup

### Prerequisites

- Node.js 24+
- A PostgreSQL database
- A server or platform to host a Node.js app (e.g. a VPS, Railway, Render)

### 1. Clone and install

```bash
git clone https://github.com/BeniBoy224/link-to
cd url-shortner
npm install --legacy-peer-deps
```

### 2. Configure environment variables

Create a `.env` file by copping the `.env.example` in the project root:

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/link_to"

# NextAuth secret — generate with: openssl rand -base64 32
AUTH_SECRET="your-random-secret"

# The public base URL of your deployment (no trailing slash)
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
```

### 3. Run database migrations

```bash
npx prisma migrate deploy
```

### 4. Build the app

```bash
npm run build
```

### 5. Start the production server

```bash
npm start
```

The app will be available on port `3010` by default. Put it behind a reverse proxy (e.g. Nginx or Caddy) to serve it on port 80/443 with TLS.

---

### Nginx example (reverse proxy)

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

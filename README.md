# Daily Work Log App (Next.js + PostgreSQL + Prisma)

A fullstack web application to save daily work logs with fields:
- **title**
- **content**
- **date**
- **task**

It includes a clean, modern, minimalist UI and is ready for local development with Docker DB and deployment on Vercel.

## 1) Tech Stack
- Next.js (App Router)
- Prisma ORM
- PostgreSQL
- Docker Compose (local DB)
- Vercel (production hosting)

## 2) Local Development Setup (with DB on Docker)

### Step 1: Install dependencies
```bash
npm install
```

### Step 2: Copy environment file
```bash
cp .env.example .env
```

### Step 3: Start PostgreSQL with Docker
```bash
docker compose up -d
```

### Step 4: Run Prisma migration
```bash
npx prisma migrate dev --name init
```

### Step 5: Start the app
```bash
npm run dev
```

Open: `http://localhost:3000`

## 3) Database Model
`WorkLog` table columns:
- `id` (string, cuid)
- `title` (string)
- `content` (string)
- `task` (string)
- `date` (datetime)
- `createdAt`, `updatedAt`

## 4) Production Deployment on Vercel (Step-by-Step)

### Step 1: Push code to GitHub
```bash
git add .
git commit -m "Initial work log app"
git push
```

### Step 2: Create production PostgreSQL database
Use any managed PostgreSQL provider (Neon, Supabase, Railway, etc.) and copy the connection string.

### Step 3: Import project in Vercel
1. Go to Vercel dashboard.
2. Click **Add New Project**.
3. Import the GitHub repository.

### Step 4: Add environment variable in Vercel
In Project Settings → Environment Variables, add:
- `DATABASE_URL` = your production PostgreSQL URL

### Step 5: Build settings
Vercel auto-detects Next.js. Keep defaults.

### Step 6: Deploy
Click **Deploy**.

### Step 7: Run migration in production DB
Run this from your machine with production `DATABASE_URL`:
```bash
npx prisma migrate deploy
```

### Step 8: Redeploy (if required)
Trigger redeploy from Vercel dashboard.

## 5) Useful Commands
```bash
npm run dev
npm run build
npm run start
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

# Rapid AI Prototyping Service — Next.js 14 Landing Page

A high-converting, single-page landing page built with Next.js 14 (App Router), React, Tailwind CSS, TypeScript, and Lucide icons. Designed with Conversion Rate Optimization (CRO), AEO (Answer Engine Optimization), and structured Schema.org markup.

## Quick Local Setup (Under 60 Seconds)

### Option 1: Run the Next.js Project

```bash
# 1. Navigate to the project directory
cd rapid-ai-prototype-nextjs

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Run the Standalone Single-File HTML (Zero Install)

If you just want to test or preview the page immediately without installing npm packages:

```bash
# Using Python's built-in webserver:
python3 -m http.server 3000
# or using npx:
npx serve .
```

Open [http://localhost:3000/rapid_ai_prototype.html](http://localhost:3000/rapid_ai_prototype.html).

---

## Video Integration: Adding "Project Pro" Demo Video

Place your 2-minute MP4 video inside the `public/` directory:
- Name the file: `project-pro-demo.mp4` -> Path: `public/project-pro-demo.mp4`
- Place your thumbnail poster image as: `public/project-pro-thumbnail.jpg`

The `<VideoPlayer />` component will automatically pick it up and play it with native controls and custom timeline scrubbers.

---

## Production Deployment to Vercel (1-Click)

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of high-converting landing page"
   git branch -M main
   git remote add origin https://github.com/your-username/rapid-ai-prototyping.git
   git push -u origin main
   ```

2. Deploy on Vercel:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Next.js is automatically detected; click **Deploy**

3. Deploy on Render:
   - Create a **Web Service** on Render
   - Build Command: `npm run build`
   - Start Command: `npm start`

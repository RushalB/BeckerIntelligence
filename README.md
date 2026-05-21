

## 🚀 How to Deploy

The platform consists of a lightweight Vanilla HTML/CSS/JS frontend served alongside a robust Express + TypeScript backend.

### 1. Local Deployment

#### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher

#### Steps
1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Configure Environment:**
   Copy the template environment file:
   ```bash
   cp .env.example .env
   ```
   *Default Variables:*
   - `PORT=3000` (Port the server listens on)
   - `NODE_ENV=development` (Runtime environment)

3. **Start the Dev Server:**
   ```bash
   npm run dev
   ```
   The backend will bootstrap with hot-reloading active via `ts-node-dev`:
   ```text
   [assetService] Loaded 10 assets and 10 signups from stub data
   Server running on port 3000
   ```
4. **Open in Browser:** Navigating to `http://localhost:3000` will render the landing page.

### 2. Production Deployment (Vercel)

The application is pre-configured to run as a serverless function with CDN-backed static asset routing via [vercel.json](file:///Users/rushalbutala/Documents/Code/asset-lead-gen-interview-take-home-main/vercel.json).

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel@latest
   ```
2. **Link your workspace (first-time setup):**
   ```bash
   vercel link
   ```
   Follow the prompts to link your Vercel profile.
3. **Deploy to production:**
   ```bash
   vercel deploy --prod
   ```

# Becker Intelligence — Design Rationale

## Product Overview

Becker Intelligence is a sub-brand within the Becker Healthcare ecosystem focused on delivering operational and strategic healthcare content for hospital executives.

The platform aggregates high-quality content such as:

- Articles
- Podcasts
- Webinars
- Sponsored assets

Topics include operations, patient experience, staffing, EHR technology, and workflow optimization.

The platform also functions as a lead-generation tool by collecting user information such as email, organization, and job title.

---

# Persona

## VP of Strategic Operations & Innovation

### Core Needs

- Improve staffing efficiency
- Reduce burnout
- Optimize patient throughput
- Learn operational best practices

### User Behavior

This user is extremely busy and values speed and clarity. They consume quick, high-value content through podcasts, articles, and webinars and want immediate access to relevant information without unnecessary friction.

---

# Design Decisions

- Built the experience around fast content access and low cognitive load
- Retained Becker’s brand language while making the UI more executive-focused and minimal
- Kept the landing page intentionally simple since users already trust the Becker’s brand
- Featured speakers prominently because credibility and authority strongly influence engagement in healthcare media
- Used a 2-step signup flow so returning users can quickly access content with minimal friction
- Added filters, topic shortcuts, featured assets, and category tags to improve content discoverability and scanability
- Used secondary brand colors subtly to maintain a professional enterprise aesthetic

---

# Tradeoffs

- Chose vanilla HTML/CSS/JS for faster development since the project scope was relatively small
- Accessibility and multilingual support were not fully implemented due to time constraints
- Featured assets are currently randomized rather than personalized
- Engagement indicators such as trust signals, view counts, or executive recommendations were not implemented

---

# Future Improvements

- Add accessibility and multilingual support
- Introduce personalized recommendations
- Add trust metrics and key insight summaries for assets
- Improve content ranking based on user behavior
- Migrate to React for better scalability and maintainability as the platform grows
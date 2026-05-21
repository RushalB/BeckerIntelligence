

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
- Added filters, topic shortcuts, featured assets, and added(self generated) category tags to improve content discoverability and scanability
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


## Raw (human written thought -- i asked AI to format it for me, this is the raw version)
# Becker Intelligence — Design Case Study

## Overview

I designed a persona for the primary user: a VP of Strategic Operations & Innovation at a hospital. His core needs center around improving staffing efficiency, reducing burnout, optimizing patient throughput, and learning operational best practices. He's a busy executive who consumes content through podcasts, articles, and webinars.

---

## Brand

I chose **Becker Intelligence** as a sub-brand within the Becker Healthcare ecosystem. The brand provides curated intelligence — content for executives looking to improve operations, patient experience, EHR tech, and workflow optimization. We aggregate high-quality content from various sources (including sponsored content) and make it available to this audience. In exchange, we collect name, email, organization, and job title to qualify them as leads.

I used Becker's existing token system but gave it a more executive-friendly aesthetic — clean, direct, and authoritative without being overwhelming.

---

## Key Design Decisions

### Landing Page
I kept the landing page extremely minimal. Executives who land here already know why they're here and already trust the Becker Healthcare brand. There's no need to over-explain. The secondary brand color is used subtly to maintain brand consistency without distraction.

### Sign-Up Flow — Speaker-First Strategy
I featured speakers and contributors prominently on the sign-up page. Executives trust the person behind the content, not just the topic. Much like academic research papers, a recognized name drives access — even if the subject matter isn't the user's primary focus. Giving speakers more real estate on the page directly supports conversion.

The sign-up flow is broken into **two steps**. Users whose information we already have can access content by entering just their email, instantly qualifying as a lead without friction.

### Intelligence Hub
The main content discovery area gives users multiple filtering options alongside a curated list of popular topics for quick navigation. Featured assets are randomized to surface variety. Each asset includes a **category tag** so users immediately understand what type of content they're accessing — this is a required UX element given how diverse the asset types are.


---

## Tradeoffs & Future Considerations

- **Multilingual support** was a priority I wanted to include. This type of brand serves global audiences, and accessibility across languages matters — it's something to build toward as the product scales.
- **Vanilla HTML/CSS/JS** was the right call for speed of execution at this scope. As the platform grows in content volume and interactivity, migrating to React will be the natural next step.
- **Social Proof & Engagement Signals
I want to add **key insights and view counts** to each asset. This lets users quickly gauge how many people have engaged with a piece of content and whether it's worth their time — a trust signal that mirrors how executives evaluate information in other contexts.



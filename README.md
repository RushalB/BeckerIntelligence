

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


##Raw
I made a persona for the user who is VP of Strategic Operations & Innovation at a Hospital.
His core needs are 
Improve staffing efficiency
Reduce burnout
Optimize patient throughput
Learn operational best practices
He is a busy person and want access to the content quickly, He consumes podcast,articles and attends webinar for getting this information   I choose my brand becker intelligence to be sub brand of of the becker health care ecosystem. This is a brand that provides intelligence which is essentially content for people who are executives are want to improve on things like operations , patient experience ehr tech etc. to optimize their workflow. Our brand through gather high quality content from various sources sometimes even sponsored and makes it available to these people. We take their email id name org and job title so as to make them a potential lead.  I choose to use beckers token but gave it more executive friendly aesthetic.Execs are busy people and dont to get everything fast so the user experience is quick, direct and to the point. but maintained becers overall brand image 
I specifcally featured speakers on the signup page because users will trust the speaker/contributor of the asset and at times even if they dont care about the subject matter the are likely to access that content, similar to research papers. So I gave them more realestate on the page.  I broke the signup page into 2 steps so user whose information we already have can quickly access the content with just their email id and we already have them as a lead.Once user is in they can also view related content  The intellience hub which is the main area for finding relevant assets, I gave the user multiple options to filter and also have a list of some popular topics they may want to search by along with featured assets (which are randomized for now) . I also added a category tag to the article( this was generated but my design requires user to know what the asset is about  Tradeoffs: I wanted to add accesibility because this type of a brand will have global audiences so I wanted to add multi lingual support.  An extremely important thing I was to addend key inisights and views of a particular asset. So users can know how many people trusted this and if it is worth their time to read I kept the landing page extremley simple because the kind of executives who would land here already know why they are here and already trust the becker health brand. I used the second brand color very subtly. I had to build it in vanilla html css js to buld quicky and react didnt make sense for such a small project.but as this grows it is better to shift. 

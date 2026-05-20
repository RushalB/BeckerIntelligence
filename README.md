# asset-lead-gen-interview-take-home

"Take Home" technical interview question

## Design system

The `design_system/` folder contains the Becker's Healthcare brand system candidates should use as a reference when building the frontend.

### Fonts & colors — `colors_and_type.css`

Import this file first in any HTML page. It defines:

- **Colors** — deep navy (`--bh-navy-*`) as the identity color, crimson red (`--bh-red-*`) as the accent (links, kickers, CTAs), and a cool-neutral ice palette (`--bh-ice-*`, `--bh-gray-*`) for backgrounds and borders. Semantic aliases (`--color-bg`, `--color-accent`, etc.) are also provided.
- **Typography** — `--font-serif` (Noto Serif) for all headlines; `--font-sans` (Fira Sans) for body, nav, and UI. A fluid type scale from `--fs-xs` (12px) to `--fs-6xl` (72px), plus pre-built classes like `.bh-h1`, `.bh-headline`, `.bh-kicker`, `.bh-body`.
- **Spacing** — 4px base scale (`--sp-1` through `--sp-11`).
- **Radii** — largely square; max `--radius-lg` (8px) for cards, `--radius-pill` for tags.
- **Shadows** — minimal (`--shadow-xs` through `--shadow-lg`); editorial, not decorative.

### Assets

| Path | Contents |
|------|----------|
| `assets/logos/` | Becker's Hospital Review wordmark (PNG) |
| `assets/icons/` | SVG icons for the four content types: `events`, `webinars`, `whitepapers`, `podcasts` |
| `uploads/` | Brand board screenshots used to derive the system |

### UI kits

| Kit | Path | Description |
|-----|------|-------------|
| BHR Web | `ui_kits/bhr-web/` | High-fidelity recreation of the Becker's Hospital Review website. Includes `Header.jsx`, `ArticleCard.jsx`, `EventAndCTA.jsx`, `Footer.jsx`, `SiteSwitcher.jsx`, and an interactive `index.html` demo. |
| Newsletter | `ui_kits/newsletter/` | Recreation of the Becker's daily email newsletter (640px editorial stack). Includes `Newsletter.jsx` and a rendered `index.html` sample. |

Both kits depend on `colors_and_type.css` and scope their styles through `kit.css`.

### Preview pages

`design_system/preview/` contains standalone HTML files for every token and component category: color palettes, type scales, spacing, shadows, radii, buttons, forms, nav, tags, and article/event cards. Open any file in a browser to see the rendered system.

### Brand voice

The design system README (`design_system/README.md`) includes full content guidelines: sentence-case headlines, third-person copy, AP-style numbers, no emoji, and the "Professional · Trusted · Engaging" tone triad. Read it before writing any UI copy.

---

## Frontend take-home

Open [`ux-design-dev-interview-challenge.html`](./ux-design-dev-interview-challenge.html) in a browser for the full frontend assignment brief — requirements, per-page specs, API usage, and the submission checklist.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

## Getting started

**1. Install dependencies**

```bash
npm install
```

**2. Configure environment**

```bash
cp .env.example .env
```

The default values in `.env.example` work out of the box:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Port the HTTP server listens on |
| `NODE_ENV` | `development` | Runtime environment |

**3. Start the dev server**

```bash
npm run dev
```

The server starts with hot reload via `ts-node-dev`. You should see:

```
[assetService] Loaded 10 assets and 10 signups from stub data
Server listening on port 3000
```

## API

All responses are wrapped in `{ data: T }` on success and `{ error: string }` on failure.

---

### `GET /assets` — List all assets

Returns every lead gen asset in the system.

**Response `200`**

```json
{
  "data": [
    {
      "id": "5af0e596b3c7e95aaafe42e01222f91666354f9152238bcf443b2c4c4ac46cfa",
      "name": "The Future of AI in Clinical Decision Support",
      "description": "A live webinar exploring how AI-powered tools are transforming clinical decision-making...",
      "executionDate": "2026-06-10T14:00:00.000Z",
      "expirationDate": "2026-12-31",
      "sponsorName": "Epic Systems",
      "assetType": "Live Webinar",
      "speakers": [
        {
          "id": "04d7bc0f2f0841afc8f7383a2525a2c5edb805625dbe1b117b70ecc3d3004911",
          "firstName": "Linda",
          "lastName": "Nguyen",
          "jobTitle": "Director of Clinical Informatics",
          "companyName": "Mayo Clinic",
          "email": "linda.nguyen@mayoclinic.org"
        }
      ],
      "createdDate": "2026-04-01T09:00:00.000Z",
      "createdBy": "admin@beckershealthcare.com",
      "lastModifiedDate": "2026-04-15T11:30:00.000Z",
      "lastModifiedBy": "admin@beckershealthcare.com"
    }
  ]
}
```

**Example**

```bash
curl http://localhost:3000/assets
```

---

### `GET /assets/:id` — Get a single asset

Returns one asset by its id, including optional `speakers` and scheduling fields.

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The asset's unique identifier |

**Response `200`**

```json
{
  "data": {
    "id": "5af0e596b3c7e95aaafe42e01222f91666354f9152238bcf443b2c4c4ac46cfa",
    "name": "The Future of AI in Clinical Decision Support",
    "description": "A live webinar exploring how AI-powered tools are transforming clinical decision-making...",
    "executionDate": "2026-06-10T14:00:00.000Z",
    "expirationDate": "2026-12-31",
    "sponsorName": "Epic Systems",
    "assetType": "Live Webinar",
    "speakers": [...],
    "createdDate": "2026-04-01T09:00:00.000Z",
    "createdBy": "admin@beckershealthcare.com",
    "lastModifiedDate": "2026-04-15T11:30:00.000Z",
    "lastModifiedBy": "admin@beckershealthcare.com"
  }
}
```

**Response `404`** — asset id not found

```json
{ "error": "Asset not found" }
```

**Example**

```bash
curl http://localhost:3000/assets/5af0e596b3c7e95aaafe42e01222f91666354f9152238bcf443b2c4c4ac46cfa
```

---

### `POST /assets/:id/signup` — Sign up for an asset

Registers a person for a lead gen asset. The operation is idempotent: signing up the same person for the same asset twice returns the same signup record both times.

**Path parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The asset's unique identifier |

**Request body** (`application/json`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `person` | object | yes | The person signing up |
| `person.id` | string | no | Existing person id. If omitted, one is generated from the person's name and email |
| `person.firstName` | string | yes | |
| `person.lastName` | string | yes | |
| `person.jobTitle` | string | yes | |
| `person.companyName` | string | yes | |
| `person.email` | string | yes | |

**Response `201`**

```json
{
  "data": {
    "id": "a3f9c2...",
    "assetId": "5af0e596b3c7...",
    "signupDate": "2026-05-11T18:32:00.000Z",
    "person": {
      "id": "7b1d44...",
      "firstName": "Jane",
      "lastName": "Smith",
      "jobTitle": "CFO",
      "companyName": "Acme Health",
      "email": "jane.smith@acme.com"
    }
  }
}
```

**Response `400`** — `person` field missing from request body

```json
{ "error": "person is required" }
```

**Example — new person (no existing id)**

```bash
curl -X POST http://localhost:3000/assets/5af0e596b3c7e95aaafe42e01222f91666354f9152238bcf443b2c4c4ac46cfa/signup \
  -H "Content-Type: application/json" \
  -d '{
    "person": {
      "firstName": "Jane",
      "lastName": "Smith",
      "jobTitle": "CFO",
      "companyName": "Acme Health",
      "email": "jane.smith@acme.com"
    }
  }'
```

**Example — known person (preserve existing id)**

```bash
curl -X POST http://localhost:3000/assets/5af0e596b3c7e95aaafe42e01222f91666354f9152238bcf443b2c4c4ac46cfa/signup \
  -H "Content-Type: application/json" \
  -d '{
    "person": {
      "id": "04d7bc0f2f0841afc8f7383a2525a2c5edb805625dbe1b117b70ecc3d3004911",
      "firstName": "Linda",
      "lastName": "Nguyen",
      "jobTitle": "Director of Clinical Informatics",
      "companyName": "Mayo Clinic",
      "email": "linda.nguyen@mayoclinic.org"
    }
  }'
```

## Testing

### Unit tests

Mocks the service layer and tests controller/routing behavior in isolation.

```bash
npm test
```

### E2E tests

Runs the full Express stack against real stub data — no mocks. No server needs to be running; supertest handles it internally.

```bash
npx jest src/__tests__/assets.e2e.test.ts
```

To run all tests together:

```bash
npm test
```

### Watch mode

```bash
npm run test:watch
```

## Other commands

```bash
npm run build      # compile TypeScript to dist/
npm start          # run the compiled server (requires build first)
npm run lint       # lint src/**/*.ts
```

---

## Design Decisions & Implementation Notes

### 🎨 Visual & Aesthetic Choices
- **Brand Consistency**: Fully integrated the Becker's Healthcare brand design system across all three pages. Utilized the deep primary navy (`#061733` & `#091F3E`) and logo crimson (`#9A1B2A`) colors to build high-premium, editorial layouts.
- **Typography & Case Compliance**: Committed to Noto Serif for structural headlines and Fira Sans for fluid UI elements. Handled all casings in strict compliance with the editorial guide: sentence-case titles, Title Case buttons, and uppercase kicker badges. Zero emojis were used in the layouts.
- **Micro-Animations & Visual Hierarchy**: Implemented slide-up and fade-in modal animations, skeleton cards for load transitions, and a glassmorphic blur backdrop filter (`blur(8px)`) for the signup popup. This focuses the user's attention on the conversion gate without taking them off the editorial context.

### 📐 Tradeoffs & Technical Considerations
- **Vanilla Single-File Stack**: Built the frontend utilizing responsive Vanilla HTML, CSS, and JS. This ensures instantaneous page transitions and eliminates any client-side bundle load or framework hydration overhead.
- **Client-Side Catalog Orchestration**: The catalog filters (asset type tabs, search term match, and date sorting) are executed entirely client-side. This maximizes the catalog's sub-millisecond sorting speed. For larger databases (1,000+ items), we would shift this filtering logic server-side via database queries.

### 🚀 Future Considerations
1. **Dynamic Recommendation Modeling**: Sibling asset suggestions currently query `/assets` on successful signup and match by asset type or sponsor. With more time, we would implement collaborative filtering or user search intent modeling.
2. **Automated Webinar Provisioning**: Link the `POST /assets/:id/signup` action directly to live provider APIs (such as Zoom or GoToWebinar) to return active calendar invite files in real time.
3. **Persisted Sessions**: Upgrade the localStorage registry to a unified session profile synced to a user database table for cross-device authentication.


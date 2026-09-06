# 🌿 GreenMerkato (ግሪን መርካቶ)

> **Operational organic-waste-to-compost management system for Merkato, Addis Ababa, Ethiopia.**  
> Transforming Africa's largest open-air market waste into high-grade organic fertilizer for Ethiopian agriculture.

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Offline--Ready-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-AI%20Enabled-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)

---

## 📌 Overview

**GreenMerkato** is an end-to-end circular economy platform designed specifically for the unique operational realities of **Merkato** in Addis Ababa, Ethiopia. Every day, tons of organic matter (vegetables, fruits, coffee chaff, grain husks) accumulate across dense market zones like *Atikilt Tera* and *Sebategna*. 

GreenMerkato coordinates waste collectors, composting facilities, and agricultural buyers into a unified, transparent supply chain that diverts landfill waste, cuts methane emissions, and supplies Ethiopian farmers with nutrient-rich compost.

---

## ✨ Key Features

### 👥 Role-Based Workflows
* **Field Collection Workers (`COLLECTION_WORKER`)**:
  * Optimized mobile-first touch UI for rugged field conditions.
  * Fast vendor logging with digital scale integration and QR scanning.
  * Contamination reporting (plastics, metals, glass) with instant visual grading.
* **Compost Facility Operators (`COMPOST_OPERATOR`)**:
  * Track incoming raw organic matter batches and windrow piles.
  * Monitor critical fermentation metrics (temperature, moisture, aeration cycles).
  * Laboratory quality checks (NPK levels, maturity, moisture content).
* **Sales & Logistics Officers (`SALES_OFFICER`)**:
  * Real-time bagged compost inventory management.
  * Farmer & cooperative purchase orders with delivery tracking across regional farming zones.
* **Operations Managers & Administrators (`OPERATIONS_MANAGER` / `ADMINISTRATOR`)**:
  * Live KPI dashboards: total organic kilograms diverted, methane offset, carbon credits.
  * Market zone performance breakdowns, audit logs, and team management.

### 🌐 Bilingual (English & Amharic / አማርኛ)
* Native toggle between English and **Amharic (አማርኛ)** across all dashboards, forms, receipts, and public pages.

### 📱 Offline-First Progressive Web App (PWA)
* Fully functional offline caching for field operators with intermittent market connectivity.
* Local storage queue syncs automatically once an internet connection is re-established.
* Installable on Android, iOS, and desktop browsers.

### 🤖 Gemini AI Integration
* AI-assisted contamination diagnostics and compost batch maturity assessments via `@google/genai`.

---

## 🗺️ Market Zones Covered

* **Atikilt Tera (አትክልት ተራ)** – Fruit & Vegetable Wholesale
* **Sebategna Organic (ሰባተኛ ኦርጋኒክ)** – High-volume perishables & greens
* **Shera Tera (ሸራ ተራ)** – Grain husks & spice residues
* **Bomb Tera (ቦምብ ተራ)** – General perishables & produce vendors
* **Military Tera (ሚሊተሪ ተራ)** – Perishables & market stalls
* **Dubai Tera Fresh Arcade (ዱባይ ተራ)** – Produce stalls & food stalls

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Motion & Animations** | [Motion](https://motion.dev/) (Framer Motion) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Build Tool** | [Vite 6](https://vitejs.dev/) |
| **PWA & Offline** | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) |
| **AI Capabilities** | [Google Gen AI SDK (`@google/genai`)](https://www.npmjs.com/package/@google/genai) |

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm, bun, or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/yaredzb/GreenMerkato.git
cd GreenMerkato
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env.local
```

Open `.env.local` and add your **Gemini API Key**:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Get a free API key at [Google AI Studio](https://aistudio.google.com/))*

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite local development server on port 3000 |
| `npm run build` | Compiles and builds the production-ready bundle in `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript type-checking (`tsc --noEmit`) |

---

## 📂 Project Structure

```text
greenmerkato/
├── public/                  # PWA icons, manifests, and static assets
├── src/
│   ├── assets/              # High-res photography & market imagery
│   ├── components/
│   │   ├── admin/           # Team management & administrative views
│   │   ├── collection/      # Field worker collection flow & scale forms
│   │   ├── common/          # Header, Sidebar, PWA install, Ethiopic elements
│   │   ├── compost/         # Composting piles, batches & QA testing
│   │   ├── impact/          # Carbon offset, diversion analytics & traceability
│   │   ├── operations/      # Central operations command dashboard
│   │   ├── public/          # Public portal, landing pages, & partner views
│   │   ├── reports/         # Audits & exportable compliance reports
│   │   ├── sales/           # Compost warehouse inventory & farmer orders
│   │   └── vendors/         # Market vendor directory & incentive tiers
│   ├── context/             # AppContext (Role, Language, State management)
│   ├── data/                # Initial data models & Merkato seed data
│   ├── types.ts             # Strong TypeScript interfaces & domain types
│   ├── App.tsx              # Main layout & role routing
│   └── main.tsx             # Application entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🤝 Contributing & License

Contributions, feedback, and partnerships are welcome!
Licensed under the [MIT License](LICENSE).

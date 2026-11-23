# JANSETU: Where Communities Meet Innovation
### A Collaborative Ecosystem Connecting Communities, Universities, Government and Industry

[![Live Demo](https://img.shields.io/badge/Demo-jansetu--woad.vercel.app-brightgreen?style=for-the-badge&logo=vercel)](https://jansetu-woad.vercel.app/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://jansetu-woad.vercel.app/)

> 🚀 **Live Demo:** [https://jansetu-woad.vercel.app/](https://jansetu-woad.vercel.app/)

A digital platform to crowdsource societal challenges and facilitate collaborative problem-solving through universities and industry partnerships.

---

## 1. System Vision & Architecture

JanSetu acts as a national digital innovation bridge connecting four key stakeholders:
1. **Citizens and Grassroots Communities:** Report hyper-local civic and environmental problems with geospatial coordinates and photographic evidence.
2. **Government Authorities & Nodal Desks:** Audit evidence, prioritize challenges, allocate seed grants, and commission university research labs.
3. **Universities, Faculty PIs, and Student Researchers:** Adopt verified challenges as accredited R&D projects, fabricate prototypes, and field-test telemetry solutions.
4. **Industries, Deeptech Startups, and CSR Organizations:** Discover high-TRL university innovations, pledge CSR grants (Schedule VII Section 135), and provide corporate mentorship.

---

## 2. Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling & Design System:** Tailwind CSS, Custom Editorial Dark Glassmorphism, Plus Jakarta Sans & Inter
- **3D Graphics & Telemetry:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Animations:** Framer Motion
- **Icons & Visualization:** Lucide React, Recharts
- **Routing:** React Router v6
- **State Management & Persistence:** Context API with local storage persistence and modular data abstraction

---

## 3. Platform Modules & Routes

| Route | Purpose | Key Capabilities |
|---|---|---|
| `/` | 3D Landing Page | Interactive 3D globe with 4 stakeholder nodes, live metrics, workflow pipeline, and featured challenges |
| `/citizen` | Citizen Dashboard | View submitted problems, track lifecycle status, upvote community challenges |
| `/citizen/report` | Problem Submission Wizard | Geotagged challenge reporting, photo evidence attachment, real-time AI triage engine with duplicate detection |
| `/government` | Government Command Desk | District submission & verification telemetry, Recharts domain distribution, triage audit and university assignment |
| `/university` | University R&D Hub | Departmental challenge pool, AI-matched challenges, proposal launcher, capstone student team management |
| `/industry` | Industry & CSR Desk | Discover high-impact university prototypes, CSR grant pledge simulator, mentorship commitments |
| `/challenges` | Challenges Explorer | Deep faceted search by domain, district, priority, and status |
| `/challenges/:id` | Challenge Dossier | Complete problem observations, evidence gallery, official government verification record, AI analysis report |
| `/projects` | Collaborative Projects | Active R&D projects repository, funding tickers, progress indicators |
| `/projects/:id` | Project Tracking Workspace | Milestone deliverables checklist, interactive progress updater, research team roster, industry sponsors |
| `/login` | Multi-Stakeholder Portal | Instant stakeholder persona switcher (Citizen, Govt IAS Officer, University PI, Industry VP) |

---

## 4. AI Intelligence Architecture

The platform features an explainable, modular AI triage service (`src/services/aiService.ts`):
- **Semantic Domain Classification:** Classifies reports across 8 national priority sectors (Water, Agriculture, Urban Infra, Clean Energy, Healthcare, Waste, Rural Tech, Disaster Resilience).
- **Keyword Extraction:** Identifies critical technical parameters (e.g. Phosphate, Siltation, Arsenic, Fluoride, MPPT).
- **Priority & Urgency Assessment:** Analyzes community health and safety risks to recommend priority tiers (`critical`, `high`, `medium`, `low`) with natural language justification.
- **Institutional Lab Matching:** Matches reports to registered Indian universities (IIT Delhi, IIT Bombay, IIT Madras, COEP Pune, IISc, Anna University, PAU Ludhiana) based on departmental research track records.
- **Duplicate Report Detection:** Calculates semantic and geospatial similarity to prevent fragmented efforts and strengthen community dossiers.
- **Zero API Key Leakage:** Built with a deterministic offline intelligence engine with optional secure backend proxy integration. Clearly distinguishes automated AI suggestions from authorized human government decisions.

---

## 5. Development & Running the Application

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
The server will start at `http://localhost:3000`.

### Production Build
```bash
npm run build
```

---

## 6. Stakeholder Perspectives & Quick-Start Guide

Use the **Persona Switcher** in the top navigation bar or navigate to `/login` to experience JanSetu across all four stakeholder perspectives:
1. **Switch to Citizen (Ramesh K. Sharma):** Report a new challenge at `/citizen/report` and observe the live AI triage preview.
2. **Switch to Government (Dr. Neha Swaminathan, IAS):** Go to `/government`, inspect district bar charts, audit pending submissions, and verify with a pilot grant.
3. **Switch to University (Prof. Anamika Vashisht, Ph.D.):** Open `/university`, browse verified challenges, and submit an R&D project proposal.
4. **Switch to Industry (Siddharth Roy):** Open `/industry`, discover projects seeking capital, and pledge a CSR grant.

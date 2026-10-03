# Product Requirements Document (PRD)
# Personal Technical Portfolio — Sakha Wibisono

**Version:** 1.0  
**Status:** Draft / Development Ready  
**Product Type:** Personal Technical Portfolio & Engineering Showcase  
**Primary Stack:** Astro, Vue.js, Laravel, PostgreSQL  
**Design Direction:** Modern, Minimal, Semi-Glassmorphism

---

## 1. Product Overview

Personal Technical Portfolio adalah website portfolio interaktif yang digunakan untuk memperkenalkan profil profesional, pengalaman, pendidikan, skills, projects, certifications, dan technical journey Sakha Wibisono.

Website tidak hanya berfungsi sebagai pengganti CV online, tetapi juga sebagai **technical showcase** untuk mendemonstrasikan kemampuan frontend, backend, API integration, database, authentication, system architecture, dan DevOps.

Informasi konten utama berasal dari CV, termasuk pengalaman di Telkom University/PuTI, Asah Ied by Dicoding, Peruri, pendidikan D3 dan S1 Informatika, organisasi, sertifikasi, serta technical skills.

---

## 2. Product Goals

### Primary Goals

1. Membuat portfolio profesional yang merepresentasikan profil sebagai Informatics graduate dan software developer.
2. Menampilkan pengalaman dan project secara lebih interaktif dibandingkan CV PDF.
3. Mendemonstrasikan kemampuan frontend menggunakan Astro dan Vue.js.
4. Mendemonstrasikan kemampuan backend menggunakan Laravel dan PostgreSQL.
5. Menunjukkan kemampuan API integration, authentication, database, dan system architecture.
6. Menjadikan portfolio sebagai showcase project ketika melamar pekerjaan.

### Secondary Goals

- Menjadi tempat dokumentasi project.
- Menampilkan technical case study.
- Menjadi playground untuk mencoba teknologi baru.
- Menjadi project yang dapat dikembangkan secara bertahap ke arah DevOps.

---

## 3. Non-Goals

Pada versi pertama, website tidak bertujuan menjadi:

- Social media.
- Blog platform kompleks.
- CMS multi-user.
- E-commerce.
- Community platform.
- Job application platform.

Backend harus tetap memiliki fungsi yang relevan dengan portfolio dan tidak dibuat hanya untuk menambah kompleksitas.

---

## 4. Target Users

### 4.1 Recruiter / HR

Tujuan:

- Mengenal profil kandidat.
- Melihat pengalaman.
- Melihat pendidikan.
- Melihat skills.
- Melihat project.
- Menghubungi kandidat.

### 4.2 Technical Recruiter / Hiring Manager

Tujuan:

- Menilai kemampuan teknis.
- Melihat project implementation.
- Memahami technology stack.
- Melihat engineering approach.
- Melihat case study.

### 4.3 Developer / Engineer

Tujuan:

- Mengeksplorasi project.
- Melihat architecture.
- Melihat GitHub/demo.
- Melihat implementation details.
- Memahami technical decisions.

### 4.4 Portfolio Owner

Sakha sebagai administrator.

Tujuan:

- Mengelola project.
- Mengelola experience.
- Mengelola skills.
- Membaca contact messages.
- Melihat analytics.

---

# 5. Product Structure

```text
Portfolio
│
├── Public Website
│   ├── Home
│   ├── About
│   ├── Experience
│   ├── Projects
│   ├── Skills
│   ├── Education
│   ├── Certificates
│   ├── Case Studies
│   └── Contact
│
└── Admin Dashboard
    ├── Dashboard
    ├── Projects
    ├── Experience
    ├── Skills
    ├── Education
    ├── Certificates
    ├── Messages
    └── Analytics
```

---

# 6. Technology Stack

| Layer | Technology |
|---|---|
| Frontend framework | Astro |
| Interactive components | Vue.js |
| Styling | Tailwind CSS |
| Backend | Laravel |
| API | Laravel REST API |
| Database | PostgreSQL |
| Authentication | Laravel Sanctum |
| Containerization | Docker |
| Reverse Proxy | Nginx |
| CI/CD | GitHub Actions |
| External API | GitHub API |
| Version Control | Git / GitHub |

---

# 7. Design Requirements

## 7.1 Design Direction

Tema utama:

> **Modern Developer × Semi-Glassmorphism**

Glassmorphism digunakan sebagai design language, bukan diterapkan pada seluruh element.

### Visual characteristics

- Dark / neutral background.
- Transparent surfaces.
- Backdrop blur.
- Subtle borders.
- Soft shadows.
- Ambient gradients.
- Rounded corners.
- Minimal animations.
- High readability.

### Glassmorphism digunakan pada

- Navbar.
- Cards.
- Project cards.
- Modal.
- Statistics.
- Timeline nodes.
- Contact form.
- Admin dashboard.

### Prinsip desain

> Glassmorphism harus memperkuat hierarchy dan depth, bukan mengurangi readability.

---

# 8. Information Architecture

## 8.1 Home

```text
Hero
↓
Short Introduction
↓
Featured Projects
↓
Technical Profile
↓
Experience Preview
↓
Call To Action
```

## 8.2 About

```text
Profile
↓
Career Journey
↓
Technical Interests
↓
Personal Approach
```

## 8.3 Experience

Timeline pengalaman:

```text
2024
Telkom University / PuTI

2025
Asah Ied by Dicoding

2025–2026
Peruri

2026
Bachelor Graduate
```

## 8.4 Projects

```text
Project Grid
↓
Filter
↓
Project Detail
↓
Case Study
```

## 8.5 Contact

```text
Contact Information
↓
Contact Form
↓
Laravel API
↓
PostgreSQL
```

---

# 9. Functional Requirements

## FR-01 — Landing Page

Website harus memiliki halaman utama yang menampilkan:

- Nama.
- Professional headline.
- Short introduction.
- Primary CTA.
- Secondary CTA.
- Featured projects.
- Technical profile.
- Experience preview.

---

## FR-02 — About Section

Menampilkan ringkasan profesional berdasarkan CV:

- Bachelor of Informatics.
- Diploma in Software Application Engineering.
- Frontend development.
- JavaScript.
- React.
- API integration.
- Modern web development.
- Data Science.

---

## FR-03 — Experience Timeline

Setiap experience memiliki struktur:

```text
id
company
position
location
start_date
end_date
description
technologies
featured
created_at
updated_at
```

Experience utama:

- Telkom University / PuTI — Frontend Programmer.
- Asah Ied by Dicoding — Programmer / React & Backend.
- Peruri — Programmer Internship.

---

## FR-04 — Project Management

Project disimpan di database.

### Project fields

```text
id
title
slug
short_description
description
thumbnail
year
category
featured
github_url
demo_url
architecture
challenge
solution
result
created_at
updated_at
```

### Project categories

```text
Web Development
Frontend
Backend
Full Stack
AI / ML
Data Science
Academic
```

---

## FR-05 — Project Filtering

User dapat melakukan filtering berdasarkan kategori:

```text
All
Frontend
Backend
Full Stack
AI / ML
Data
Academic
```

Vue.js digunakan untuk interactive filtering tanpa full page reload.

---

## FR-06 — Project Case Study

Setiap project yang memiliki case study dapat menampilkan:

```text
Project Overview
↓
Problem
↓
Objectives
↓
Tech Stack
↓
Architecture
↓
Implementation
↓
Challenges
↓
Solution
↓
Results
↓
Lessons Learned
↓
GitHub / Demo
```

Project prioritas untuk case study:

1. Predictive Lead Scoring.
2. Generative AI + Process Discovery.
3. Astro + Vue SSO.
4. Project lain yang relevan.

---

## FR-07 — Technical Stack Visualization

Skills ditampilkan berdasarkan kategori:

```text
Frontend
- Astro
- Vue.js
- React
- AngularJS
- JavaScript
- HTML/CSS

Backend
- Laravel
- PHP
- REST API
- Supabase

Data & AI
- Python
- Machine Learning
- Generative AI
- Process Mining

Tools
- Git
- GitHub
- Docker
- VS Code
```

---

## FR-08 — Education

Menampilkan:

### Diploma

**Diploma in Software Application Engineering**

Telkom University  
2021–2024  
GPA 3.67/4.00

### Bachelor

**Bachelor of Informatics**

Telkom University  
2024–2026  
GPA 3.50/4.00

---

## FR-09 — Certificates

Menampilkan:

- Belajar Fundamental Back-End dengan Javascript — Dicoding.
- Belajar Machine Learning untuk Pemula — Dicoding.
- Belajar Fundamental Aplikasi Web dengan React — Dicoding.
- Belajar Dasar Cloud dan Gen AI di AWS — Dicoding.
- IT Support Google — Coursera.

---

## FR-10 — Contact Form

Fields:

```text
Name
Email
Subject
Message
```

Flow:

```text
Vue Form
    ↓
POST /api/contact
    ↓
Laravel Validation
    ↓
PostgreSQL
    ↓
Message Created
```

Success response:

```json
{
  "success": true,
  "message": "Your message has been sent successfully."
}
```

---

## FR-11 — Admin Authentication

Admin authentication tersedia melalui:

```text
/admin/login
```

Setelah berhasil login:

```text
/admin/dashboard
```

Authorization flow:

```text
Guest
  ↓
Login
  ↓
Authenticated Admin
  ↓
Admin Resources
```

Laravel Sanctum dapat digunakan sebagai authentication mechanism untuk API.

---

## FR-12 — Admin Dashboard

Dashboard menampilkan:

```text
Total Projects
Total Experiences
Total Messages
Total Page Views
```

Contoh:

```text
┌────────────┬────────────┬────────────┬────────────┐
│ Projects   │ Experience │ Messages   │ Visitors   │
│     8      │     4      │     12     │   1,284    │
└────────────┴────────────┴────────────┴────────────┘
```

---

## FR-13 — Project CRUD

Admin dapat:

- Create project.
- Read project.
- Update project.
- Delete project.

Project form:

```text
Title
Slug
Description
Category
Year
Thumbnail
Tech Stack
GitHub URL
Demo URL
Featured
Case Study
```

---

## FR-14 — Experience CRUD

Admin dapat mengelola:

```text
Company
Position
Location
Start Date
End Date
Description
Technology
```

---

## FR-15 — Message Management

Admin dapat:

- Melihat message.
- Menandai message sebagai read.
- Mengarsipkan message.
- Menghapus message.

Status:

```text
new
read
archived
```

---

## FR-16 — Visitor Analytics

Backend dapat mencatat data analytics minimum:

```text
page
timestamp
referrer
user_agent
```

Dashboard menampilkan:

```text
Total Views
Unique Visitors
Popular Pages
Views Over Time
```

Analytics harus mengikuti prinsip data minimization dan tidak mengumpulkan data pribadi yang tidak diperlukan.

---

## FR-17 — GitHub Integration

**Priority: P2**

Laravel dapat mengambil informasi repository dari GitHub API.

Informasi yang dapat ditampilkan:

```text
Repository
Language
Stars
Forks
Last Updated
```

Tujuannya untuk memperlihatkan aktivitas development tanpa membuat GitHub clone.

---

## FR-18 — API Playground

**Priority: P2**

Halaman optional yang memperlihatkan API portfolio.

Contoh:

```text
GET /api/projects
```

Response:

```json
[
  {
    "title": "Predictive Lead Scoring",
    "category": "AI / ML",
    "year": 2025
  }
]
```

Tujuannya untuk menunjukkan bahwa portfolio benar-benar menggunakan backend API.

---

# 10. Backend API Specification

Base URL:

```text
/api
```

## Public Endpoints

### Projects

```http
GET /api/projects
GET /api/projects/{slug}
```

### Experiences

```http
GET /api/experiences
GET /api/experiences/{id}
```

### Skills

```http
GET /api/skills
```

### Certificates

```http
GET /api/certificates
```

### Contact

```http
POST /api/contact
```

### Analytics

```http
POST /api/analytics/view
```

## Protected Endpoints

### Projects

```http
POST /api/projects
PUT /api/projects/{id}
DELETE /api/projects/{id}
```

### Experiences

```http
POST /api/experiences
PUT /api/experiences/{id}
DELETE /api/experiences/{id}
```

---

# 11. Database Design

Database menggunakan PostgreSQL.

## Core Tables

```text
users
projects
project_technologies
technologies
experiences
experience_technologies
educations
certificates
messages
page_views
```

## Project relationship

```text
projects
    │
    └── project_technologies
              │
              └── technologies
```

## Experience relationship

```text
experiences
    │
    └── experience_technologies
              │
              └── technologies
```

Pendekatan many-to-many digunakan agar technology dapat digunakan kembali pada banyak project atau experience.

---

# 12. High-Level Architecture

```text
                         INTERNET
                             │
                             ▼
                         ┌───────┐
                         │ Nginx │
                         └───┬───┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
                  ▼                     ▼
             Astro / Vue          Laravel API
                  │                     │
                  │                     ▼
                  │                PostgreSQL
                  │
                  ▼
              Browser
```

Development environment:

```text
Docker Compose
│
├── nginx
├── frontend
├── backend
└── postgres
```

---

# 13. Frontend Architecture

Astro bertanggung jawab atas:

- Page routing.
- Static content.
- Server-side rendering bila diperlukan.
- SEO.
- Page composition.
- Performance optimization.

Vue.js digunakan pada bagian yang membutuhkan interactivity:

- Project filtering.
- Modal.
- Contact form.
- Timeline interaction.
- Admin dashboard.
- Interactive statistics.
- API playground.

Prinsip:

> Use Astro for content and page delivery; use Vue where client-side interactivity provides clear value.

---

# 14. Backend Architecture

Laravel bertanggung jawab atas:

- REST API.
- Database access.
- Authentication.
- Authorization.
- Validation.
- CRUD.
- Contact management.
- Analytics.
- External API integration.
- Business logic.

Struktur backend:

```text
Laravel
│
├── Controllers
├── Models
├── Requests
├── Resources
├── Services
├── Policies
├── Middleware
└── Routes
```

Business logic yang kompleks sebaiknya ditempatkan pada service layer, bukan seluruhnya di controller.

---

# 15. Security Requirements

Backend harus menerapkan:

- Request validation.
- Authentication.
- Authorization.
- Rate limiting.
- Secure password hashing.
- CORS configuration.
- Input validation.
- Secure error handling.
- Environment-based secrets.
- Database credentials melalui environment variables.

Secret tidak boleh di-commit:

```text
APP_KEY
DB_PASSWORD
GITHUB_TOKEN
API_KEYS
```

---

# 16. Performance Requirements

Target:

- Fast initial page load.
- Minimal client-side JavaScript.
- Optimized images.
- Lazy loading untuk non-critical images.
- Vue hanya digunakan pada interactive sections.
- API response menggunakan pagination ketika data bertambah.
- Database query dioptimalkan untuk menghindari unnecessary queries.

---

# 17. Responsive Requirements

Website wajib mendukung:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Target viewport:

```text
320px → 1440px+
```

Design harus tetap usable tanpa bergantung pada hover interaction.

---

# 18. Accessibility Requirements

Minimum accessibility:

- Semantic HTML.
- Proper heading hierarchy.
- Keyboard navigation.
- Visible focus state.
- Accessible form labels.
- Alternative text pada images.
- Sufficient color contrast.
- Reduced-motion consideration.
- Accessible modal interaction.

---

# 19. SEO Requirements

Setiap halaman harus memiliki:

```text
title
description
canonical URL
Open Graph metadata
social preview image
```

Project menggunakan slug:

```text
/projects/{slug}
```

Contoh:

```text
/projects/predictive-lead-scoring
/projects/generative-ai-process-discovery
```

---

# 20. DevOps Requirements

## Docker

Environment harus dapat dijalankan dengan:

```bash
docker compose up -d
```

Services:

```text
nginx
frontend
backend
postgres
```

## CI/CD

GitHub Actions pipeline:

```text
git push
    ↓
GitHub Actions
    ↓
Install Dependencies
    ↓
Lint
    ↓
Test
    ↓
Build
    ↓
Docker Build
    ↓
Deploy
```

---

# 21. Development Phases

## Phase 1 — Foundation

- [ ] Repository setup.
- [ ] Astro setup.
- [ ] Vue setup.
- [ ] Laravel setup.
- [ ] PostgreSQL setup.
- [ ] Docker Compose.
- [ ] Environment configuration.
- [ ] Basic CI.

## Phase 2 — Design System

- [ ] Color tokens.
- [ ] Typography.
- [ ] Glass surface.
- [ ] Buttons.
- [ ] Cards.
- [ ] Navigation.
- [ ] Modal.
- [ ] Form components.
- [ ] Responsive layout.

## Phase 3 — Public Portfolio

- [ ] Home.
- [ ] About.
- [ ] Experience.
- [ ] Projects.
- [ ] Project detail.
- [ ] Skills.
- [ ] Education.
- [ ] Certificates.
- [ ] Contact.

## Phase 4 — Backend

- [ ] PostgreSQL schema.
- [ ] Laravel migrations.
- [ ] Models.
- [ ] API resources.
- [ ] Project API.
- [ ] Experience API.
- [ ] Skills API.
- [ ] Contact API.
- [ ] Validation.
- [ ] Error handling.

## Phase 5 — Admin

- [ ] Admin login.
- [ ] Authentication.
- [ ] Dashboard.
- [ ] Project CRUD.
- [ ] Experience CRUD.
- [ ] Message management.
- [ ] Analytics.

## Phase 6 — Advanced Features

- [ ] GitHub integration.
- [ ] API playground.
- [ ] Advanced project case study.
- [ ] Interactive architecture visualization.

## Phase 7 — Production

- [ ] Docker production configuration.
- [ ] Nginx configuration.
- [ ] GitHub Actions.
- [ ] CI/CD.
- [ ] Production database.
- [ ] Domain.
- [ ] HTTPS.
- [ ] Monitoring.

---

# 22. MVP Scope

MVP dianggap selesai apabila:

### Public

- [ ] User dapat membuka homepage.
- [ ] User dapat melihat profile.
- [ ] User dapat melihat experience.
- [ ] User dapat melihat project.
- [ ] User dapat membuka project detail.
- [ ] User dapat melihat skills.
- [ ] User dapat melihat education.
- [ ] User dapat melihat certificates.
- [ ] User dapat mengirim contact message.

### Backend

- [ ] Laravel API berjalan.
- [ ] PostgreSQL terintegrasi.
- [ ] Project API berjalan.
- [ ] Experience API berjalan.
- [ ] Contact API berjalan.
- [ ] Validation berjalan.

### Admin

- [ ] Admin login.
- [ ] Admin dashboard.
- [ ] Project CRUD.
- [ ] Experience CRUD.
- [ ] Message management.

### Infrastructure

- [ ] Docker Compose.
- [ ] Environment configuration.
- [ ] CI pipeline.

---

# 23. Priority Matrix

| Feature | Priority | Phase |
|---|---|---|
| Home | P0 | 2–3 |
| About | P0 | 3 |
| Experience | P0 | 3 |
| Projects | P0 | 3 |
| Project Detail | P0 | 3 |
| Skills | P0 | 3 |
| Education | P0 | 3 |
| Certificates | P0 | 3 |
| Contact | P0 | 3–4 |
| Laravel API | P0 | 4 |
| PostgreSQL | P0 | 4 |
| Admin Authentication | P1 | 5 |
| Project CRUD | P1 | 5 |
| Experience CRUD | P1 | 5 |
| Message Management | P1 | 5 |
| Analytics | P2 | 5–6 |
| GitHub Integration | P2 | 6 |
| API Playground | P2 | 6 |
| Advanced Animation | P3 | 6 |

Legend:

- **P0** — Required for MVP.
- **P1** — Important after MVP.
- **P2** — Enhancement.
- **P3** — Nice-to-have.

---

# 24. Success Criteria

Project dianggap berhasil apabila:

### Technical

- Frontend Astro berjalan.
- Vue interactive components berjalan.
- Laravel REST API berjalan.
- PostgreSQL terintegrasi.
- Authentication berjalan.
- CRUD berjalan.
- Automated tests tersedia.
- Docker environment reproducible.
- CI/CD berjalan.

### UX

- Website responsive.
- Navigation mudah dipahami.
- Project mudah ditemukan.
- Contact form mudah digunakan.
- Semi-glassmorphism tidak mengurangi readability.
- Animasi tidak mengganggu usability.

### Portfolio

Website mampu menunjukkan:

```text
Frontend
Backend
Database
REST API
Authentication
System Architecture
Docker
CI/CD
```

---

# 25. Product Principle

Prinsip utama project:

> **Every technical feature must have a reason to exist.**

Laravel tidak digunakan hanya agar portfolio terlihat full-stack.

Contoh:

```text
Laravel
├── API
├── Authentication
├── Content Management
├── Contact Management
└── Analytics
```

Astro tidak digunakan hanya sebagai framework frontend.

```text
Astro
├── Page Delivery
├── SEO
├── SSR / Static Rendering
└── Performance
```

Vue digunakan ketika membutuhkan interactivity.

```text
Vue
├── Project Filtering
├── Forms
├── Modal
├── Timeline
├── Dashboard
└── API Playground
```

Dengan pendekatan tersebut, portfolio berfungsi sebagai **produk sekaligus bukti implementasi kemampuan engineering**.

---

# 26. Future Improvements

Fitur berikut dapat ditambahkan setelah MVP:

- Blog / technical writing.
- MDX-based case studies.
- Full-text project search.
- Advanced analytics.
- GitHub contribution visualization.
- Automated project synchronization.
- Email notification.
- RSS feed.
- PWA support.
- Automated deployment rollback.
- Application monitoring.
- OpenAPI documentation.
- Automated database backup.

---

# 27. Final Product Vision

Portfolio ini bukan hanya:

```text
"Website yang berisi CV."
```

Tetapi:

```text
                PERSONAL PORTFOLIO
                       │
       ┌───────────────┼────────────────┐
       │               │                │
    FRONTEND        BACKEND            DATA
       │               │                │
     Astro           Laravel           PostgreSQL
     Vue             REST API          Analytics
     UI/UX           Auth              Projects
       │               │                │
       └───────────────┼────────────────┘
                       │
                    DEVOPS
                       │
               Docker / CI / CD
                       │
                       ▼
              Production Website
```

Website menjadi representasi langsung dari kemampuan yang ingin ditampilkan kepada recruiter, hiring manager, maupun developer.

---

## Document Status

**Current version:** 1.0  
**Next recommended documents:**

1. `ARCHITECTURE.md`
2. `DATABASE.md`
3. `API_SPECIFICATION.md`
4. `DESIGN_SYSTEM.md`
5. `DEVELOPMENT_ROADMAP.md`
6. `README.md`

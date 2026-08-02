# Ali Abu Waked — Personal Portfolio

A modern, high-performance personal portfolio website for a **Full Stack Laravel & Vue.js Developer**, built with Vue 3, Vite, and Tailwind CSS. It showcases projects, skills, professional journey, services, certificates, and a working EmailJS-powered contact form — fully localized in English and Arabic with RTL support.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-42b883?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.1-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🌐 Live Demo

> **https://your-portfolio.example.com** — replace this with the production URL once deployed.

---

## ✨ Features

- **Responsive design** — pixel-perfect layouts across mobile, tablet, and desktop.
- **Modern UI/UX** — awwwards-inspired glassmorphism design with a custom cursor and animated background.
- **Smooth animations** — GSAP scroll-triggered reveals, Lenis smooth scrolling, and micro-interactions throughout.
- **Project showcase** — 10 featured projects with rich detail pages, GitHub repository links, and YouTube video demos.
- **Skills section** — technology stack grid plus an interactive, auto-playing skill carousel with progress bars.
- **Experience section** — a visual "Development Journey" timeline with achievements and technologies.
- **Services section** — the services and capabilities offered.
- **Certificates section** — credentials and certifications.
- **Contact form** — EmailJS integration with client-side validation, honeypot spam trap, submission cooldown, loading/success/error states, and an automatic thank-you reply to the visitor.
- **Download CV** — one-click download of the résumé (`.docx`).
- **Dark / Light mode** — theme toggle persisted in `localStorage`, applied before first paint to avoid flash.
- **Bilingual & RTL** — full English/Arabic localization with automatic right-to-left layout switching.
- **Toast notifications** — app-wide feedback toasts.
- **Scroll progress bar** + route-aware navigation highlighting the active section.

---

## 🛠️ Tech Stack

| Layer         | Technology                                                        |
| ------------- | ----------------------------------------------------------------- |
| Framework     | [Vue.js 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| Build Tool    | [Vite](https://vitejs.dev/)                                       |
| Styling       | [Tailwind CSS](https://tailwindcss.com/) + custom CSS              |
| Language      | JavaScript (ES2022+)                                              |
| Routing       | [vue-router](https://router.vuejs.org/)                           |
| i18n          | [vue-i18n](https://vue-i18n.intlify.dev/)                         |
| Email         | [@emailjs/browser](https://www.emailjs.com/)                      |
| Animations    | [GSAP](https://gsap.com/) + [Lenis](https://github.com/darkroomengineering/lenis) |
| 3D / Visuals  | [Three.js](https://threejs.org/) (hero scene), [Swiper](https://swiperjs.com/) (carousels) |
| Icons         | Inline SVG (no icon library dependency)                           |
| Package Manager | npm                                                             |

### 📦 Dependencies

| Package                 | Version    |
| ----------------------- | ---------- |
| `vue`                   | `^3.5.39`  |
| `vue-router`            | `^4.6.4`   |
| `vue-i18n`              | `^11.4.8`  |
| `@emailjs/browser`      | `^4.4.1`   |
| `gsap`                  | `^3.15.0`  |
| `lenis`                 | `^1.3.25`  |
| `swiper`                | `^14.0.7`  |
| `three`                 | `^0.185.1` |

### 🧰 Dev Dependencies

| Package            | Version    |
| ------------------ | ---------- |
| `vite`             | `^8.1.1`   |
| `@vitejs/plugin-vue` | `^6.0.7` |
| `tailwindcss`      | `^3.4.19`  |
| `autoprefixer`     | `^10.5.4`  |
| `postcss`          | `^8.5.24`  |

---

## 📁 Folder Structure

```
awwwards-portfolio/
├── public/                     # Static assets (favicon, fonts)
├── src/
│   ├── assets/
│   │   ├── files/              # Downloadable CV
│   │   ├── images/             # Project & profile images
│   │   └── styles/             # Global Tailwind/CSS entry
│   ├── components/
│   │   ├── layout/             # Nav, footer, custom cursor
│   │   ├── sections/           # Homepage sections (Hero, About, Skills, Projects, Experience, Services, Certificates, Contact)
│   │   └── ui/                 # Reusable UI (ProjectCard, MagneticButton, Toast, LanguageSwitcher, ...)
│   ├── composables/            # useEmail, useLocale, useLocalizedData, useToast, useSmoothScroll, ...
│   ├── data/                   # projects, skills, experience, services, certificates, profile
│   ├── directives/             # Custom v-reveal directive
│   ├── i18n/                   # vue-i18n setup
│   ├── locales/                # en.json / ar.json translation files
│   ├── router/                 # vue-router configuration
│   ├── views/                  # HomePage, ProjectsPage, ProjectDetail, NotFoundView
│   ├── App.vue                 # Root component
│   └── main.js                 # App bootstrap
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
└── .env                        # Vite environment variables (not committed)
```

---

## 📦 Installation

Prerequisites: [Node.js](https://nodejs.org/) 18+ and npm.

```bash
# 1. Clone the repository
git clone https://github.com/Ali-Waked/awwwards-portfolio.git
cd awwwards-portfolio

# 2. Install dependencies
npm install

# 3. Configure environment variables (contact form)
cp .env.example .env
# Fill in your EmailJS credentials:
#   VITE_EMAILJS_PUBLIC_KEY
#   VITE_EMAILJS_SERVICE_ID
#   VITE_EMAILJS_CONTACT_TEMPLATE_ID
#   VITE_EMAILJS_REPLY_TEMPLATE_ID
```

> **Note:** The contact form requires valid EmailJS credentials. All `VITE_*` variables are client-safe (public key + IDs) — never store SMTP passwords or secret keys here. The `.env` file is gitignored.

---

## 🚀 Development

```bash
npm run dev
```

Starts the Vite dev server with hot module replacement. The app will be available at the URL printed in the terminal (usually `http://localhost:5173`).

---

## 🔨 Build for Production

```bash
npm run build
```

Creates an optimized production bundle in `dist/`. Preview it locally with:

```bash
npm run preview
```

### 📜 Available Scripts

| Script    | Command         | Description                             |
| --------- | --------------- | --------------------------------------- |
| `dev`     | `vite`          | Start the development server (HMR)      |
| `build`   | `vite build`    | Build the app for production            |
| `preview` | `vite preview`  | Serve the production build locally      |

---

## ☁️ Deployment

The project is a static SPA — the `dist/` folder can be deployed to any static host.

### Cloudflare Pages

1. In the Cloudflare dashboard, create a new **Pages** project and connect your Git repository.
2. **Build command:** `npm run build`
3. **Build output directory:** `dist`
4. Add the four `VITE_EMAILJS_*` environment variables under **Settings → Environment variables**.
5. Deploy. Add the `/_redirects` or a SPA fallback rule so all routes serve `index.html`.

### Vercel

1. Import the repository into Vercel (the Vite framework preset is auto-detected).
2. **Build command:** `npm run build`
3. **Output directory:** `dist`
4. Add the four `VITE_EMAILJS_*` environment variables under **Settings → Environment Variables**.
5. Deploy — Vue Router history mode is handled automatically by Vercel's SPA rewrites.

---

## ⚡ Performance Optimizations

- **Code splitting** — heavy libraries (GSAP, Three.js, Swiper, EmailJS) are loaded on demand via dynamic `import()`, keeping the initial bundle lean.
- **Lazy-loaded sections** — non-critical homepage sections are loaded asynchronously with `defineAsyncComponent`.
- **Route-level lazy loading** — every view is a dynamic import.
- **Hashed static assets** — cache-friendly filenames generated by Vite.
- **Global CSS is kept small** by purging unused Tailwind styles in production.

---

## 📷 Screenshots

> Replace the placeholders below with actual screenshots.

| Homepage | Projects | Project Detail |
| :------: | :------: | :------------: |
| ![Homepage](path/to/homepage.png) | ![Projects](path/to/projects.png) | ![Project Detail](path/to/project-detail.png) |

| Skills | Contact |
| :----: | :-----: |
| ![Skills](path/to/skills.png) | ![Contact](path/to/contact.png) |

---

## 🔮 Future Improvements

- Compress and modernize project images (WebP/AVIF) to reduce page weight.
- Add a blog or case-study section with rich content.
- Improve accessibility (ARIA audit, keyboard navigation, focus traps).
- Add end-to-end tests (Playwright / Vitest).
- Introduce `npm run lint` / `format` scripts with ESLint + Prettier.
- Add SEO enhancements and sitemap generation.

---

## 📄 License

This project does **not** currently include an open-source license — all rights are reserved. You are welcome to explore it for learning purposes, but please contact the author before reusing any part of the code or design.

---

## 👤 Author

**Ali Abu Waked** — Full Stack Laravel & Vue.js Developer

- 🌍 Location: Gaza, Palestine
- 💼 GitHub: [@Ali-Waked](https://github.com/Ali-Waked?tab=repositories)
- 🔗 LinkedIn: [Ali Waked](https://www.linkedin.com/in/ali-waked-002298275/)
- 📧 Email: [ali.i.waked2002@gmail.com](mailto:ali.i.waked2002@gmail.com)

---

If you find this project helpful, consider giving it a ⭐ — it's always appreciated!

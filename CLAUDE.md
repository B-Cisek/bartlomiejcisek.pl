# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with React 19, TypeScript, Vite, and TailwindCSS. The site features internationalization (i18n) with Polish and English support, a contact form with Google reCAPTCHA, and modern UI components from Magic UI with additional form components from shadcn/ui.

## Development Commands

```bash
# Development server (localhost:5173)
npm run dev

# Type-check and build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

## Project Architecture

### Tech Stack
- **Build Tool**: Vite 6.x with React plugin
- **Framework**: React 19 with TypeScript
- **Styling**: TailwindCSS 4.x with CSS variables for theming
- **UI Components**: Magic UI for visual/animated components + shadcn/ui (New York style) for forms
- **Routing**: React Router DOM 7.x with lazy-loaded routes
- **i18n**: i18next with browser language detection
- **Forms**: React Hook Form + Zod validation
- **HTTP**: Axios for API calls

### Directory Structure

```
src/
├── App.tsx              # Route definitions with lazy loading
├── main.tsx             # App entry point with ThemeProvider
├── components/
│   ├── magicui/         # Magic UI components (blur-fade, border-beam, dock, particles, interactive-hover-button)
│   ├── ui/              # shadcn/ui form components (button, input, card, form, etc.)
│   ├── hero.tsx         # Landing page hero section
│   ├── navigation.tsx   # Main navigation with mobile menu
│   ├── skills.tsx       # Skills showcase
│   ├── about-me.tsx     # About section
│   ├── education.tsx    # Education timeline
│   ├── experience.tsx   # Experience timeline
│   ├── time-line.tsx    # Reusable timeline component
│   ├── section-heading.tsx
│   ├── language-switcher.tsx
│   └── mode-toggle.tsx  # Dark/light theme toggle
├── pages/
│   ├── Home.tsx         # Main landing page
│   ├── Contact.tsx      # Contact form with reCAPTCHA
│   └── Projects.tsx     # Projects showcase
├── layouts/
│   └── BaseLayout.tsx   # Shared layout wrapper
├── lib/
│   ├── i18n.ts          # i18next configuration
│   └── utils.ts         # Utility functions (cn for class merging)
├── locales/
│   ├── en/translation.json
│   └── pl/translation.json
├── providers/
│   └── theme-provider.tsx
└── hooks/               # Custom React hooks
```

### Key Architectural Patterns

**Internationalization (i18n)**
- Default language: Polish (`pl`)
- Supported languages: English (`en`), Polish (`pl`)
- Language detection: localStorage → browser navigator
- Translation files: `src/locales/{lang}/translation.json`
- Usage: `const { t } = useTranslation()` hook

**Theming**
- Default theme: dark
- Storage key: `ui-theme` in localStorage
- Theme provider wraps entire app in `main.tsx`
- CSS variables defined in TailwindCSS config

**Routing**
- All routes wrapped in `<BaseLayout />` for consistent layout
- Routes lazy-loaded for code-splitting
- Loading fallback: animated "Loading..." text
- Current routes: `/` (home), `/contact`, `/projects`

**UI Component Library**
- Primary: Magic UI components from `src/components/magicui/` (blur-fade, border-beam, dock, particles, interactive-hover-button)
- Forms: shadcn/ui components from `src/components/ui/` (button, input, textarea, card, form, etc.)
- Config: `components.json` for shadcn/ui (New York style, zinc base color)
- Path alias: `@/` points to `src/`
- Icons: lucide-react

**Contact Form**
- Google reCAPTCHA v3 integration
- reCAPTCHA script loaded/cleaned up in useEffect
- Form validation: Zod schemas with react-hook-form
- API endpoint: `${VITE_APP_API_URL}/api/contact`
- Success state: displays confirmation message

## Environment Variables

Required environment variables (see `.env.example`):

```bash
VITE_APP_API_URL=http://127.0.0.1:8000
VITE_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

Access in code: `import.meta.env.VITE_APP_*`

## Docker Deployment

Build and deployment uses multi-stage Dockerfile:
1. Build stage: Node.js 18 Alpine, runs `npm run build`
2. Runtime stage: Nginx Alpine serving static files from `/usr/share/nginx/html`

Docker Compose with Traefik reverse proxy:
- Service name: `app`
- Network: external `traefik` network
- Build args: `VITE_APP_API_URL`, `VITE_APP_RECAPTCHA_SITE_KEY`
- Label: `TRAEFIK_HOST` for routing

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## Code Style

- ESLint: Flat config format (`eslint.config.js`)
- Prettier: Config in `.prettierrc`
- TypeScript: Strict mode with separate configs for app and node

## Adding New Components

**Magic UI Components** (primary UI library):
- Add visual/animated components to `src/components/magicui/`
- Used for animations, effects, and interactive elements

**shadcn/ui Components** (for forms):
- When adding shadcn/ui form components, ensure `components.json` configuration is preserved:
  - Style: `new-york`
  - Base color: `zinc`
  - CSS variables: enabled
  - Icon library: `lucide`

## Translation Updates

When adding translatable content:
1. Add keys to both `src/locales/en/translation.json` and `src/locales/pl/translation.json`
2. Use `t('key.path')` for simple strings
3. Use `<Trans i18nKey="key" components={{ br: <br /> }} />` for JSX content

## Form Validation

Forms use Zod schemas with i18n validation messages:
```tsx
const schema = z.object({
  field: z.string().nonempty({ message: t('validation.required') })
});
```

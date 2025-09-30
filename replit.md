# ThinkCraft Lab - Interactive Landing Page

## Overview

ThinkCraft Lab is an interactive landing page for a design and 3D printing company. The application showcases the company's services through a highly animated, scroll-driven experience featuring editorial Swiss typography, GSAP animations, and modern UI components. The site emphasizes visual storytelling with preloaders, parallax effects, staggered animations, and color transitions to create an engaging user journey.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR support
- React Router (wouter) for lightweight client-side routing
- TanStack Query for data fetching and state management

**UI Component System**
- Shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theming (light/dark mode support)
- Custom animations and transitions using CSS and GSAP

**Animation Strategy**
- GSAP (GreenSock Animation Platform) loaded via CDN for performance
- ScrollTrigger plugin for scroll-based animations
- Custom React hook (`useGSAP`) for managing GSAP lifecycle and cleanup
- Scroll-driven parallax effects with directional text movement
- Staggered entrance animations and color transitions

**Key Component Patterns**
- Preloader with fade-in animations and loading progress
- Floating navigation that hides/shows on scroll direction
- Hero section with alternating directional text animations
- Work showcase carousel with Embla Carousel
- Text reveal animations triggered on scroll position
- Staggered word animations with bidirectional movement
- Company info with animated counters
- Scroll progress indicator

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Vite middleware integration for development
- Custom logging middleware for API request tracking
- Static file serving for production builds

**Development Setup**
- Development mode runs Express with Vite middleware
- Production mode serves pre-built static assets
- Hot Module Replacement (HMR) in development
- Custom error handling and logging

**Data Layer**
- In-memory storage implementation (`MemStorage`) for development
- Interface-based storage pattern (`IStorage`) for easy database migration
- User management with CRUD operations
- UUID-based entity identification

### Database Schema

**PostgreSQL with Drizzle ORM**
- Drizzle ORM for type-safe database queries
- Schema defined in shared directory for client/server access
- User table with username/password authentication structure
- Zod schema validation using drizzle-zod integration

**Current Schema**
```typescript
users table:
- id (varchar, primary key, auto-generated UUID)
- username (text, unique, not null)
- password (text, not null)
```

**Migration Strategy**
- Drizzle Kit for schema migrations
- Migrations stored in `/migrations` directory
- Push-based deployment with `db:push` command

### External Dependencies

**Database & ORM**
- PostgreSQL via Neon serverless driver (`@neondatabase/serverless`)
- Drizzle ORM for queries and schema management
- Drizzle Kit for migrations

**Animation & Interaction**
- GSAP 3.12.2 (loaded via CDN)
- ScrollTrigger plugin for scroll-based animations
- Embla Carousel for image carousels

**UI Framework & Components**
- Radix UI primitives (26+ component primitives)
- Tailwind CSS with custom configuration
- Shadcn/ui component architecture
- React Hook Form with Zod resolvers for form validation

**Development Tools**
- TypeScript for type safety
- Vite with React plugin
- ESBuild for production server bundling
- Replit-specific plugins (cartographer, dev banner, runtime error overlay)

**Styling & Fonts**
- Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)
- Font Awesome 6.4.0 for icons
- PostCSS with Tailwind and Autoprefixer

**State Management**
- TanStack Query for server state
- React Context for UI state (toast notifications, tooltips)
- Custom hooks for mobile detection and GSAP integration

**Path Aliases**
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`
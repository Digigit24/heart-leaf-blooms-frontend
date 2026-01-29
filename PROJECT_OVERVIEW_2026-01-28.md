# Project Overview & Tech Stack Documentation
**Date:** 2026-01-28
**Project:** Heart Leaf Blooms

## 1. Core Framework & Build Tool
| Technology | version | Purpose | Why We Use It |
| :--- | :--- | :--- | :--- |
| **React** | v19 | UI Library | The massive ecosystem and component-based architecture allow for building scalable, interactive user interfaces efficiently. V19 brings the latest performance improvements. |
| **Vite** | v7 | Build Tool / Bundler | Replaces Webpack. It provides lightning-fast server start times and Hot Module Replacement (HMR), significantly speeding up the development workflow. |

## 2. State Management
| Technology | Purpose | Why We Use It |
| :--- | :--- | :--- |
| **TanStack Query (React Query)** | Server State Management | Used for fetching, caching, synchronizing, and updating server state. It eliminates the need for manual `useEffect` data fetching logic and handling loading/error states manually, providing out-of-the-box caching and background updates. |
| **Zustand** | Global Client State | Used for managing global application state like **User Authentication** (`auth.store`) and **Wishlist** (`wishlist.store`). It is much lighter and simpler than Redux, with less boilerplate. |

## 3. Styling & UI
| Technology | Purpose | Why We Use It |
| :--- | :--- | :--- |
| **Tailwind CSS** | CSS Framework | A utility-first CSS framework (v4) that allows us to build custom designs directly in the markup without leaving the HTML. It ensures consistency and speeds up styling. |
| **Lucide React** | Icons | Provides a clean, consistent, and lightweight set of SVG icons (e.g., `Plus`, `Edit`, `Trash2`) that are easily customizable via props. |
| **clsx & tailwind-merge** | Class Utility | Used to conditionally join class names and handle Tailwind class conflicts. Essential for creating reusable components that accept custom `className` props without breaking styles. |

## 4. Animations & User Experience
**Philosophy:** We aim for a "premium" feel where interactions are smooth and not jarring.
| Technology | Usage Examples | Why We Use It |
| :--- | :--- | :--- |
| **Framer Motion** | • Page Transitions<br>• Modal Animations (Popups)<br>• List Reordering (Manage Banners)<br>• Hover Effects | It provides a declarative, production-ready animation library for React. We use it to create complex animations (like `AnimatePresence` for unmounting components) that would be very difficult with pure CSS. |
| **Lenis** | Smooth Scrolling | Standard browser scrolling can feel "choppy". Lenis standardizes the scroll experience across devices, giving the site a luxurious, fluid feel ("momentum scrolling"). |
| **Lottie React** | Complex Vector Animations | Used for high-quality, scalable vector animations (like the `LeafLoader` or splash screens) that are exported from After Effects as JSON. |

## 5. Routing & Navigation
| Technology | Purpose | Why We Use It |
| :--- | :--- | :--- |
| **React Router DOM** | Client-Side Routing | Enables Single Page Application (SPA) behavior. It manages navigation (e.g., `/admin/banners`) without reloading the page, preserving state and providing a faster user experience. |
| **Route Guards** | Security | We implement `routeGuards.jsx` to protect specific routes (like Admin panels) ensuring only authorized users can access them. |

## 6. API & Network
| Technology | Purpose | Why We Use It |
| :--- | :--- | :--- |
| **Axios** | HTTP Client | Used for making requests to the backend. It offers better ergonomics than `fetch` (automatic JSON parsing, interceptors for auth tokens) and better error handling. |
| **React Hot Toast** | Notifications | Provides simple, lightweight, and customizable toast notifications (Success/Error messages) that don't block user interaction. |

---

## Technical Context & Architecture
**Entry Point:** `src/app/main.jsx`
- Initializes the React app.
- Loads Global Styles (`src/styles/globals.css`).

**App Configuration (`App.jsx`):**
- **Initialization:** Checks for existing user sessions in `localStorage` and restores the user via `authApi.getUserProfile`.
- **Loader:** Displays a `LeafLoader` (min 2.5s) to ensure assets are ready and to provide a polished opening experience.
- **Provider Wrapper:** The app is wrapped in multiple context providers:
  1. `ConfigProvider` (App-wide settings)
  2. `ThemeProvider` (Design tokens)
  3. `QueryProvider` (API Caching layer)
  4. `SmoothScroll` (Lenis implementation)

**Directory Structure Highlights:**
- `src/features`: Contains domain-specific logic (e.g., `admin`, `auth`, `vendors`). This keeps the code modular and scalable.
- `src/components`: Reusable UI elements (buttons, inputs) and layout components (Footer, Sidebar).
- `src/app/store`: Zustand stores for global state.

## Summary
This stack is chosen to balance **Developer Experience (DX)** with **User Experience (UX)**. We prioritize speed (Vite), maintainability (React + Tailwind), and a premium feel (Framer Motion + Lenis), backed by robust data handling (TanStack Query).

# TechZone – Frontend
[![Live Demo](https://img.shields.io/badge/live-demo-brightgreen)](https://techzone-web.netlify.app)

## Project Overview
TechZone is my final frontend-specialization project: a tech products comparator with integrated e‑commerce features. The SPA (React) lets users search and filter tech products, compare multiple items side‑by‑side, add products to a shopping cart, and complete a simple checkout flow. The application demonstrates debounced search, category filters, comparison UI, cart persistence, and dynamic data fetching via REST APIs.

The project is structured using a modular component-based architecture, with a clear separation between UI components, page-level views and an API abstraction layer. Global state management is handled through React Context to ensure scalability and avoid prop drilling.

> ## Backend note
The backend API is deployed to Render. Render services enter sleep mode after ~15 minutes of inactivity; when the API is cold, expect a ~20–30 second delay for the first request while the service wakes up.

Backend repo: https://github.com/willymariino/progetto-finale-spec-frontend-back

## Features
- Product catalog with search, category filters and pagination
- Persistent wishlist with localStorage synchronization
- Side‑by‑side product comparison (specs, price, images)
- Debounced search to reduce API requests
- Product detail pages with full specifications and images
- Shopping cart: add/remove items, update quantities.
- Responsive design for desktop and mobile
- Loading and error states for API interactions

## Tech Stack
- **React** 19.0.0
- **Vite** 6.2.0
- **Axios** for HTTP requests
- **React** Context API for global state management (cart, compare selections)
- **Node.js / Express** (REST API backend)
- **CSS3** for styling
- **Netlify** — frontend deployment
- **Render** — backend deployment

## Live Demo
[TechZone web](https://techzone-web.netlify.app)

## How to Run Locally

1. Clone both repositories:
   - Frontend: this repository
   - Backend: https://github.com/willymariino/progetto-finale-spec-frontend-back

2. Install dependencies in both folders:
   npm install

3. Configure environment variables: (frontend only)

   Frontend:
   - Copy `.env.example` to `.env`
   - Set:
     VITE_API_URL=http://localhost:3001

4. Start the backend:
   npm run dev

5. Start the frontend:
   npm run dev

6. Open the app in your browser:
   http://localhost:5173

## Folder Structure
```
techzone-frontend/
├── public/
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/       
│   ├── hooks/           
│   ├── layouts/
│   ├── pages/           
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
```


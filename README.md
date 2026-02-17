# Tech Product Comparator & Ecommerce — Final Individual Project

## Project Overview
This is an individual final project: a frontend application that combines a tech product comparator with ecommerce features. Users can search and filter tech products, compare multiple products side-by-side, add items to a shopping cart, and complete a checkout (stubbed or integrated with a backend). The UI is built with modern React patterns and includes debounced search, category filtering, comparison view, and cart management.

## Features
- Responsive product listing with search and category filters
- Debounced search input to reduce API calls
- Compare multiple products side-by-side (specs, price, images)
- Add/remove products to/from a persistent cart
- Cart summary and simple checkout flow (mock or integrated)
- Product details page with full specifications and related items
- Error handling and loading states
- Clean component structure and reusable UI elements

## Tech stack
- Frontend: React (functional components + hooks)
- Styling: CSS / CSS modules / styled-components (adjust to your choice)
- HTTP: fetch or axios
- State: React useState / useReducer / Context API (small app) — debounce implemented for search input
- Build: Vite or Create React App (adjust to your setup)
- Optional: React Router for client-side routing

## Project structure (example)
- src/
  - components/ (ProductCard, ProductList, ComparisonTable, SearchBar, Cart, Checkout)
  - pages/ (Home, ProductDetails, Comparison, Cart, Checkout)
  - hooks/ (useDebounce, useCart)
  - services/ (api client)
  - context/ (CartContext)
  - styles/
  - assets/

## Key components & responsibilities
- SearchBar
  - Debounced input to update the query state (e.g., via useDebounce hook)
  - Emits the current query and category selection
- ProductList
  - Fetches and displays paginated products
  - Applies search and category filters
- ProductCard
  - Displays thumbnail, short specs, price, and actions (compare, add to cart)
- ComparisonTable
  - Shows selected products side-by-side for spec comparison
- Cart & Checkout
  - Cart manages selected items, quantities, and subtotal
  - Checkout implements order submission flow (mock or real)

## State & data flow
- Local UI state: useState for UI interactions (selected items, modal visibility)
- Shared state: Context or a light global store for cart and comparison selections
- Search behavior:
  - query: React state that represents the current search filter
  - category: React state that represents selected category
  - Debounce pattern: a debounced value (queryValue / categoryValue) is passed to API calls to avoid firing requests on every keystroke

## Example API contract (frontend expectations)
- GET /api/products?query={q}&category={cat}&page={n}
  - Response: { items: Product[], total: number, page: number, perPage: number }
  - Product: { id, name, brand, price, images: string[], specs: { key: value }, category }
- GET /api/products/{id}
  - Response: Product
- POST /api/cart
  - Body: { productId, quantity }
  - Response: { cart }
- GET /api/cart
  - Response: { cart }
- POST /api/checkout
  - Body: { cart, customerInfo }
  - Response: { orderId, status }

Adjust endpoints and payloads to match your backend.

## Environment variables
Example .env (adapt names to your tooling):
- VITE_API_BASE_URL=https://api.example.com
- REACT_APP_API_BASE_URL=https://api.example.com

## Installation & local development
1. Clone repository
2. Install dependencies
   - npm install
   - or yarn install
3. Create .env file with API base URL
4. Start dev server
   - npm run dev
   - or npm start

## Scripts (example)
- npm run dev — start development server
- npm run build — create production build
- npm run preview — preview production build locally
- npm test — run tests (if present)
- npm run lint — lint code

## Testing & quality
- Write unit tests for core logic (search debounce, cart reducer)
- Component tests for key UI flows (add to cart, compare, checkout step)
- Use linting and a formatter (ESLint + Prettier)

## Deployment
- Build static assets: npm run build
- Host the build on static hosting (Netlify, Vercel, GitHub Pages) or deploy via your chosen infrastructure
- Ensure environment variables point to production API endpoints

## UX notes & best practices
- Use debounced search to avoid overloading API; show a loading spinner for search results
- Persist cart state to localStorage for session continuity
- Provide clear comparison controls (select/unselect products) and a visible comparison badge
- Make add-to-cart feedback prominent (toast or mini cart preview)

## Contribution
- Keep components small and focused
- Prefer hooks for reusable logic (useDebounce, useCart)
- Document component props and expected data shapes

## License & acknowledgments
- Add your chosen license (MIT, Apache-2.0, etc.)
- Acknowledge libraries and resources used (icons, design systems)

## Contact
For questions about this frontend, refer to the project owner or repo issues. Adjust API details and scripts to match your precise backend and tooling.

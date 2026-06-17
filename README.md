# Store Rating Frontend

React 19 + TypeScript frontend for the Store Rating Management System.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- React Router DOM
- Axios
- React Hook Form
- Zod (Validation)
- Lucide React (Icons)
- Sonner (Toast Notifications)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
VITE_API_URL=http://localhost:8000
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
npm run preview
```

## Features

### Authentication
- Login with email/password
- User registration with role selection (USER, STORE_OWNER)
- JWT token-based authentication
- Protected routes with role-based access control

### User Roles
- **ADMIN**: Full access to dashboard, user management, store management
- **USER**: Browse stores, submit ratings, view profile
- **STORE_OWNER**: View store statistics, manage own stores

### Pages

#### Auth Pages
- Login
- Register

#### Admin Pages
- Dashboard (Total users, stores, ratings statistics)
- Users (List, search, filter, delete users)
- Stores (List, search, filter, delete stores)
- Profile

#### User Pages
- Dashboard (Browse stores, submit ratings)
- Profile

#### Store Owner Pages
- Dashboard (Store statistics, rating breakdown)
- Profile

### UI Components
- Reusable Button, Input, Modal components
- Pagination component
- Loading skeletons
- Empty states
- Star rating modal
- Stat cards for dashboard
- Responsive sidebar layout

### State Management
- Zustand stores for auth, users, stores, ratings, dashboard
- Persist middleware for auth state
- Optimistic updates

### Form Validation
- React Hook Form with Zod schemas
- Client-side validation for registration
- Password strength requirements

## Project Structure

```
src/
├── api/              # API layer (axios, authApi, userApi, etc.)
├── components/       # Reusable components
│   ├── common/       # Button, Input, Modal, etc.
│   ├── dashboard/    # StatCard, charts
│   └── modals/       # RatingModal
├── layouts/          # Page layouts (SidebarLayout)
├── pages/            # Page components
│   ├── auth/         # Login, Register
│   ├── admin/        # Admin pages
│   ├── user/         # User pages
│   └── owner/        # Store owner pages
├── routes/           # Protected routes
├── store/            # Zustand stores
├── types/            # TypeScript types
├── utils/            # Utility functions
├── App.tsx           # Main app with routing
└── main.tsx          # Entry point
```

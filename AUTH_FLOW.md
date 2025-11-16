# Movie App - Protected Routes & Authentication Flow

## Overview

The application implements a complete authentication flow with protected routes. All protected pages (movie list, create movie, edit movie) require a valid authentication token in localStorage.

## Folder Structure

```
app/
  ├── page.tsx                 # Entry point (Login/Redirect)
  ├── layout.tsx               # Root layout
  ├── globals.css
  └── movie/
      ├── page.tsx             # Movie list (Protected)
      ├── new/
      │   └── page.tsx         # Create movie (Protected)
      └── edit/
          └── page.tsx         # Edit movie (Protected)

components/
  ├── ProtectedRoute.tsx       # Protected Route Wrapper Component
  ├── shared/
  │   ├── Button.tsx
  │   └── Input.tsx
  └── ui/
      ├── Login.tsx            # Login form
      ├── MovieCard.tsx
      ├── MoviesGrid.tsx
      ├── Pagination.tsx
      ├── Navbar.tsx
      └── ...

composables/
  ├── useStorage.ts            # localStorage management
  └── useApi.ts                # API calls

```

## Authentication Flow

### 1. **Entry Point** (`app/page.tsx`)

-   First page user sees when opening the app
-   Checks if user has a valid `authToken` in localStorage
-   If token exists → Redirects to `/movie`
-   If no token → Shows Login form

### 2. **Login Component** (`components/ui/Login.tsx`)

-   Email & Password validation
-   "Remember Me" checkbox option
-   On successful login:
    -   Calls `authLogin()` API
    -   Saves token to localStorage via `saveToken()`
    -   Redirects to `/movie` page

### 3. **Protected Route Wrapper** (`components/ProtectedRoute.tsx`)

```typescript
- Checks if authToken exists in localStorage
- If token exists → Renders protected content
- If no token → Redirects to home page (Login)
- Shows nothing while checking (prevents flash of content)
```

### 4. **Protected Pages**

All these pages are wrapped with `<ProtectedRoute>`:

-   `/movie` - View all movies
-   `/movie/new` - Create new movie
-   `/movie/edit?id=123` - Edit existing movie

## useStorage Functions

```typescript
// Token Management
getToken() // Returns authToken from localStorage or null
saveToken(token) // Saves authToken to localStorage
deleteToken() // Removes authToken from localStorage

// Movies Management
getMovies() // Returns cached movies from localStorage
saveMovies(movies) // Saves movies array to localStorage
getMovieById(id) // Returns specific movie by ID from localStorage
```

## Page Structure Pattern

**Protected Pages Follow This Pattern:**

```typescript
function PageContentComponent() {
    // Component logic here
    return <PageUI />
}

export default function PageComponent() {
    return (
        <ProtectedRoute>
            <PageContentComponent />
        </ProtectedRoute>
    )
}
```

This separates concerns:

-   ProtectedRoute handles authentication
-   PageContent handles business logic and rendering

## Security Features

1. **Token-based Authentication**

    - All API requests use authToken from localStorage
    - Protected routes check for token presence

2. **Route Protection**

    - Cannot access `/movie`, `/movie/new`, or `/movie/edit` without token
    - Invalid token automatically redirects to login

3. **Logout Logic**
    - Token can be removed using `deleteToken()` from useStorage
    - User would then be redirected to login page

## Data Persistence

-   **authToken** - Stored in localStorage, persists across sessions
-   **movies** - Cached in localStorage for offline access
-   **single movie edit data** - Retrieved via `getMovieById()` from localStorage

## Usage Example

To add logout functionality:

```typescript
const { deleteToken } = useStorage()
const router = useRouter()

const handleLogout = () => {
    deleteToken()
    router.push("/")
}
```

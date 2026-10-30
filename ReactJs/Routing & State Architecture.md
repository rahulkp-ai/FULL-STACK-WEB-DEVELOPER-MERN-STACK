## Routing & State Architecture

---

- **Topic:** Routing & State Architecture

- **Instructor: RAHUL KP**

## 1. React Router (Installation & Nested Routing)

In a Single Page Application (SPA), routing is handled entirely on the client side. **React Router** is the industry-standard library that enables navigation between different views without triggering a full browser reload.

### Installation & Setup

- **Installation:** Run `npm install react-router-dom` in your project terminal.
- **Core Components:**
- `<BrowserRouter>`: Uses the HTML5 history API to keep your UI in sync with the URL.
- `<Routes>` & `<Route>`: Matches the current URL path to render specific components.
- `<Link>` & `<NavLink>`: Declarative alternatives to HTML anchor (`<a>`) tags that prevent full page refreshes.

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Nested Routing & Layouts

- **What is Nested Routing?** Rendering child routes inside a parent component layout (e.g., a dashboard layout with a persistent sidebar where only the main content area changes).
- **The `<Outlet/>` Component:** Used in parent routes as a placeholder where child route elements are rendered.
- **Implementation Example:**

```jsx
import { Routes, Route, Outlet, Link } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <aside>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </aside>
      <main>
        {/* Outlet renders whichever child route matches the active URL */}
        <Outlet />
      </main>
    </div>
  );
}

// Router configuration
<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route path="profile" element={<UserProfile />} />
    <Route path="settings" element={<UserSettings />} />
  </Route>
</Routes>;
```

---

## 2. Redux (Concepts, Redux API, & Provider Component)

As applications grow complex, managing shared global state across deeply nested component trees via props ("prop drilling") becomes unmaintainable. **Redux** provides a predictable state container.

### Core Concepts of Redux

1. **Single Source of Truth:** The entire global state of your application is stored in an object tree within a single central _Store_.
2. **State is Read-Only:** The only way to change the state is to emit an **Action**—an object describing what happened.
3. **Changes are Made with Pure Functions (Reducers):** To specify how the state tree is transformed by actions, you write pure **Reducers** (functions that take the previous state and an action, and return the next state).

### The Redux API & Modern Redux (Redux Toolkit)

- **Core API Methods:**
- `createStore()` / `configureStore()`: Initializes the global store.
- `dispatch(action)`: Sends an action object to the store to trigger a state update.
- `getState()`: Retrieves the current state tree.

- **Modern Best Practice (Redux Toolkit - RTK):** Modern Redux uses Redux Toolkit (`configureStore`, `createSlice`), which drastically cuts down boilerplate code, automatically handles immutability via Immer, and includes built-in async thunk support.

### The `<Provider>` Component (`react-redux`)

- **What it does:** The `<Provider>` component makes the Redux `store` available to any nested components that need to access it or dispatch actions, using React's internal **Context API**.
- **Usage:** It wraps the root component of your application:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

---

## 3. State Architecture with Flux

Before Redux, Meta developed **Flux** as an architectural design pattern rather than a strict library. Flux solved the scaling bugs of complex MVC (Model-View-Controller) frameworks in large applications.

### The Core Principle: Unidirectional Data Flow

Unlike two-way data binding, data in Flux flows in a strict, single-direction circle. This makes state mutations predictable and easy to debug.

### The Four Key Participants in Flux

1. **Action:** A payload of information sent from the application (user interactions, API responses) to the dispatcher.
2. **Dispatcher:** A central registry and hub that receives actions and broadcasts payloads to registered callbacks (stores). It acts as a strict dependency manager.
3. **Store:** Contains the application's actual state and business logic. Stores register callbacks with the dispatcher and emit change events whenever their internal state updates.
4. **View (React Components):** Listen to store change events, pull updated state data, re-render the UI, and dispatch new actions back into the system when users interact with them.

### The Flux Data Cycle (Step-by-Step)

```text
User Action ──► Action Creator ──► Dispatcher ──► Store ──► View (Re-render)
     ▲                                                              │
     └──────────────────────────────────────────────────────────────┘

```

1. A user interacts with a **View** (e.g., clicks a "Buy" button).
2. The View fires an **Action** through the **Dispatcher**.
3. The **Dispatcher** broadcasts the action to all registered **Stores**.
4. The **Store** processes the action, updates its internal state, and emits a "change" event.
5. The **View** listens for the change event, pulls the new state from the store, and updates the UI.

### Summary: Flux vs. Redux

- **Flux** is an _architecture_ with multiple independent stores and a central dispatcher.
- **Redux** was directly inspired by Flux but streamlined the pattern down to a _single store_ and _pure reducer functions_, effectively eliminating the dispatcher boilerplate.

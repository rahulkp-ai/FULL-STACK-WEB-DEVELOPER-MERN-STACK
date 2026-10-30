## State & Props Management

---

- **Topic:** State & Props Management

- **Instructor: RAHUL KP**

## 1. Using Props, Default Props & Props Validation

### What are Props?

- **Definition:** Short for **properties**, props are read-only, immutable objects passed down from a parent component to a child component.
- **Core Rule (Unidirectional Data Flow):** Props flow strictly **downward**. Child components cannot modify their own props directly; any changes must be orchestrated by the parent via callback functions.

### Using Props in Function Components

- Props are received as the first argument to a function component. Destructuring makes accessing them clean and readable:

```jsx
// Destructuring props directly in the parameter list
function UserProfile({ username, role, avatarUrl }) {
  return (
    <div className="profile-card">
      <img src={avatarUrl} alt={`${username}'s avatar`} />
      <h3>{username}</h3>
      <span>{role}</span>
    </div>
  );
}
```

### Default Props

- Used to provide fallback values if a parent component omits a specific prop.
- **Modern ES6 Default Parameters Approach (Recommended):**

```jsx
function Button({ label = "Click Me", variant = "primary", onClick }) {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}
```

- **Legacy `defaultProps` property:** Historically attached directly to the component function (e.g., `Button.defaultProps = { variant: 'primary' }`), though modern ES6 default parameters are preferred in function components.

### Props Validation (`PropTypes` & TypeScript)

- **Runtime Validation (`prop-types` package):** Historically used in plain JavaScript to enforce prop types and catch bugs early during development:

```javascript
import PropTypes from "prop-types";

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  inStock: PropTypes.bool,
};
```

- **Compile-Time Safety (TypeScript):** The modern industry standard for React development, replacing runtime prop validation with static type definitions (`interface` or `type`).

---

## 2. State Definition & State Management API

### What is State?

- **Definition:** Unlike props (which are passed from outside), **state** is local, private data managed _inside_ a component.
- **Re-render Trigger:** Whenever a component's state changes, React re-evaluates the component, runs its function body, compares the resulting Virtual DOM against the previous snapshot, and updates the browser DOM.

### The State Management API (`useState`)

- Imported from React, `useState` initializes local state and returns an array containing two elements: the **current state value** and a **state-setter function**.

```jsx
import { useState } from "react";

function Counter() {
  // [currentState, setterFunction] = useState(initialValue);
  const countState = useState(0);
  const count = countState[0];
  const setCount = countState[1];

  // Clean destructuring syntax:
  // const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Important State Principles

1. **Never mutate state directly:** Always use the state setter function (e.g., `setCount(count + 1)` instead of `count = count + 1`). Direct mutation bypasses React's reconciliation engine and prevents UI updates.
2. **State updates are asynchronous:** React batches multiple state updates for performance optimization. When the new state depends on the previous state, always use a **functional update callback**:

```jsx
// Correct: guarantees access to the latest state snapshot
setCount((prevCount) => prevCount + 1);
```

---

## 3. React Hooks

Introduced in React 16.8, **Hooks** are functions that let function components hook into React state, lifecycle methods, and context without writing classes.

### Core Built-in Hooks

- **`useState`:** Manages local component state.
- **`useEffect`:** Handles side effects (data fetching, subscriptions, manual DOM mutations, timers).
- **`useContext`:** Consumes React Context directly without wrapping components in nested consumer tags.
- **`useRef`:** Persists a mutable value across component renders without triggering re-renders, or references actual DOM elements directly (`useRef(null)`).
- **`useMemo` & `useCallback`:** Performance optimization hooks used to memoize expensive calculation results and callback functions, preventing unnecessary child re-renders.

---

## 4. Component Life Cycle API

Every React component goes through a distinct lifecycle: **Mounting** (birth/insertion into the DOM), **Updating** (growth/re-rendering due to state/prop changes), and **Unmounting** (death/removal from the DOM).

### Mapping Class Lifecycles to Hooks (`useEffect`)

In class components, lifecycle methods were handled explicitly. In modern function components, **`useEffect`** unifies all lifecycle phases into a single declarative API based on **dependency arrays**.

| Lifecycle Phase                                | Class Component Equivalent                 | Functional Component Hook (`useEffect`)                                                            |
| ---------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **Mounting** (Component appears on screen)     | `componentDidMount()`                      | `useEffect(() => { /* code */ }, []);` _(Empty dependency array runs once on mount)_               |
| **Updating** (Props or state change)           | `componentDidUpdate(prevProps, prevState)` | `useEffect(() => { /* code */ }, [prop, state]);` _(Runs on mount + whenever dependencies change)_ |
| **Unmounting** (Component removed from screen) | `componentWillUnmount()`                   | Returning a cleanup function inside `useEffect`: <br>                                              |

<br>`useEffect(() => { return () => { /* cleanup */ } }, []);` |

### Example: `useEffect` Cleanup (Unmount & Subscriptions)

```jsx
import { useState, useEffect } from "react";

function WindowTracker() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Setup side effect (Mount)
    window.addEventListener("resize", handleResize);

    // Cleanup side effect (Unmount)
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty array ensures this runs strictly on mount and unmount

  return <p>Current Window Width: {windowWidth}px</p>;
}
```

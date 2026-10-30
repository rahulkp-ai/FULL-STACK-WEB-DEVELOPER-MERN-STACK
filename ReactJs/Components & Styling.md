## Components & Styling

---

- **Topic:** Architecture & Core Concepts

- **Instructor: RAHUL KP**

## 1. Function vs Class Components

Components are the building blocks of any React application. They split the UI into independent, reusable pieces. Historically, there are two ways to write components: **Function Components** and **Class Components**.

### Function Components (The Modern Standard)

- **Syntax:** Written as standard JavaScript functions (or arrow functions) that accept `props` as an argument and return JSX.
- **State Management:** Prior to 2019 (React 16.8), function components were strictly "stateless" or "dumb" presentational components. With the introduction of **React Hooks** (`useState`, `useEffect`), function components can now handle full state and side-effects.
- **Advantages:**
- Minimal boilerplate and cleaner, more readable code.
- Easier to test and optimize.
- No binding required for `this` (which often caused bugs in classes).

```jsx
// Modern Function Component with Hooks
import React, { useState } from "react";

function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Class Components (The Legacy Standard)

- **Syntax:** ES6 classes that extend `React.Component` and must include a `render()` method returning JSX.
- **State Management:** Handled via a local `this.state` object and updated using `this.setState()`.
- **Lifecycle Methods:** Managed through explicit lifecycle hooks such as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.
- **Disadvantages:** Verbose syntax, complex `this` keyword scoping, and harder to reuse stateful logic compared to custom hooks.

```jsx
// Legacy Class Component Equivalent
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: props.initialCount };
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}
```

### Comparison Summary

| Feature            | Function Components                   | Class Components                           |
| ------------------ | ------------------------------------- | ------------------------------------------ |
| **Primary Status** | Current industry standard             | Legacy / Maintenance mode                  |
| **Syntax**         | Concise JavaScript functions          | ES6 Classes extending `React.Component`    |
| **State**          | Managed via Hooks (`useState`)        | Managed via `this.state` / `this.setState` |
| **Lifecycle**      | Handled declaratively via `useEffect` | Handled imperatively via lifecycle methods |
| **Performance**    | Slightly smaller bundle footprint     | Overhead from class instance creation      |

---

## 2. Splitting, Nesting & Component Collections

As applications grow, organizing components logically prevents codebases from becoming monolithic and unmaintainable.

### Component Splitting & Modularization

- **Single Responsibility Principle (SRP):** Each component should ideally do _one_ thing well. If a component grows too large or handles multiple distinct UI concerns, it should be split into smaller sub-components.
- **Presentational vs. Container Pattern (Mental Model):**
- _Presentational Components:_ Focus entirely on _how things look_ (UI, layout, styling via props).
- _Container Components:_ Focus on _how things work_ (data fetching, state management, business logic).

### Nesting & Data Flow

- **Parent-Child Hierarchy:** Components can render other components inside their JSX tree.
- **Unidirectional Data Flow:** Data flows **down** the tree from parent to child via `props`. Children cannot directly mutate parent props; instead, parents pass down callback functions to allow children to communicate upward (Inverse Data Flow).
- **The Children Prop (`props.children`):** Enables component composition by allowing parent wrappers to render arbitrary inner content passed between their opening and closing tags.

```jsx
function Card({ children }) {
  return <div className="card-border">{children}</div>;
}

// Usage
<Card>
  <h2>Title</h2>
  <p>This content is injected via props.children</p>
</Card>;
```

### Directory Structures & Collections

- **Feature-Based Organization (Recommended for Scalability):** Grouping files by domain/feature rather than technical type:

```text
src/
├── features/
│   ├── auth/
│   │   ├── components/ (LoginForm, SignupForm)
│   │   ├── hooks/ (useAuth)
│   │   └── authService.js
│   └── dashboard/
└── shared/
    ├── components/ (Button, Modal)
    └── utils/

```

---

## 3. Styling Options in React

React does not enforce a strict styling methodology, offering flexibility across multiple approaches.

### 1. Global CSS Stylesheets (`.css`)

- **How it works:** Traditional CSS files imported directly into components (`import './Button.css'`).
- **Pros:** Familiar workflow for developers transitioning from vanilla web development.
- **Cons:** Styles are **globally scoped**. Class name collisions can easily occur across large projects unless strict naming conventions like BEM (Block, Element, Modifier) are rigorously enforced.

### 2. Inline Styling

- **How it works:** Passed directly to elements as JavaScript objects using camelCased property names.

```jsx
const boxStyle = {
  backgroundColor: "#3b82f6",
  padding: "16px",
  borderRadius: "8px",
};

function Box() {
  return <div style={boxStyle}>Styled Content</div>;
}
```

- **Pros:** Scoped locally to the element; highly dynamic (easily driven by component props or state).
- **Cons:** Lacks support for true CSS pseudo-classes (`:hover`, `:focus`), media queries, or keyframe animations without extra helper logic.

### 3. CSS Modules (`.module.css`)

- **How it works:** CSS files named with the `.module.css` extension. The build tool (Vite/Webpack) automatically generates unique, hashed class names to prevent global namespace pollution.
- **Usage Example:**

```css
/* Button.module.css */
.errorButton {
  background-color: red;
  color: white;
}
```

```jsx
/* Button.jsx */
import styles from "./Button.module.css";

function SubmitButton() {
  return <button className={styles.errorButton}>Delete</button>;
}
```

- **Pros:** Local scoping by default; full access to native CSS features (pseudo-classes, media queries, variables) without class name collisions.
- **Cons:** Requires slight syntax overhead (`styles.className`) and configuration setup.

## Architecture & Core Concepts

---

- **Topic:** Architecture & Core Concepts

- **Instructor: RAHUL KP**

## 1. Virtual DOM & Application Workflow

### The Problem with the Real DOM

- **Direct Manipulation Cost:** Updating the Document Object Model (DOM) directly via vanilla JavaScript forces the browser to recalculate layouts, reflow styles, and repaint pixels. Doing this frequently degrades application performance and causes janky frame drops.
- **The React Solution:** Instead of talking directly to the browser DOM on every state change, React maintains a lightweight in-memory representation known as the **Virtual DOM**.

### How the Virtual DOM Works (Reconciliation & Diffing)

1. **Initial Render:** When an application loads, React creates a complete Virtual DOM tree representing the UI hierarchy.
2. **State/Prop Change:** When user interaction or an API update triggers a change, React generates a _new_ Virtual DOM tree for that update.
3. **The Diffing Algorithm (Heuristic O(n)):** React compares the new Virtual DOM tree with the previous snapshot using an optimized O(n) diffing algorithm. It assumes two elements of different types produce different trees, and uses stable `keys` to track child element identities across renders.
4. **Reconciliation & Batching:** React calculates the minimum set of actual DOM mutations required to bridge the gap between the two trees and batches these updates together.
5. **Commit Phase:** The real browser DOM is updated precisely and efficiently in a single, streamlined transaction.

---

## 2. Bundlers in the React Ecosystem

A **bundler** takes modular source files (JavaScript, CSS, assets, JSX) and packages them into optimized, production-ready static bundles that browsers can execute efficiently.

### Key Bundlers & Build Tools

- **Rollup:**
- _Primary Use Case:_ Building and publishing reusable JavaScript libraries and packages.
- _Strengths:_ Exceptional **tree-shaking** (eliminating dead code) and outputs clean, standard module formats (ESM, CJS, UMD).

- **Parcel:**
- _Primary Use Case:_ Rapid prototyping and smaller-to-medium applications.
- _Strengths:_ **Zero-configuration** out-of-the-box experience. It uses multi-core processing automatically, requiring no complex configuration files (`webpack.config.js` or `vite.config.js`).

- **Webpack (Historical Benchmark):** The veteran module bundler that powered the React ecosystem for years via Create React App; highly extensible via plugins and loaders, though slower to boot than modern alternatives.
- **Vite (Modern Standard):** Leverages native ES modules (ESM) in the browser during development for lightning-fast Hot Module Replacement (HMR) and uses Rollup under the hood for production builds.

### Bundler Comparison Quick Reference

| Feature              | Rollup                                    | Parcel                  | Vite                             |
| -------------------- | ----------------------------------------- | ----------------------- | -------------------------------- |
| **Configuration**    | Config file required (`rollup.config.js`) | Zero configuration      | Simple config (`vite.config.js`) |
| **Best Suited For**  | Libraries & SDKs                          | Quick apps & prototypes | Modern SPAs & Full-stack apps    |
| **Dev Server Speed** | Moderate                                  | Fast (Multi-threaded)   | Instant (Native ESM)             |
| **Tree-Shaking**     | Industry-leading                          | Excellent               | Built-in (via Rollup)            |

---

## 3. JSX Syntax, Expressions, Functions & Attributes

### What is JSX?

- **Definition:** **JavaScript XML** is a syntax extension for JavaScript. It allows developers to write HTML-like structures directly inside JavaScript files.
- **Under the Hood:** Browsers cannot read JSX natively. Tools like Babel transpile JSX into standard JavaScript function calls:

```jsx
// JSX
const element = <h1 className="title">Hello World</h1>;

// Transpiled JavaScript equivalent
const element = React.createElement(
  "h1",
  { className: "title" },
  "Hello World",
);
```

### Embedding JavaScript Expressions

- Any valid JavaScript expression can be embedded inside JSX by wrapping it in **curly braces (`{}`)**:
- Variables: `<h1>Welcome back, {userName}</h1>`
- Arithmetic/Logic: `<p>Total: ${price * quantity}</p>`
- Ternary Operators (Conditional Rendering): `{ isLoggedIn ? <UserDashboard/> : <LoginPrompt/>}`
- Array Methods (`map`):

```jsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

### Functions & Event Handling

- **Event Handlers:** React events are named using **camelCase** rather than lowercase (e.g., `onClick`, `onChange`, `onSubmit`).
- **Passing Functions:** Pass a reference to a function, rather than calling it immediately during render:

```jsx
// Correct
<button onClick={handleClick}>Click Me</button>

// Incorrect (calls function immediately on render loop)
<button onClick={handleClick()}>Click Me</button>

```

### Attributes & DOM Property Conventions

- **`className` instead of `class`:** Because `class` is a reserved keyword in JavaScript for defining classes, JSX uses `className`.
- **`htmlFor` instead of `for`:** Used on `<label>` elements to link to an input's `id` (matching the DOM property `htmlFor`).
- **Inline Styles:** Passed as JavaScript objects with camelCased property names rather than CSS strings:

```jsx
// Correct
<div style={{ backgroundColor: "black", fontSize: "16px", marginTop: "10px" }}>
  Styled Content
</div>
```

- **Boolean Attributes:** Omitting an attribute value defaults it to `true` (e.g., `<input disabled />` is equivalent to `disabled={true}`).

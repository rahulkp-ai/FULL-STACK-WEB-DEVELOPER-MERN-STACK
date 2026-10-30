## Master Note

---

- **Topic:** Master Note

- **Instructor: RAHUL KP**

### 1. Introduction & Environment Setup

#### Project Initialization (Vite & TypeScript)

To set up a lightning-fast modern project with Vite and TypeScript, run the following commands in your terminal:

```bash
npm create vite@4.1.0 react-app
cd react-app
npm install
npm run dev
npm install bootstrap@5.2.3

```

#### Global Stylesheet Configuration (`main.tsx`)

Import Bootstrap globally at the entry point of your application:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

### 2. Components, JSX & Fragments

#### Basic Function Component (`Message.tsx`)

Components must be named using **PascalCase**, return JSX, and be exported as default modules:

```tsx
function Message() {
  // JSX under the hood compiles to React.createElement() calls
  const name = "Rahul";
  if (name) {
    return <h1>Hello {name}</h1>;
  }
  return <h1>Hello World</h1>;
}

export default Message;
```

#### Using Fragments to Return Multiple Elements (`ListGroup.tsx`)

To return multiple adjacent elements without adding unneeded wrapper `<div>` nodes to the DOM, use React Fragments (`<>...</>`):

```tsx
import { Fragment } from "react";

function ListGroup() {
  return (
    <>
      <h1>List</h1>
      <ul className="list-group">
        <li className="list-group-item">An item</li>
      </ul>
    </>
  );
}

export default ListGroup;
```

---

### 3. Rendering Lists & Conditional Rendering

#### Dynamic Arrays, `map()`, Keys, & Conditional Rendering (`ListGroup.tsx`)

```tsx
import { useState } from "react";

function ListGroup() {
  const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  // State hook to track the active selected index (-1 means none selected)
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>List</h1>
      {/* Conditional rendering using logical && */}
      {items.length === 0 && <p>No item found</p>}

      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
```

---

### 4. Props, TypeScript Interfaces & Inverse Data Flow

#### Reusable Component with Typed Props (`ListGroup.tsx`)

Using TypeScript interfaces to define prop shapes and callback function signatures:

```tsx
import { useState } from "react";

// Define the shape of input properties using a TypeScript interface
interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void; // Callback for inverse data flow
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item); // Notify parent component
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
```

#### Consuming the Component in Root (`App.tsx`)

```tsx
import ListGroup from "./components/ListGroup";

function App() {
  const cityItems = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <ListGroup
        items={cityItems}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
```

---

### 5. Component Composition & `props.children`

#### Alert Component Accepting Rich Children (`Alert.tsx`)

Using `ReactNode` to accept complex HTML or text content passed inside opening and closing tags:

```tsx
import { ReactNode } from "react";

interface Props {
  children: ReactNode; // Supports strings, numbers, or complex JSX elements
}

const Alert = ({ children }: Props) => {
  return (
    <div className="alert alert-primary alert-dismissible" role="alert">
      {children}
    </div>
  );
};

export default Alert;
```

---

### 6. Interactive UI Elements & State Toggle Exercise

#### Custom Button & Dismissible Alert Integration (`Button.tsx` & `App.tsx`)

**`Button.tsx`** (Implementing strict TypeScript string literal union types for button color variants):

```tsx
interface Props {
  children: string;
  color?: "primary" | "secondary" | "danger" | "success"; // Union type validation
  onClick: () => void;
}

const Button = ({ children, color = "primary", onClick }: Props) => {
  return (
    <button className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
```

**`App.tsx`** (Managing alert visibility state and wire-framing component interactions):

```tsx
import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          My Dynamic Alert Message!
        </Alert>
      )}
      <Button color="primary" onClick={() => setAlertVisibility(true)}>
        My Button
      </Button>
    </div>
  );
}

export default App;
```

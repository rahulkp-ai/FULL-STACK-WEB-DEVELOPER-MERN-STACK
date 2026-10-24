# Express.js: Foundations & Routing

- **Course:** Backend Web Development

- **Topic:** Express.js Foundations, Routing, and Middleware

- **Instructor: RAHUL KP**

---

## Overview & Environment Setup

### 1.1 What is Express.js?

- **Definition:** Express.js is a minimal, unopinionated, flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Why use Express over pure Node.js `http` module?**
  - Simplifies routing logic (no need for complex nested `if-else` or `switch` statements checking `req.url`).
  - Provides higher-level abstractions for handling HTTP requests and responses.
  - Easy integration with middleware pipelines for request preprocessing (auth, logging, parsing).

### 1.2 NPM Setup & Application Initialization

1. **Initialize Project Directory:**
   ```bash
   mkdir express-demo
   cd express-demo
   npm init -y
   ```
2. **Install Core Dependencies:**
   ```bash
   npm install express
   npm install --save-dev nodemon
   ```
3. **Configure `package.json` Scripts:**
   ```json
   {
     "name": "express-demo",
     "version": "1.0.0",
     "main": "server.js",
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     },
     "dependencies": {
       "express": "^4.19.0"
     },
     "devDependencies": {
       "nodemon": "^3.1.0"
     }
   }
   ```

### 1.3 Creating a Basic Server

Create a file named `server.js`:

```javascript
// Step 1: Import express
const express = require("express");

// Step 2: Initialize express application
const app = express();

const PORT = process.env.PORT || 3000;

// Step 3: Define a basic route route handler
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Step 4: Listen on a specific port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

#### Key Elements Explained:

- `app.get(path, callback)`: Listens specifically for HTTP `GET` requests targeting the specified path.
- `res.send()`: Sends the HTTP response. Automatically sets appropriate response headers (e.g., `Content-Type: text/html` or `application/json` depending on data structure).
- `app.listen(port, callback)`: Starts a UNIX socket and listens for connections on the given host and port.

---

## Routing & HTTP Methods

### 2.1 HTTP Methods & Standard REST Routing

Express supports all standard HTTP verbs: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.

```javascript
app.use(express.json()); // Essential middleware to parse incoming JSON payloads

// GET: Retrieve resource(s)
app.get("/api/users", (req, res) => {
  res.json({ success: true, data: [{ id: 1, name: "Alice" }] });
});

// POST: Create a new resource
app.post("/api/users", (req, res) => {
  const newUser = req.body;
  res
    .status(201)
    .json({ success: true, message: "User created", data: newUser });
});

// PUT: Update an existing resource completely
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  res.json({ success: true, message: `User ${id} updated` });
});

// DELETE: Remove a resource
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  res.json({ success: true, message: `User ${id} deleted` });
});
```

### 2.2 URL Building & Pattern Matching Routes

Express uses `path-to-regexp` syntax under the hood to match URL paths.

1. **Path Parameters (`req.params`):**

   ```javascript
   // Dynamic segment matching
   app.get("/users/:userId/books/:bookId", (req, res) => {
     const { userId, bookId } = req.params;
     res.send(`User ID: ${userId}, Book ID: ${bookId}`);
   });
   ```

2. **Query Parameters (`req.query`):**

   ```javascript
   // URL example: /search?category=books&sort=asc
   app.get("/search", (req, res) => {
     const { category, sort } = req.query;
     res.json({ category, sort });
   });
   ```

3. **Pattern-Matched Routes (Regular Expressions / Wildcards):**

   ```javascript
   // Matches 'acd' and 'abcd'
   app.get("/ab?cd", (req, res) => res.send("ab?cd"));

   // Matches 'abcd', 'abbcd', 'abbbcd', etc.
   app.get("/ab+cd", (req, res) => res.send("ab+cd"));

   // Matches 'abcd', 'abRANDOMcd', 'ab123cd'
   app.get("/ab*cd", (req, res) => res.send("ab*cd"));
   ```

### 2.3 Modular Routers (`express.Router`)

For scalable application structure, route logic should be modularized using `express.Router`.

**Directory Structure:**

```text
project/
├── routes/
│   └── userRoutes.js
└── server.js
```

`routes/userRoutes.js`:

```javascript
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Fetch all users" });
});

router.get("/:id", (req, res) => {
  res.json({ message: `Fetch user ${req.params.id}` });
});

module.exports = router;
```

`server.js`:

```javascript
const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Mount user routes at /api/users prefix
app.use("/api/users", userRoutes);

app.listen(3000);
```

---

## Middleware

### 3.1 Understanding Middleware Basics

- **What is Middleware?** Functions that have access to the request object (`req`), response object (`res`), and the `next` function in the application’s request-response cycle.
- **Signature:** `(req, res, next) => { ... }`
- **Core Responsibilities:**
  - Execute arbitrary code.
  - Make changes to the request and response objects.
  - End the request-response cycle.
  - Call `next()` to pass control to the next middleware in the stack.

```
Request ---> [ Middleware 1 ] ---> [ Middleware 2 ] ---> [ Route Handler ] ---> Response
```

### 3.2 Middleware Execution Order

Execution order is dictated strictly by the registration sequence (`app.use()` or method calls).

```javascript
const express = require("express");
const app = express();

// Global Middleware 1
app.use((req, res, next) => {
  console.log("1. First Middleware Called");
  req.requestTime = Date.now();
  next(); // Pass control to next handler
});

// Global Middleware 2
app.use((req, res, next) => {
  console.log("2. Second Middleware Called");
  next();
});

// Route-Level Middleware
const checkAuth = (req, res, next) => {
  const authenticated = true; // Simulated check
  if (authenticated) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

app.get("/dashboard", checkAuth, (req, res) => {
  console.log("3. Dashboard Route Handler Executed");
  res.send(`Dashboard accessed at ${req.requestTime}`);
});

app.listen(3000);
```

### 3.3 Third-Party & Built-In Middleware

Common middleware packages enhance Express capabilities.

1. **Built-in Middleware:**
   - `express.json()`: Parses incoming JSON request bodies.
   - `express.urlencoded({ extended: true })`: Parses URL-encoded data.
   - `express.static('public')`: Serves static assets (images, CSS, JS files).

2. **Popular Third-Party Middleware Example (`morgan` & `cors`):**

   ```bash
   npm install morgan cors
   ```

   ```javascript
   const express = require("express");
   const morgan = require("morgan");
   const cors = require("cors");

   const app = express();

   // Enable Cross-Origin Resource Sharing
   app.use(cors());

   // HTTP request logger middleware
   app.use(morgan("dev"));

   app.use(express.json());

   app.get("/", (req, res) => {
     res.send("API Running");
   });

   app.listen(3000);
   ```

---

## Hands-On Summary & Quick Reference

### Complete Sample Application (`app.js`)

```javascript
const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

// Built-in & Third-Party Middleware
app.use(morgan("combined"));
app.use(express.json());

// Custom Logging Middleware
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request to ${req.url}`,
  );
  next();
});

// Routes
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Exercises

1. **Exercise 1:** Add a custom middleware that validates whether a custom HTTP header (`x-api-key`) is present. If missing, return a `403 Forbidden` status.
2. **Exercise 2:** Refactor a monolithic `server.js` file by extracting `/products` routes into a modular file (`routes/productRoutes.js`).

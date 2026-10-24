# Express.js: Sessions Security

- **Course:** Backend Web Development

- **Topic:** Sessions, Security & Express Tooling

- **Instructor: RAHUL KP**

## State Management & Authentication

### 1. Cookies in Express

HTTP is stateless. Cookies allow servers to store key-value data on the client browser to maintain state across requests.

#### Installation

```bash
npm install cookie-parser
```

#### Setting, Reading, and Deleting Cookies

```javascript
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
// Secret used for signing cookies
app.use(cookieParser("my_super_secret_key"));

// 1. Setting a Cookie
app.get("/set-cookie", (req, res) => {
  // Session cookie (cleared when browser closes)
  res.cookie("user_preference", "dark_mode");

  // Persistent & Secure Cookie
  res.cookie("remember_token", "xyz123abc", {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
    httpOnly: true, // Prevents client-side JS (XSS attacks) from accessing
    secure: process.env.NODE_ENV === "production", // Requires HTTPS
    sameSite: "strict", // Protection against CSRF attacks
  });

  res.send("Cookies have been set!");
});

// 2. Reading Cookies
app.get("/get-cookie", (req, res) => {
  const pref = req.cookies.user_preference;
  const token = req.cookies.remember_token;

  res.json({ user_preference: pref, remember_token: token });
});

// 3. Deleting a Cookie
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("remember_token");
  res.send("Remember token cookie cleared.");
});
```

---

### 2. Sessions with `express-session`

Sessions store sensitive state data on the **server side**, while issuing a signed cookie containing only a unique session ID (`connect.sid`) to the client.

#### Setup & Configuration

```bash
npm install express-session
```

```javascript
const session = require("express-session");

app.use(
  session({
    secret: "keyboard_cat_secret_key",
    resave: false, // Forces session to be saved back to store even if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
      secure: false, // Set to true in HTTPS production environments
    },
  }),
);

// Accessing and Modifying Session Data
app.get("/page-views", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`You visited this page ${req.session.views} times`);
  } else {
    req.session.views = 1;
    res.send("Welcome to this page for the first time!");
  }
});

// Destroying a Session (Logout)
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out");
    }
    res.clearCookie("connect.sid");
    res.send("Logged out successfully");
  });
});
```

---

### 3. Authentication Basics

An end-to-end implementation of session-based authentication using password hashing (`bcryptjs`).

```bash
npm install bcryptjs
```

```javascript
const bcrypt = require("bcryptjs");

// Mock Database User
const dbUser = {
  id: "u123",
  email: "dev@example.com",
  passwordHash: "$2a$10$vQ6/8KkM...", // Hashed password for "secret123"
};

// Authentication Middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized access. Please log in." });
};

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== dbUser.email) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  // Verify password match
  const isMatch = await bcrypt.compare(password, dbUser.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  // Regenerate session ID to prevent session fixation attacks
  req.session.regenerate((err) => {
    if (err) return res.status(500).send("Session error");

    req.session.userId = dbUser.id;
    res.json({ message: "Login successful!" });
  });
});

// Protected Route Example
app.get("/api/dashboard", requireAuth, (req, res) => {
  res.json({
    message: `Welcome to your protected dashboard, User ID: ${req.session.userId}`,
  });
});
```

---

## RESTful APIs & Design

### URIs & Standard REST Methods

REST (Representational State Transfer) is an architectural style for building networked web APIs.

#### Key Principles

1. **Resource Identifiers (URIs):** Nouns, not verbs (e.g., `/api/v1/orders`, not `/api/v1/getOrders`).
2. **Stateless Requests:** Each HTTP request contains all context needed to process it.
3. **Uniform Interface & HTTP Verbs:**
   - `GET`: Retrieve a resource or collection (Safe & Idempotent).
   - `POST`: Create a new resource (Non-idempotent).
   - `PUT`: Replace/update an entire resource (Idempotent).
   - `PATCH`: Partially update a resource.
   - `DELETE`: Remove a resource (Idempotent).

#### Endpoint Design Matrix

| HTTP Method | Endpoint Example       | Action Description             | Success Status              |
| :---------- | :--------------------- | :----------------------------- | :-------------------------- |
| **GET**     | `/api/v1/articles`     | Retrieve list of articles      | `200 OK`                    |
| **POST**    | `/api/v1/articles`     | Create a new article           | `201 Created`               |
| **GET**     | `/api/v1/articles/:id` | Fetch specific article         | `200 OK`                    |
| **PUT**     | `/api/v1/articles/:id` | Replace article completely     | `200 OK`                    |
| **PATCH**   | `/api/v1/articles/:id` | Update specific article fields | `200 OK`                    |
| **DELETE**  | `/api/v1/articles/:id` | Delete article                 | `200 OK` / `204 No Content` |

---

## Application Tooling & Operations

### 1. Scaffolding with Yeoman

#### Overview

Yeoman is a general-purpose scaffolding tool that uses "generators" to rapidly set up standardized boilerplate project templates.

#### Usage Walkthrough

```bash
# 1. Install Yeoman globally
npm install -g yo

# 2. Install an Express Generator (e.g., generator-express)
npm install -g generator-express

# 3. Run the generator inside your new project directory
mkdir my-scaffolded-app
cd my-scaffolded-app
yo express
```

---

### 2. Error Handling Methods

Express contains a built-in error handler that catches errors occurring in the pipeline.

#### synchronous Error Handling

Express automatically catches errors thrown in synchronous code:

```javascript
app.get("/sync-error", (req, res) => {
  throw new Error("Something went wrong synchronously!"); // Caught automatically
});
```

#### Asynchronous Error Handling

In Express 4, errors in asynchronous functions must be passed to `next()` explicitly:

```javascript
app.get("/async-error", async (req, res, next) => {
  try {
    const data = await fetchNonExistentData();
    res.json(data);
  } catch (err) {
    next(err); // Must pass async errors to next()
  }
});
```

#### Custom Error Handling Middleware

Error-handling middleware functions are defined with **four arguments** instead of three: `(err, req, res, next)`.

```javascript
// Custom Error Class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Global Custom Error Middleware (Defined AFTER all routes)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[ERROR] ${err.stack}`);

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});
```

---

### 3. Debugging Techniques in Express.js

#### Using the `debug` Package

Express uses the built-in `debug` module internally to log operational information.

```bash
# Run app with Express core debugging output enabled in terminal
DEBUG=express:* node server.js

# Target specific subsystems
DEBUG=express:router,express:application node server.js
```

#### Application-Level Custom Debugging

```bash
npm install debug
```

```javascript
// server.js
const debug = require("debug")("app:server");
const dbDebug = require("debug")("app:db");

debug("Starting HTTP server...");
dbDebug("Connecting to database...");

// Run using: DEBUG=app:* node server.js
```

#### Node Inspector / VS Code Debugging

1. Launch app with Node's built-in inspector:
   ```bash
   node --inspect server.js
   ```
2. Open Chrome and navigate to `chrome://inspect` to connect Chrome DevTools directly to your running Node.js process.

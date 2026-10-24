# Express.js : Master Notes

- **Course:** Backend Web Development

- **Topic:** End to End

- **Instructor: RAHUL KP**

---

## Introduction & Environment Setup

### 1. What is Express.js?

- **Definition:** Express.js is a minimal, fast, and flexible web application framework for Node.js.
- **Core Purpose:** Simplifies building web applications and APIs by providing robust tools for routing, middleware management, request handling, and server-side logic.
- **Key Characteristics:**
- **Built on Node.js:** Uses JavaScript for full-stack backend and server-side development.
- **Middleware Pattern:** Operates on a modular middleware stack to easily extend functionality.
- **Ecosystem Compatibility:** Integrates seamlessly with front-end libraries and frameworks (React, Angular, Vue, etc.) for full-stack application development.

---

### 2. Node.js & npm Installation & Verification

- **Download Node.js:** Obtain the installable binary/package matching your operating system architecture from the official Node.js website.
- **Verify Installation:** Run commands in your system terminal:

```bash
node -v   # Verifies Node.js runtime version
npm -v    # Verifies Node Package Manager version

```

---

### 3. Project Initialization & Application Server Setup

- **Project Directory & Initializing npm:**

```bash
mkdir express-app
cd express-app
npm init -y

```

This generates a `package.json` file containing metadata and configuration properties (specifying `index.js` as the main entry point).

- **Installing Express:**

```bash
npm install express

```

This creates the `node_modules` directory and adds Express as a dependency in `package.json`.

- **Basic Server Implementation (`index.js`):**

```javascript
const express = require("express");
const app = express();
const port = 3000;

// Define a simple root route
app.get("/", (req, res) => {
  res.send("Hello Express");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

- **Running the Server:**

```bash
node index.js

```

Open `http://localhost:3000` in your web browser to view the response message (`Hello Express`).

---

## Routing & HTTP Methods

### 1. Route Handlers & Express Routers

- Routes define the endpoints (URIs) of an application and how it responds to client requests.
- **Express Router:** Use `express.Router()` to create modular, mountable route handlers, separating application logic into cleaner controller files.

### 2. HTTP Methods (GET, POST, PUT, DELETE)

- **`app.get()` / `router.get()`:** Retrieve data from the server.
- **`app.post()` / `router.post()`:** Submit or create new resources on the server.
- **`app.put()` / `router.put()`:** Update or replace existing server resources.
- **`app.delete()` / `router.delete()`:** Remove resources from the server.

### 3. URL Building & Pattern-Matched Routes

- Express supports route paths defined with strings, string patterns, and regular expressions, as well as route parameters (`req.params`):

```javascript
// Route parameter example
app.get("/api/users/:userId", (req, res) => {
  const { userId } = req.params;
  res.send(`User ID requested: ${userId}`);
});
```

---

## Middleware & Form Handling

### 1. Middleware Execution Order & Custom/Third-Party Middleware

- Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle (`next`).
- Execution occurs sequentially in the order they are mounted using `app.use()`.

### 2. Processing Forms & Body Parsing

To process incoming form submissions and JSON payloads, register built-in body-parsing middleware before defining routes:

```javascript
app.use(express.json()); // Parses JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data
```

---

## Database Integration (Mongoose & MongoDB)

### 1. Introduction & Setup with Mongoose

- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js providing schema-based data modeling and validation.
- **Connection Setup:**

```javascript
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/express_demo")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection Error:", err));
```

### 2. CRUD Operations with Mongoose Schemas

- **Defining a Schema & Model:**

```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);
```

- **Executing CRUD operations** inside async route handlers:
- **Create:** `await User.create(req.body);`
- **Read:** `await User.find();` or `await User.findById(id);`
- **Update:** `await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });`
- **Delete:** `await User.findByIdAndDelete(id);`

---

## State Management, Authentication & REST APIs

### 1. Cookies & Sessions Management

- **Cookies:** Store small pieces of data on the client browser via `res.cookie()` and parse them using `cookie-parser`.
- **Sessions:** Utilize `express-session` to maintain state across HTTP requests on the server side:

```javascript
const session = require("express-session");
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  }),
);
```

### 2. Authentication Basics (Sessions & JWT)

- **Session-based Authentication:** Authenticate users by storing their user ID in `req.session` upon successful login.
- **JWT (JSON Web Tokens):** Stateless authentication where a signed token is issued upon login and validated via authorization headers (`Bearer <token>`) using `jsonwebtoken`.

### 3. RESTful API Principles

- Design APIs around resources using standard HTTP verbs (GET, POST, PUT, DELETE) and standard HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).

---

## Error Handling & Best Practices

### 1. Handling Asynchronous Errors & Try-Catch Blocks

- Always wrap asynchronous operations inside `try...catch` blocks or use asynchronous error forwarding wrappers to prevent unhandled promise rejections and server crashes.
- Always respond with descriptive error messages, proper HTTP status codes, and helpful debugging stack traces for developers.

### 2. Global Event Listeners for Process Exceptions

Catch unhandled runtime exceptions globally to log errors gracefully and safely terminate or restart the server process:

```javascript
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise Rejection at:", promise, "reason:", reason);
});
```

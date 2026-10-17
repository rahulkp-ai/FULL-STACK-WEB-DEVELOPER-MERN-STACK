# Master Node.js

- **Topic:** Master Node.js

- **Instructor: RAHUL KP**

---

## Course Overview & Objectives

1. What Node.js is and how it executes JavaScript outside the browser.
2. The core built-in modules in Node.js (OS, Path, FS, Events, HTTP).
3. Package management and dependency handling using npm.
4. Building a fully functional RESTful API using Express.js.
5. Handling asynchronous operations, middleware, and request validation.

---

## Module 1: Introduction & Fundamentals

### 1.1 What is Node.js?

- **Definition:** Node.js is an open-source, cross-platform JavaScript runtime environment built on Google Chrome's V8 JavaScript engine.
- **Misconceptions:** It is **not** a programming language, and it is **not** a framework. It is an environment that allows running JS on the server side.
- **Why Node.js?**
  - Asynchronous and Event-Driven (Non-blocking I/O operations make it extremely fast and scalable).
  - Single language (JavaScript) across the entire stack (Frontend & Backend).
  - Huge ecosystem via `npm` (Node Package Manager).

### 1.2 How Node Works

- Browsers use rendering engines (like V8 in Chrome) to execute client-side JS.
- Node.js takes the V8 engine, wraps it with C++ bindings, and provides access to operating system utilities (file system, network, processes).
- **Single-Threaded Event Loop:** Node uses a single thread to handle multiple concurrent requests using non-blocking asynchronous callbacks.

### 1.3 Running Your First Node Application

- Check installation:
  ```bash
  node --version
  ```
- Create a file named `app.js`:
  ```javascript
  function sayHello(name) {
    console.log(`Hello ${name}`);
  }
  sayHello("Developer");
  ```
- Execute via terminal:
  ```bash
  node app.js
  ```
- **Key Difference from Browser JS:**
  - There is no `window` or `document` object in Node.js because there is no DOM.
  - Instead, we have global objects like `global`, `process`, `__dirname`, and `__filename`.

---

## Module 2: Core Modules & Node Architecture

Node.js comes with a rich set of built-in modules that do not require external installation.

### 2.1 The Module System

Every file in Node.js is treated as a separate module. To keep variables and functions private, Node wraps code inside a module wrapper function:

```javascript
(function (exports, require, module, __filename, __dirname) {
  // Your code goes here
});
```

- **Exporting code:**

  ```javascript
  // logger.js
  var url = "http://mylogger.io/log";
  function log(message) {
    console.log(message);
  }
  module.exports.log = log;
  module.export.endPoint = url;
  ```

- **Importing code:**
  ```javascript
  // app.js
  const logger = require("./logger");
  logger("Message to log"); // or logger.log('...')
  ```

### 2.2 Essential Built-in Modules

- **Path Module:** Provides utilities for working with file and directory paths.
  ```javascript
  const path = require("path");
  var pathObj = path.parse(__filename);
  console.log(pathObj);
  ```
- **OS Module:** Provides information about the computer's operating system.
  ```javascript
  const os = require("os");
  console.log(`Free Memory: ${os.freemem()}`);
  console.log(`Total Memory: ${os.totalmem()}`);
  ```
- **File System (FS) Module:** Used to interact with the file system (synchronous vs. asynchronous methods).

  ```javascript
  const fs = require("fs");
  // Synchronous (blocking)
  const files = fs.readdirSync("./");

  // Asynchronous (non-blocking - preferred)
  fs.readdir("./", function (err, files) {
    if (err) console.log("Error", err);
    else console.log("Result", files);
  });
  ```

- **Events Module:** Core concept for building event-driven architecture.

  ```javascript
  const EventEmitter = require("events");
  const emitter = new EventEmitter();

  // Register a listener
  emitter.on("messageLogged", (arg) => {
    console.log("Listener called", arg);
  });

  // Raise an event
  emitter.emit("messageLogged", { id: 1, url: "http://..." });
  ```

---

## Module 3: Package Management with NPM

### 3.1 Introduction to NPM

- **npm** stands for Node Package Manager. It is a repository for open-source packages and a command-line utility to manage dependencies.
- **Initializing a project:**
  ```bash
  npm init
  # or skip prompts:
  npm init -y
  ```
  This generates a `package.json` file which tracks project metadata and dependencies.

### 3.2 Managing Dependencies

- Installing a package locally (e.g., `underscore`):
  ```bash
  npm i underscore
  ```
- Understanding `node_modules` and `package-lock.json`:
  - `node_modules`: Contains the actual source code of installed packages (never commit this to Git).
  - `package-lock.json`: Locks the dependency tree to ensure identical installations across machines.
- **Semantic Versioning (SemVer):**
  - Format: `MAJOR.MINOR.PATCH` (e.g., `1.8.2`)
  - `^` (Caret): Keeps major version fixed, updates minor and patch.
  - `~` (Tilde): Keeps major and minor fixed, updates patch only.

---

## Module 4: Building a RESTful API with Express

### 4.1 Introduction to Express

- Building web servers using Node's core `http` module is verbose. **Express** is a minimal and flexible Node.js web application framework that provides robust features for building APIs.
- Installing Express:
  ```bash
  npm i express
  ```

### 4.2 Creating a Basic Express Server

```javascript
const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simple GET endpoint
app.get("/", (req, res) => {
  res.send("Hello World from Express API!");
});

// PORT environment variable configuration
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```

### 4.3 Handling CRUD Operations

```javascript
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// GET all courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// GET single course by ID (Route Parameters)
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

// POST new course
app.post("/api/courses", (req, res) => {
  // Basic validation
  if (!req.body.name || req.body.name.length < 3) {
    return res
      .status(400)
      .send("Name is required and should be minimum 3 characters.");
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// PUT (Update) course
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found.");

  if (!req.body.name || req.body.name.length < 3) {
    return res
      .status(400)
      .send("Name is required and should be minimum 3 characters.");
  }

  course.name = req.body.name;
  res.send(course);
});

// DELETE course
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});
```

### 4.4 Input Validation with Joi

For robust validation, developers use libraries like `joi`:

```bash
npm i joi
```

```javascript
const Joi = require("joi");

// Inside POST endpoint:
const schema = Joi.object({
  name: Joi.string().min(3).required(),
});

const { error } = schema.validate(req.body);
if (error) return res.status(400).send(error.details[0].message);
```

---

## Review Questions & Exercises

1. **Explain the difference between synchronous and asynchronous file system methods in Node.js. When should you use each?**
2. **What is the purpose of `module.exports`, and how does it differ from ES6 `export default`?**
3. **Write an Express route that accepts query parameters (e.g., `/api/posts?sortBy=name`) and logs them.**
4. **Why do we use environment variables for ports (`process.env.PORT`) instead of hardcoding port 3000?**

# Express.js: Database Integration

- **Course:** Backend Web Development

- **Topic:** Database Integration & REST APIs

- **Instructor: RAHUL KP**

## Templating & Static Files

### 1. Introduction to Pug

#### Overview

Pug (formerly Jade) is a high-performance template engine heavily used with Express.js. It uses indentation to represent HTML structure, eliminating the need for closing tags and angle brackets.

#### Setup in Express

To use Pug, install the package and set it as the view engine in your Express application:

```bash
npm install pug

```

```javascript
// app.js
const express = require("express");
const path = require("path");

const app = express();

// Set views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Express & Pug",
    user: { name: "Alice", isAdmin: true },
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

#### Core Features & Syntax

##### Syntax & HTML Elements

- Tag names start the line.
- Attributes are placed inside parentheses `()`.
- Content follows the tag after a space.

```pug
//- views/index.pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    title= title
  body
    h1 Welcome to #{title}
    p.description Structured text with class and ID support.
    #main-content
      a(href="https://expressjs.com", target="_blank") Express Docs

```

##### Variables & Interpolation

- **Buffered Code (`=`):** Evaluates an expression and outputs encoded HTML.
- **String Interpolation (`#{var}`):** Embeds JavaScript variables inside strings.

```pug
// Variable passing example
h2 Hello, #{user.name}!
p Today is = new Date().toLocaleDateString()

```

##### Conditionals (`if`, `else if`, `else`, `unless`)

Control flow directly inside the template.

```pug
if user.isAdmin
  .badge.admin-badge Admin User Dashboard
else if user.name
  .badge.user-badge Standard User Profile
else
  p Please log in to continue.

```

##### Iteration (`each` / `for`)

Loop over arrays or objects easily.

```pug
- const items = ['Express', 'Pug', 'Node.js', 'MongoDB'];

ul.tech-stack
  each item, index in items
    li(key=index)= index + 1 + '. ' + item
  else
    li No items found.

```

##### Includes & Layout Inheritance

Pug supports modularization using `include` for partials and `extends`/`block` for layout template inheritance.

**`views/layouts/main.pug` (Layout Template):**

```pug
doctype html
html
  head
    title My Application
    link(rel="stylesheet", href="/css/style.css")
  body
    include ../partials/navbar.pug

    main.container
      block content

    include ../partials/footer.pug

```

**`views/home.pug` (Child Template):**

```pug
extends layouts/main.pug

block content
  h1 Home Page
  p Welcome to the home page!

```

---

### 2. Serving Static Files

#### Built-in Middleware: `express.static`

Express provides `express.static` to serve static assets like CSS, JavaScript files, images, and fonts directly from a specified directory.

```javascript
// Basic usage
app.use(express.static("public"));
```

#### Serving Multiple Static Directories

You can register multiple static asset directories. Express searches for files in the order the static middleware functions are defined.

```javascript
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "files")));
```

#### Virtual Path Prefixes

To mount static assets on a specific route prefix (so the directory does not exist explicitly in the path URL structure):

```javascript
// Access files via: http://localhost:3000/static/css/style.css
app.use("/static", express.static(path.join(__dirname, "public")));
```

---

## Form Data & Handling Input

### Processing Forms

#### Built-in Body Parsers

Express requires body-parsing middleware to populate `req.body` with posted form data.

- `express.urlencoded({ extended: true })`: Parses URL-encoded bodies (from HTML `<form>` submissions).
- `express.json()`: Parses incoming payloads with JSON payloads.

```javascript
const express = require("express");
const app = express();

// Enable URL-encoded form parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
```

#### Form Handling Walkthrough

**1. Create the Pug Form View (`views/contact.pug`):**

```pug
extends layouts/main.pug

block content
  h2 Contact Us
  form(action="/contact", method="POST")
    div.form-group
      label(for="name") Name:
      input#name.form-control(type="text", name="username", required=true)

    div.form-group
      label(for="email") Email:
      input#email.form-control(type="email", name="email", required=true)

    div.form-group
      label(for="message") Message:
      textarea#message.form-control(name="message", rows="4")

    button(type="submit") Submit

```

**2. Route Handlers for Form GET and POST (`routes/contact.js`):**

```javascript
const express = require("express");
const router = express.Router();

// Render Form
router.get("/contact", (req, res) => {
  res.render("contact");
});

// Process Form Submission
router.post("/contact", (req, res) => {
  const { username, email, message } = req.body;

  // Simple Validation
  if (!username || !email) {
    return res.status(400).send("Name and Email are required.");
  }

  console.log(`Form Received: ${username} <${email}>: ${message}`);

  // Post-Redirect-Get Pattern
  res.redirect("/success");
});

module.exports = router;
```

---

## Database Integration with Mongoose

### 1. Introduction & Setup with Mongoose

#### What is Mongoose?

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and translates between objects in code and representations in MongoDB.

#### Installation & Connection Setup

```bash
npm install mongoose

```

**Database Connection Module (`config/db.js`):**

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://127.0.0.1:27017/express_demo",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

#### Defining Schemas and Models

**User Model (`models/User.js`):**

```javascript
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
  },
  age: {
    type: Number,
    min: [0, "Age cannot be negative"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
```

---

### 2. CRUD Operations with Mongoose (35 Mins)

Below is an Express REST controller implementing full CRUD functionality using Mongoose.

```javascript
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @route   POST /api/users
// @desc    CREATE a new user
router.post("/api/users", async (req, res) => {
  try {
    const { name, email, age, role } = req.body;

    const newUser = await User.create({
      name,
      email,
      age,
      role,
    });

    res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   GET /api/users
// @desc    READ all users
router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// @route   GET /api/users/:id
// @desc    READ a single user by ID
router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: "Invalid User ID format" });
  }
});

// @route   PUT /api/users/:id
// @desc    UPDATE a user
router.put("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Enforce schema validations on update
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   DELETE /api/users/:id
// @desc    DELETE a user
router.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
```

---

## End-to-End Express Application Assembly

```javascript
// server.js
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// 1. Connect to Database
connectDB();

// 2. View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// 3. Global Body Parser & Static Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));

// 4. Routes
app.use("/", require("./routes/contact"));
app.use("/", require("./routes/users"));

// 5. Port Configuration & Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

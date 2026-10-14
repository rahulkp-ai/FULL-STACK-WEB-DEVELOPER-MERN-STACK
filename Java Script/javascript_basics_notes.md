# JavaScript Study Notes

- **Topic:** JavaScript

- **Instructor: RAHUL KP**

---

## What is JavaScript

- **Definition:** JavaScript is one of the most popular and widely used programming languages in the world.
- **Role in Web Development:**
  - **HTML:** Defines the content and structure of web pages.
  - **CSS:** Controls the styling, layout, and visual appearance.
  - **JavaScript:** Provides behavior and interactivity (e.g., popups, animations, dynamic form validations, data processing).
- **Where JavaScript Runs:**
  - **Browsers:** Every modern browser has a built-in **JavaScript Engine** (e.g., Chrome's _V8_, Firefox's _SpiderMonkey_, Safari's _JavaScriptCore_).
  - **Server-side:** Using **Node.js** (which wraps Chrome's V8 engine inside a C++ program), JavaScript can execute outside browsers on servers or local desktop environments.

---

## Setting Up the Development Environment

To start coding in JavaScript, you need a text editor and Node.js.

1. **Code Editor:** **Visual Studio Code (VS Code)**
   - Install VS Code from [code.visualstudio.com](https://code.visualstudio.com/).
   - Recommended extension: **Live Server** (automatically reloads web pages upon saving code changes).
2. **Runtime Engine:** **Node.js**
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).
   - Verify installation in your terminal/command prompt:
     `bash
node -v
`
     Here is the complete raw Markdown guide covering Node.js installation on **Windows, macOS, and Linux**, using both **Graphical/Web Installers** and **Terminal/CLI** methods.

---

## JavaScript in Browsers

You can run JavaScript directly inside an HTML file using the `<script>` tag.

### Inline Script Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>JS Basics</title>
  </head>
  <body>
    <h1>Hello World</h1>

    <script>
      console.log("Hello World");
    </script>
  </body>
</html>
```

- **Best Practice:** Place the `<script>` element at the end of the `<body>` tag (just before `</body>`) so that:
  1. The browser parses and renders all HTML content first, improving page load speed.
  2. Script code can safely interact with HTML elements that are already loaded in the DOM.

---

## Separation of Concerns

Instead of putting JavaScript inside HTML files, keep concerns separated by extracting code into dedicated files.

- **HTML (`index.html`):** Structure
- **CSS (`styles.css`):** Presentation
- **JavaScript (`index.js`):** Behavior

### Linking External JavaScript

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>JS Separation of Concerns</title>
  </head>
  <body>
    <h1>Hello World</h1>

    <!-- External script link -->
    <script src="index.js"></script>
  </body>
</html>
```

```javascript
// index.js
console.log("Hello World from index.js");
```

---

## JavaScript in Node

JavaScript is no longer limited to browsers. You can execute script files locally using Node.js.

1. Open your terminal or command prompt.
2. Navigate to the folder containing your `.js` file.
3. Run the file using the `node` command:
   ```bash
   node index.js
   ```

---

## Variables

Variables are containers used to store data in memory.

### Variable Declaration (`let`)

In modern JavaScript (ES6+), use `let` to declare variables instead of `var`.

```javascript
let name = "RONI";
console.log(name);
```

### Naming Conventions & Rules

1. **No Reserved Keywords:** Cannot use keywords like `if`, `for`, `let`, `class`, `function`.
2. **Meaningful Names:** Names should be clear and descriptive (e.g., `firstName` instead of `fn`).
3. **Cannot Start with Numbers:** Variables cannot start with a digit (`let 1name` is invalid).
4. **No Spaces or Hyphens:** Use camelCase notation (`let firstName = 'RAHUL KP';`).
5. **Case-Sensitive:** `firstName` and `FirstName` are treated as different variables.
6. **Multiple Declarations:**
   - Single line (not recommended): `let firstName = 'RAHUL KP', lastName = 'KURUP';`
   - Separate lines (best practice):
     ```javascript
     let firstName = "RAHUL KP";
     let lastName = "KURUP";
     ```

---

## Constants

When you don't need to reassign a variable, use `const` instead of `let`.

```javascript
const interestRate = 0.3;
// interestRate = 1; // Uncaught TypeError: Assignment to constant variable.
console.log(interestRate);
```

- **Rule of Thumb:** Default to `const`. Use `let` only if you explicitly plan to reassign the variable later.

---

## Primitive Types

JavaScript values are divided into **Primitives (Value Types)** and **Reference Types**.

### Primitive Types

1. **String:** Textual data (e.g., `'Mosh'`).
2. **Number:** Numeric values (both integers and floating-point decimals, e.g., `30`, `19.99`).
3. **Boolean:** Logical truth values (`true` or `false`).
4. **undefined:** Default value of uninitialized variables or explicitly set to represent an absence of value.
5. **null:** Explicitly used to clear the value of a variable.
6. **Symbol:** Used to create unique identifiers (introduced in ES6).

```javascript
let name = "Mosh"; // String Literal
let age = 30; // Number Literal
let isApproved = true; // Boolean Literal
let firstName = undefined; // undefined
let selectedColor = null; // null (used to clear a variable)
```

---

## Dynamic Typing

JavaScript is a **dynamically-typed** language (unlike statically-typed languages like C# or Java).

- **Static Languages:** Variable types are declared explicitly at compile time and cannot change.
- **Dynamic Languages:** Variable types are determined automatically at runtime based on the value assigned, and types can change on the fly.

### Inspecting Types with `typeof`

```javascript
let name = "Julia";
console.log(typeof name); // "string"

name = 1;
console.log(typeof name); // "number"

let isApproved = true;
console.log(typeof isApproved); // "boolean"

let firstName;
console.log(typeof firstName); // "undefined"

let selectedColor = null;
console.log(typeof selectedColor); // "object" (historical JS nuance)
```

---

## Objects

Objects are **reference types** used to group related variables together into key-value pairs.

### Object Literal Syntax

```javascript
let person = {
  name: "Julia",
  age: 23,
};

console.log(person);
```

### Accessing & Modifying Object Properties

1. **Dot Notation (Preferred):**

   ```javascript
   person.name = "RAHUL KP";
   console.log(person.name); // "RAHUL KP"
   ```

2. **Bracket Notation:** Useful when property names are dynamic or determined at runtime.

   ```javascript
   person["name"] = "Anna";

   let selection = "name";
   person[selection] = "Anna";
   console.log(person.name); // "Anna"
   ```

---

## Arrays

An **Array** is a data structure used to store an ordered list of items.

### Array Syntax & Properties

```javascript
let selectedColors = ["red", "blue"];
console.log(selectedColors);
```

- **Zero-based Indexing:** Access elements by index starting at `0`.
  ```javascript
  console.log(selectedColors[0]); // "red"
  ```
- **Dynamic Sizing & Dynamic Types:** Arrays can expand dynamically, and elements can be of mixed data types.
  ```javascript
  selectedColors[2] = "green";
  selectedColors[3] = 1; // Storing a number in the same array
  ```
- **`length` Property:** Returns the number of items in the array.
  ```javascript
  console.log(selectedColors.length); // 4
  ```

---

## Functions

Functions are fundamental building blocks in JavaScript that encapsulate a block of code designed to perform a specific task or calculation.

### Declaring & Calling a Function

```javascript
// Function declaration with a parameter
function greet(name) {
  // Body of the function
  console.log("Hello " + name);
}

// Calling/Invoking the function with an argument
greet("Julia"); // Output: Hello Julia
greet("Roni"); // Output: Hello Roni
```

- **Parameter:** The variable defined in the function signature (`name`).
- **Argument:** The actual value passed into the function when calling it (`'John'`).

### Multiple Parameters

```javascript
function greet(name, lastName) {
  console.log("Hello " + name + " " + lastName);
}

greet("Julia", "Anna"); // Output: Hello Julia Anna
greet("Roni"); // Output: Hello Roni undefined (if argument is omitted)
```

---

## Types of Functions

Functions generally fall into two categories based on their output behavior:

### 1. Performing a Task

These functions execute a set of actions (like displaying output on screen or modifying the DOM) and return `undefined` by default.

```javascript
function greet(name, lastName) {
  console.log("Hello " + name + " " + lastName);
}

greet("Julia Anna", "Joseph");
```

### 2. Calculating and Returning a Value

These functions perform calculations and return a result using the `return` keyword.

```javascript
function square(number) {
  return number * number;
}

// Storing returned value in a variable
let number = square(2);
console.log(number); // 4

// Direct usage inside a function call
console.log(square(3)); // 9
```

# HTML Concepts and Tags Reference

- **Topic:** HTML

- **Instructor: RAHUL KP**

This provides a comprehensive breakdown of core concepts, elements, and tags in HTML, categorized by their purpose to help structure web pages effectively.

(Note: When mentioning "dev", it typically refers to the `<div>` tag!)

---

## 1. Document Structure & Metadata

These tags define the overall framework of an HTML document and store metadata for browsers and search engines.

- `<!DOCTYPE html>`: Declares the document type and HTML5 version.
- `<html>`: The root element that wraps all content on the page.
- `<head>`: Contains metadata, page title, links to stylesheets, and scripts.
- `<title>`: Sets the title of the webpage (shown in the browser tab).
- `<meta>`: Provides metadata like character set (utf-8), viewport settings, and SEO descriptions.
- `<body>`: Encloses all the visible content shown to users.

### Example Code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Webpage</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

---

## 2. Content Sections & Layout (Semantic HTML)

Modern HTML uses semantic tags to give meaning to different sections of a webpage.

- `<div>` (Division): A generic, invisible container used to group elements for styling and layout purposes.
- `<header>`: Represents introductory content, typically a logo or navigation links.
- `<nav>`: Contains navigation links.
- `<main>`: Specifies the dominant content of the `<body>`.
- `<section>`: Defines a thematic grouping of content.
- `<article>`: Represents a self-contained piece of content, like a blog post or news article.
- `<aside>`: Content aside from the main content (like a sidebar).
- `<footer>`: Represents the footer for a section or page (copyright, contact info, etc.).

### Example Code:

```html
<header>
  <h1>Site Logo</h1>
  <nav><a href="#home">Home</a> | <a href="#about">About</a></nav>
</header>

<main>
  <article>
    <h2>Blog Post Title</h2>
    <p>This is a self-contained article within the main content.</p>
  </article>
</main>

<footer>
  <p>&copy; 2026 My Website</p>
</footer>
```

---

## 3. Text & Typography

Tags used to structure and format text content.

- Headings (`<h1>` to `<h6>`): Define headings of decreasing importance (`<h1>` being the most important).
- `<p>`: Defines a text paragraph.
- `<span>`: An inline container used to style a specific piece of text or part of a sentence.
- `<a>` (Anchor): Creates hyperlinks to other pages, files, or locations on the same page.
- `<strong>` / `<b>`: Makes text bold (`<strong>` indicates strong semantic importance).
- `<em>` / `<i>`: Italicizes text (`<em>` indicates stress emphasis).
- `<br>`: Inserts a single line break.
- `<hr>`: Creates a thematic horizontal divider line.

### Example Code:

```html
<h1>Main Heading</h1>
<p>
  This is a paragraph with a <span style="color: red;">highlighted span</span>.
</p>
<p>
  Visit
  <a href="[https://example.com](https://example.com)" target="_blank"
    >Example.com</a
  >
  for details.
</p>
<p>
  This is <strong>very important</strong> text, and this is
  <em>emphasized</em> text.
</p>
<hr />
<p>Line one.<br />Line two after a break.</p>
```

---

## 4. Media & Embedded Content

Tags used to display images, videos, audio, or external content.

- `<img>`: Embeds an image (`src` and `alt` attributes are essential).
- `<video>`: Embeds a video player.
- `<audio>`: Embeds an audio player.
- `<iframe>`: Embeds another HTML document inside the current page (e.g., Google Maps, YouTube videos).
- `<canvas>`: Used to draw graphics via JavaScript.

### Example Code:

```html
<!-- Image Example -->
<img src="logo.png" alt="Company Logo" width="150" />

<!-- Video Player Example -->
<video controls width="300">
  <source src="movie.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

<!-- Iframe Example (Embedding content) -->
<iframe
  src="[https://www.example.com](https://www.example.com)"
  width="400"
  height="200"
  title="Example Frame"
></iframe>
```

---

## 5. Lists

Used for grouping items together in an organized way.

- `<ul>`: Unordered list (bullet points).
- `<ol>`: Ordered list (numbered items).
- `<li>`: List item (used inside `<ul>` or `<ol>`).

### Example Code:

```html
<!-- Unordered List (Bullet points) -->
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Cherries</li>
</ul>

<!-- Ordered List (Numbered items) -->
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

---

## 6. Forms & User Input

Crucial for collecting user data (like login credentials, search queries, or contact info).

- `<form>`: The wrapper element that collects user input and sends it to a server.
- `<input>`: A versatile field for user input (can be text, password, checkbox, radio button, file, etc.).
- `<label>`: Defines a caption or title for an `<input>` element (improves accessibility).
- `<textarea>`: A multi-line text input field (e.g., for comments or messages).
- `<button>`: A clickable button.
- `<select>` & `<option>`: Creates a drop-down selection menu.

### Example Code:

```html
<form action="/submit-form" method="POST">
  <label for="username">Name:</label>
  <input type="text" id="username" name="username" required />
  <br /><br />

  <label for="bio">About:</label>
  <textarea id="bio" name="bio" rows="4" cols="30"></textarea>
  <br /><br />

  <label for="country">Country:</label>
  <select id="country" name="country">
    <option value="In">India</option>
    <option value="USSR">Russia</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
  </select>
  <br /><br />

  <button type="submit">Submit</button>
</form>
```

---

## 7. Tables

Used for displaying tabular data in rows and columns.

- `<table>`: Defines the table container.
- `<tr>`: Table row.
- `<th>`: Table header cell (bold and centered by default).
- `<td>`: Table standard data cell.

### Example Code:

```html
<table border="1">
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Julia</td>
      <td>22</td>
      <td>Dr</td>
    </tr>
    <tr>
      <td>Roni</td>
      <td>24</td>
      <td>ML Engineer</td>
    </tr>
  </tbody>
</table>
```

---

### Core HTML Concepts to Remember:

- **Attributes**: Provide additional information about elements (e.g., `<a href="https://example.com">`, where `href` is an attribute).
- **DOM (Document Object Model)**: The browser's tree-like representation of the HTML document, which JavaScript interacts with.
- **Nesting**: Putting elements inside other elements properly (e.g., putting an `<a>` tag inside a `<p>` tag).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTML Concepts in Action</title>
  </head>
  <body>
    <!-- 2. Content Sections & Layout (Semantic HTML) & Header -->
    <header>
      <h1>HTML Concepts & Tags Reference Guide</h1>
      <p>
        This page demonstrates core HTML concepts, tags, and semantic elements
        in action.
      </p>

      <!-- Navigation -->
      <nav>
        <a href="#intro">Home</a> | <a href="#content">Content</a> |
        <a href="#form-section">Contact Form</a> |
        <a href="#table-section">Data Table</a>
      </nav>
    </header>

    <hr />

    <!-- Main Content Area -->
    <main>
      <!-- Section 1 & 3: Typography & Thematic Sections -->
      <section id="intro">
        <h2>1 & 3. Document Structure & Typography</h2>
        <p>
          Every HTML document starts with a structure like
          <code>&lt;DOCTYPE html&gt;</code>, <code>&lt;html&gt;</code>,
          <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code>.
        </p>
        <p>
          Text styling can be <strong>strong and bold</strong>,
          <em>emphasized in italics</em>, or highlighted using a
          <span>span element</span>.
        </p>
      </section>

      <hr />

      <!-- Section 2: Semantic Article & Aside -->
      <section id="content">
        <h2>2. Semantic Layout Elements</h2>
        <article>
          <h3>Article Title: Why Semantic HTML Matters</h3>
          <p>
            Using elements like <code>&lt;article&gt;</code>,
            <code>&lt;section&gt;</code>, and <code>&lt;header&gt;</code> gives
            clear meaning to search engines and screen readers.
          </p>
        </article>

        <aside>
          <p>
            <em
              >Sidebar Note: (Note: When mentioning "dev", it typically refers
              to the <code>&lt;div&gt;</code> tag!)</em
            >
          </p>
        </aside>
      </section>

      <hr />

      <!-- Section 4: Media & Embedded Content -->
      <section>
        <h2>4. Media & Embedded Content</h2>
        <p>Here is an example of an image and a list:</p>
        <!-- Image Example -->
        <img src="logo.png" alt="Sample Company Logo" width="120" />
      </section>

      <hr />

      <!-- Section 5: Lists -->
      <section>
        <h2>5. Lists (Unordered & Ordered)</h2>
        <p>Unordered list of web development topics:</p>
        <ul>
          <li>HTML Structure</li>
          <li>CSS Styling</li>
          <li>JavaScript Interactivity</li>
        </ul>

        <p>Ordered list of steps:</p>
        <ol>
          <li>Write HTML code</li>
          <li>Save file as .html</li>
          <li>Open in browser</li>
        </ol>
      </section>

      <hr />

      <!-- Section 6: Forms & User Input -->
      <section id="form-section">
        <h2>6. Forms & User Input</h2>
        <p>Fill out the form below to test user input elements:</p>

        <form action="#" method="POST">
          <label for="username">Your Name:</label><br />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your name"
            required
          /><br /><br />

          <label for="bio">Your Feedback:</label><br />
          <textarea
            id="bio"
            name="bio"
            rows="3"
            cols="30"
            placeholder="Type comments here..."
          ></textarea
          ><br /><br />

          <label for="country">Select Country:</label><br />
          <select id="country" name="country">
            <option value="in">India</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option></select
          ><br /><br />

          <button type="submit">Submit Information</button>
        </form>
      </section>

      <hr />

      <!-- Section 7: Tables -->
      <section id="table-section">
        <h2>7. Tables</h2>
        <p>Tabular data displayed using rows and columns:</p>

        <table border="1">
          <thead>
            <tr>
              <th>Concept Name</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&lt;form&gt;</td>
              <td>User Input</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>&lt;table&gt;</td>
              <td>Data Presentation</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>

    <hr />

    <!-- Footer -->
    <footer>
      <p>
        &copy; 2026 HTML Reference Guide. Built with semantic HTML elements.
      </p>
    </footer>
  </body>
</html>
```

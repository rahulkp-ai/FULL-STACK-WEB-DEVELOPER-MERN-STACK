# HTML Basics & Core Concepts

## Lecture Overview & Schedule

- **Instructor: RAHUL KP**

---

## Introduction of Different Web Technologies

Before diving into HTML, it is essential to understand how the web works and the core technologies that power every website on the internet.

### The Three Core Pillars of Web Development

1. **HTML (HyperText Markup Language):** The **skeleton/structure** of the webpage. It defines what content appears on the page (text, images, links, forms).
2. **CSS (Cascading Style Sheets):** The **skin/style** of the webpage. It controls the visual presentation, colors, layouts, fonts, and responsiveness across devices.
3. **JavaScript:** The **brain/behavior** of the webpage. It adds interactivity, handles user events, fetches data asynchronously, and updates the UI dynamically.

### How the Web Works (Client-Server Architecture)

- **Client (Browser):** Requests a webpage (Chrome, Firefox, Safari, Edge).
- **Server:** Stores website files and sends them back when requested via the internet using HTTP/HTTPS protocols.

---

## Introduction to HTML

HTML stands for **HyperText Markup Language**.

- **HyperText:** Links (`<a>` tags) that connect web pages to other web pages.
- **Markup Language:** Uses "tags" to annotate text, images, and other content so the browser knows how to display them.

### Basic HTML Document Structure

Every HTML document follows a standard boilerplate structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>Welcome to my website.</p>
  </body>
</html>
```

- `<!DOCTYPE html>`: Declares the document type and HTML5 version.
- `<html>`: The root element containing all content.
- `<head>`: Contains meta-information, page title, and stylesheets (not visible on the page).
- `<body>`: Contains all the visible content on the webpage.

---

## HTML Elements & Attributes

### HTML Elements

An HTML element is defined by a start tag, some content, and an end tag.

> **Syntax:** `<tagname>Content goes here...</tagname>`

- **Example of an Element:**

```html
<p>This is a paragraph element.</p>
```

- **Self-Closing Elements:** Some elements do not have closing tags or content (e.g., `<br>`, `<hr>`, `<img>`).

### HTML Attributes

Attributes provide **additional information** about HTML elements. They are always specified in the **start tag** and usually come in name/value pairs like `name="value"`.

- **Common Attributes:**
- `href`: Used in links (`<a>`).
- `src`: Used in images (`<img>`).
- `alt`: Alternative text for images.
- `class` / `id`: Used for styling and scripting.

#### Example:

```html
<!-- Anchor tag with href attribute -->
<a href="https://www.google.com" target="_blank">Visit Google</a>

<!-- Image tag with src and alt attributes -->
<img src="logo.png" alt="Company Logo" width="150" height="150" />
```

---

## HTML Headings & Paragraphs

### HTML Headings

Headings are defined with the `<h1>` to `-` tags.

- `<h1>` defines the most important heading (usually the main title).
- `<h6>` defines the least important heading.
- **Note:** Search engines use headings to index the structure and content of your web pages.

#### Example:

```html
<h1>Main Heading (H1)</h1>
<h2>Subheading Level 2 (H2)</h2>
<h3>Section Heading Level 3 (H3)</h3>
```

### HTML Paragraphs

Paragraphs are defined with the `<p>` tag. Browsers automatically add some space (margin) before and after each `<p>` element.

#### Example:

```html
<p>This is the first paragraph of text on our web page.</p>
<p>
  This is a second paragraph. Notice how browsers automatically create vertical
  space between paragraphs.
</p>
```

---

## HTML Formatting & Fonts

### HTML Formatting Elements

HTML provides special elements for defining text with special semantic meaning (formatting).

- `<b>` or `<strong>`: Bold text (strong adds semantic importance).
- `<i>` or `<em>`: Italicized text (em adds emphasis).
- `<mark>`: Highlighted text.
- `<small>`: Smaller text.
- `<del>`: Strikethrough text.
- `<sub>` and `<sup>`: Subscript and Superscript.

#### Example:

```html
<p>
  This is <strong>important bold</strong> text and this is
  <em>emphasized italic</em> text.
</p>
<p>Here is some <mark>highlighted</mark> text and <del>deleted</del> text.</p>
<p>
  Chemical formula for water: H<sub>2</sub>O and mathematical squared:
  X<sup>2</sup>.
</p>
```

### HTML Fonts (Historical Context & Modern Standards)

- _Historical Note:_ Older HTML used the `<font>` tag (e.g., `<font face="Arial" color="red">`) to style text. **This is deprecated in modern HTML5.**
- _Modern Standard:_ Today, styling fonts, colors, and typography is handled entirely using **CSS (Cascading Style Sheets)** via inline styles, internal styles, or external stylesheets.

#### Example (Modern CSS Font Styling):

```html
<p
  style="font-family: 'Courier New', monospace; font-size: 18px; color: darkblue;"
>
  This text is styled using modern inline CSS font properties.
</p>
```

---

## HTML Styles & Quick Lists

### HTML Styles (`style` attribute)

The `style` attribute is used to add styles to an element, such as color, font, size, and background.

#### Example:

```html
<div style="background-color: lightgray; padding: 20px;">
  <h2 style="color: navy; font-family: Arial;">Styled Section Heading</h2>
  <p style="font-size: 16px; color: #333;">
    This box uses inline CSS styling for background color, text color, and
    padding.
  </p>
</div>
```

### HTML Quick Lists

HTML supports three main types of lists:

1. **Unordered List (`<ul>`):** Bulleted list.
2. **Ordered List (`<ol>`):** Numbered/lettered list.
3. **Description/Definition List (`<dl>`):** Terms with descriptions.

#### Example:

```html
<!-- Unordered List -->
<h3>Shopping List (Unordered)</h3>
<ul>
  Apples Bananas Milk
</ul>

<!-- Ordered List -->
<h3>Steps to Bake a Cake (Ordered)</h3>
<ol>
  Preheat the oven Mix flour, sugar, and eggs Bake for 30 minutes
</ol>
```

---

## HTML Layout

Modern HTML5 introduces **Semantic Layout Elements** that clearly describe their meaning to both the browser and the developer.

### Key Semantic Layout Tags:

- `<header>`: Introductory content or navigation links.
- `<nav>`: Navigation links container.
- `<section>`: A thematic grouping of content.
- `<article>`: Self-contained independent content (e.g., a blog post).
- `<aside>`: Sidebar content (pull quotes, related links).
- `<footer>`: Footer for a section or page (copyright, contact info).

#### Example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Layout Example</title>
  </head>
  <body>
    <header>
      <h1>My Website Banner</h1>
      <nav>
        <a href="#home">Home</a> | <a href="#about">About</a> |
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <section>
      <h2>Latest Article</h2>
      <article>
        <h3>Understanding HTML Layouts</h3>
        <p>Semantic tags make code cleaner and improve SEO accessibility.</p>
      </article>
    </section>

    <footer>
      <p>&copy; 2026 Web Development Course. All rights reserved.</p>
    </footer>
  </body>
</html>
```

---

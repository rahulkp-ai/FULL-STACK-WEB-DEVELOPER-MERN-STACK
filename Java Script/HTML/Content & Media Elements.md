# HTML Content & Media Elements

## Lecture Overview & Schedule

- **Instructor: RAHUL KP**

---

## HTML Links & Hyperlinks

Hyperlinks connect web pages to other web pages, downloadable assets, or sections within the same document.

### The `<a>` (Anchor) Tag

Links are defined using the `<a>` element, with the `href` (Hypertext Reference) attribute specifying the target URL.

- **Absolute URL:** Points to an external site (e.g., `href="[https://www.google.com](https://www.google.com)"`).
- **Relative URL:** Points to a file on the local web server (e.g., `href="about.html"`).

### Key Attributes:

- `target="_blank"`: Opens the link in a new browser tab.
- `target="_self"`: Opens the link in the same frame/tab (default).
- `download`: Instructs the browser to download the target file instead of navigating to it.
- `mailto:` / `tel:`: Launches email client or phone dialer.

#### Code Example:

```html
<!-- External Link opening in a new tab -->
<a
  href="https://developer.mozilla.org"
  target="_blank"
  rel="noopener noreferrer"
  >Visit MDN Web Docs</a
>

<!-- Internal Link -->
<a href="contact.html">Go to Contact Page</a>

<!-- Email Link -->
<a href="mailto:support@example.com">Email Customer Support</a>

<!-- Anchor link to jump to a specific section on the same page -->
<a href="#section-faq">Jump to FAQ Section</a>

...

<div id="section-faq">
  <h2>Frequently Asked Questions</h2>
</div>
```

---

## HTML Images

Images embed visual content into web pages. The `<img>` element is a **self-closing (void) element**.

### Required Attributes:

- `src`: Specifies the image file path or URL.
- `alt`: Text alternative for accessibility (screen readers) and fallback if the image fails to load.

### Recommended Attributes:

- `width` and `height`: Sets explicit sizing to prevent layout shift while loading.
- `loading="lazy"`: Defers loading off-screen images until scrolled near, optimizing page speed.

#### Code Example:

```html
<!-- Basic Image Embed -->
<img
  src="images/hero-banner.png"
  alt="A developer working on a laptop"
  width="800"
  height="400"
  loading="lazy"
/>

<!-- Clickable Image Link -->
<a href="https://example.com">
  <img src="logo.svg" alt="Company Homepage Logo" width="150" height="50" />
</a>
```

---

## HTML Tables

Tables structure complex data into rows and columns.

### Core Components:

- `<table>`: Container element.
- `<tr>`: Table row.
- `<th>`: Table header cell (bold, centered by default).
- `<td>`: Table data cell.
- `<thead>`, `<tbody>`, `<tfoot>`: Semantic grouping for long tables.
- `colspan` / `rowspan`: Merges cells horizontally or vertically.

#### Code Example:

```html
<table border="1" style="width: 100%; border-collapse: collapse;">
  <caption>
    Employee Directory 2026
  </caption>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Department</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>101</td>
      <td>Sarah Jenkins</td>
      <td>Engineering</td>
      <td>Active</td>
    </tr>
    <tr>
      <td>102</td>
      <td>Alex Rivera</td>
      <td colspan="2">Design & Marketing (Cross-Dept)</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4">Total Active Employees: 2</td>
    </tr>
  </tfoot>
</table>
```

---

## HTML Lists

Lists group related items into clean, scannable structures.

### 1. Unordered List (`<ul>`)

Used when sequence does not matter (bulleted).

### 2. Ordered List (`<ol>`)

Used for step-by-step instructions or rankings (numbered). Supports attributes like `type="1|a|A|i|I"` and `start="5"`.

### 3. Description List (`<dl>`)

Used for term-definition pairs or metadata key-values (`<dt>` for term, `<dd>` for description).

#### Code Example:

```html
<!-- Unordered List -->
<h3>Project Requirements</h3>
<ul>
  <li>Valid HTML5 Markup</li>
  <li>CSS Responsive Layout</li>
  <li>Accessibility Compliance</li>
</ul>

<!-- Ordered List -->
<h3>Installation Steps</h3>
<ol type="1" start="1">
  <li>Download the source code archive.</li>
  <li>Extract the contents to your workspace folder.</li>
  <li>Run <code>npm install</code> in your terminal.</li>
</ol>

<!-- Description List -->
<h3>Glossary</h3>
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language for structuring web content.</dd>
  <dt>DOM</dt>
  <dd>
    Document Object Model — the programmatic interface for HTML documents.
  </dd>
</dl>
```

---

## HTML Forms & User Inputs

Forms allow users to submit data to a web server for processing.

### Form Container (`<form>`)

- `action`: Destination URL where form data is sent.
- `method`: HTTP method (`GET` appends parameters in URL; `POST` sends data in the request body).

### Essential Input Elements:

- `<label>`: Accessible textual label paired with inputs via the `for` / `id` match.
- `<input>`: Single-line controls (types: `text`, `email`, `password`, `number`, `checkbox`, `radio`, `file`, `date`, `submit`).
- `<textarea>`: Multi-line text entry box.
- `<select>` & `<option>`: Dropdown picker list.
- `<button>`: Clickable action triggers (`type="submit"`, `type="reset"`, or `type="button"`).

#### Code Example:

```html
<form action="/submit-registration" method="POST">
  <fieldset>
    <legend>User Account Setup</legend>

    <!-- Text & Email Inputs -->
    <p>
      <label for="username">Username:</label><br />
      <input
        type="text"
        id="username"
        name="username"
        required
        minlength="4"
        placeholder="e.g. dev_user"
      />
    </p>

    <p>
      <label for="user-email">Email Address:</label><br />
      <input
        type="email"
        id="user-email"
        name="user_email"
        required
        placeholder="name@example.com"
      />
    </p>

    <!-- Dropdown Selection -->
    <p>
      <label for="role">Primary Occupation:</label><br />
      <select id="role" name="user_role">
        <option value="student">Student</option>
        <option value="developer" selected>Developer</option>
        <option value="designer">UI/UX Designer</option>
      </select>
    </p>

    <!-- Checkbox & Radio Buttons -->
    <p>Account Type:</p>
    <input
      type="radio"
      id="type-free"
      name="account_type"
      value="free"
      checked
    />
    <label for="type-free">Free Tier</label>
    <input type="radio" id="type-pro" name="account_type" value="pro" />
    <label for="type-pro">Pro Plan</label>

    <p>
      <input type="checkbox" id="terms" name="accept_terms" required />
      <label for="terms">I accept the Terms and Conditions</label>
    </p>

    <!-- Textarea & Submit -->
    <p>
      <label for="bio">Short Bio:</label><br />
      <textarea
        id="bio"
        name="user_bio"
        rows="4"
        cols="50"
        placeholder="Tell us about yourself..."
      ></textarea>
    </p>

    <button type="submit">Complete Registration</button>
  </fieldset>
</form>
```

---

## HTML Frames vs. Iframe

### HTML Frames (`<frameset>`, `<frame>`) — **Deprecated**

- **Historical Context:** In early HTML (HTML4), web pages split the screen into independent HTML documents using `<frameset>` instead of `<body>`.
- **Current Status:** **Obsolete in HTML5.** Do not use. Causes severe navigation, bookmarking, SEO, and accessibility issues.

### HTML Inline Frames (`<iframe>`) — **Modern Standard**

The `<iframe>` (Inline Frame) embeds another external HTML page or media player directly within the current document body.

### Common Uses:

- Embedding YouTube videos.
- Embedding Google Maps.
- Displaying third-party widgets or payment gateways securely.

### Crucial Security Attributes:

- `sandbox`: Restricts capabilities of the iframe content (disables scripts, forms, popups unless explicitly enabled).
- `allow`: Specifies browser feature policy (e.g., `camera`, `microphone`, `fullscreen`).

#### Code Example:

```html
<!-- Embedding a YouTube Video -->
<h3>Embedded Video Example</h3>
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
>
</iframe>

<!-- Secure Sandbox Iframe for External Pages -->
<h3>Embedded Web Document</h3>
<iframe
  src="https://example.com"
  width="100%"
  height="300"
  title="External Site Preview"
  sandbox="allow-scripts allow-same-origin"
>
</iframe>
```

---

# HTML & HTML5 Cheat Sheet

---

## 1. Introduction of Different Web Technologies

- **Explanation:** Web technologies combine structure (HTML), presentation (CSS), and interactivity (JavaScript) to build websites served over HTTP/HTTPS.
- **Example:**

```text
HTML (Skeleton) + CSS (Skin/Style) + JavaScript (Brain/Behavior)
```

---

## 2. Introduction to HTML

- **Explanation:** HTML (HyperText Markup Language) is the standard markup language used to create the structure of web pages.
- **Example:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

---

## 3. HTML Elements

- **Explanation:** An element consists of a start tag, content, and an end tag that defines how content is rendered.
- **Example:**

```html
<p>This is an HTML element.</p>
```

---

## 4. HTML Attributes

- **Explanation:** Attributes provide additional information about HTML elements in key-value pairs inside the opening tag.
- **Example:**

```html
<a href="https://example.com" target="_blank">Visit Site</a>
```

---

## 5. HTML Headings

- **Explanation:** Headings define titles or subtitles on a page, ranging from `<h1>` (most important) to `<h6>` (least important).
- **Example:**

```html
<h1>Main Topic</h1>
<h2>Subtopic</h2>
<h3>Detail Header</h3>
```

---

## 6. HTML Paragraphs

- **Explanation:** Paragraphs are defined using the `<p>` tag and automatically add vertical space before and after the text.
- **Example:**

```html
<p>This is a paragraph of text explaining a concept.</p>
```

---

## 7. HTML Formatting

- **Explanation:** Formatting tags style text display to convey specific visual or semantic meaning without CSS.
- **Example:**

```html
<b>Bold Text</b> | <strong>Important Text</strong> | <i>Italic Text</i> |
<em>Emphasized Text</em>
```

---

## 8. HTML Fonts

- **Explanation:** Legacy font styling using the `<font>` tag (deprecated in modern web development in favor of CSS).
- **Example:**

```html
<!-- Deprecated legacy usage -->
<font face="Arial" size="4" color="blue">Legacy Styled Text</font>
```

---

## 9. HTML Links

- **Explanation:** Hyperlinks defined using the `<a>` (anchor) tag connect web pages or external resources.
- **Example:**

```html
<a href="https://www.google.com" target="_blank" title="Go to Google"
  >Google Search</a
>
```

---

## 10. HTML Images

- **Explanation:** Embedded images using the `<img>` self-closing tag with source path and alternate descriptive text.
- **Example:**

```html
<img src="logo.png" alt="Company Logo" width="150" height="50" />
```

---

## 11. HTML Tables

- **Explanation:** Structured grid layout for tabular data using rows (`<tr>`), headers (`<th>`), and data cells (`<td>`).
- **Example:**

```html
<table>
  <tr>
    <th>Item</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>Apple</td>
    <td>$1.00</td>
  </tr>
</table>
```

---

## 12. HTML Lists

- **Explanation:** Groupings of related items organized sequentially (`<ol>`), unsequentially (`<ul>`), or descriptively (`<dl>`).
- **Example:**

```html
<ul>
  <li>Unordered Item</li>
</ul>
<ol>
  <li>First Ordered Item</li>
</ol>
```

---

## 13. HTML Forms

- **Explanation:** Interactive containers used to collect user inputs and send data to a server.
- **Example:**

```html
<form action="/submit" method="POST">
  <label for="username">User:</label>
  <input type="text" id="username" name="username" />
  <input type="submit" value="Send" />
</form>
```

---

## 14. HTML Iframes

- **Explanation:** Inline frames (`<iframe>`) used to embed external HTML documents inside the current document.
- **Example:**

```html
<iframe
  src="https://example.com"
  width="600"
  height="400"
  title="Embedded Webpage"
></iframe>
```

---

## 15. HTML Layout

- **Explanation:** Structuring web pages using semantic container tags like `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>`.
- **Example:**

```html
<header>Header Content</header>
<nav>Navigation Links</nav>
<main>
  <section>Body Content</section>
</main>
<footer>Footer Info</footer>
```

---

## 16. HTML Doctypes

- **Explanation:** Mandatory declaration placed at the very top of a document to inform browsers of the HTML version used.
- **Example:**

```html
<!DOCTYPE html>
<!-- HTML5 Doctype Declaration -->
```

---

## 17. HTML Head

- **Explanation:** Container `<head>` holding metadata, page title, scripts, and stylesheet imports not displayed directly on page.
- **Example:**

```html
<head>
  <title>Page Title</title>
  <link rel="stylesheet" href="style.css" />
</head>
```

---

## 18. HTML Meta

- **Explanation:** Metadata elements defining character encoding, page description, keywords, author, and viewport settings.
- **Example:**

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

---

## 19. HTML Scripts

- **Explanation:** The `<script>` tag embeds or references executable JavaScript logic for interactive page behavior.
- **Example:**

```html
<script src="app.js"></script>
<script>
  console.log("Interactive script running");
</script>
```

---

## 20. HTML Media

- **Explanation:** Encompasses multimedia elements including images, sound, vector graphics, and video streams.
- **Example:**

```html
<!-- Generic media embedding syntax -->
<embed src="file.swf" type="application/x-shockwave-flash" />
```

---

## 21. HTML Audio

- **Explanation:** Embeds sound files natively into a page with playable browser playback controls.
- **Example:**

```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
```

---

## 22. HTML Object

- **Explanation:** Generic container tag (`<object>`) for embedding external multimedia files, PDFs, or interactive applets.
- **Example:**

```html
<object
  data="document.pdf"
  type="application/pdf"
  width="500"
  height="600"
></object>
```

---

## 23. HTML Video

- **Explanation:** Native video player element supporting playback, subtitles, and standard controls.
- **Example:**

```html
<video width="640" height="360" controls poster="thumbnail.jpg">
  <source src="movie.mp4" type="video/mp4" />
</video>
```

---

## 24. HTML YouTube

- **Explanation:** Embedding hosted YouTube video players using an `<iframe>` embed target.
- **Example:**

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  frameborder="0"
  allowfullscreen
></iframe>
```

---

## 25. HTML Media Tags

- **Explanation:** Comprehensive set of multimedia markup tags: `<audio>`, `<video>`, `<source>`, `<embed>`, and `<track>`.
- **Example:**

```html
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English" />
</video>
```

---

## 26. HTML Summary

- **Explanation:** Summary of basic HTML capabilities providing structural scaffolding for all modern web content.
- **Example:**

```html
<!-- Core structure summary -->
<!DOCTYPE html>
<html>
  <head></head>
  <body></body>
</html>
```

---

## 27. HTML5

- **Explanation:** The 5th major version of HTML introducing semantic tags, web APIs, offline storage, and native multimedia.
- **Example:**

```html
<!DOCTYPE html>
<!-- Standard HTML5 Document Identifier -->
```

---

## 28. HTML5 Introduction

- **Explanation:** Modern web standard eliminating reliance on plugins like Flash while boosting performance and accessible design.
- **Example:**

```html
<!-- Clean HTML5 mobile-ready setup -->
<!DOCTYPE html>
<html lang="en"></html>
```

---

## 29. HTML5 New Elements

- **Explanation:** Semantic and UI tags introduced in HTML5 such as `<article>`, `<aside>`, `<figure>`, `<mark>`, and `<time>`.
- **Example:**

```html
<article>
  <h2>Article Title</h2>
  <p>Published on <time datetime="2026-11-09">Today</time></p>
</article>
```

---

## 30. HTML5 Video

- **Explanation:** Standardized video container support eliminating external third-party media players.
- **Example:**

```html
<video width="320" height="240" autoplay muted loop>
  <source src="clip.mp4" type="video/mp4" />
</video>
```

---

## 31. HTML5 Audio

- **Explanation:** Standardized native playback tag for audio files with customizable DOM controls.
- **Example:**

```html
<audio id="myAudio" src="music.mp3"></audio>
<button onclick="document.getElementById('myAudio').play()">Play Music</button>
```

---

## 32. HTML5 SVG

- **Explanation:** Scalable Vector Graphics defined directly in XML markup for crisp rendering at any resolution.
- **Example:**

```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="blue" />
</svg>
```

---

## 33. HTML5 Geolocation (Deprecated)

- **Explanation:** Browser API allowing users to share their geographic coordinates with trusted web applications.
- **Example:**

```javascript
navigator.geolocation.getCurrentPosition((pos) => {
  console.log("Latitude: " + pos.coords.latitude);
  console.log("Longitude: " + pos.coords.longitude);
});
```

---

## 34. HTML5 Web Storage (Deprecated)

- **Explanation:** Client-side key-value storage mechanisms (`localStorage` persistent across sessions, `sessionStorage` per session).
- **Example:**

```javascript
localStorage.setItem("user", "Alice"); // Persists after browser restart
sessionStorage.setItem("token", "123"); // Cleared when tab closes
```

---

## 35. HTML5 App Cache (Deprecated)

- **Explanation:** Legacy offline caching mechanism (`manifest` attribute) replaced by modern Service Workers.
- **Example:**

```html
<!-- Deprecated in favor of Service Workers -->
<html manifest="example.appcache"></html>
```

## 36. HTML5 Tags List

- **Explanation:** Comprehensive collection of modern HTML5 semantic elements used to construct modern websites.
- **Example:**

```html
<!-- Modern HTML5 layout structure -->
<header></header>
<nav></nav>
<main>
  <section>
    <article></article>
  </section>
  <aside></aside>
</main>
<footer></footer>
```

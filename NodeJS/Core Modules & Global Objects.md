# Core Modules & Global Objects

- **Topic:** Node.js

- **Instructor: RAHUL KP**

## 1. Global Objects & Console Methods

Unlike browser environments (which rely on the `window` object), Node.js uses `global` as its global namespace.

### Key Global Objects

- `__dirname`: The directory name of the current module.
- `__filename`: The file name of the current module.
- `Buffer`: Used for handling binary data streams.
- `process`: Provides information about, and control over, the current Node.js process.
- `setTimeout` / `setInterval` / `setImmediate`: Timer scheduling functions.

### Console Methods

- `console.log()` / `console.error()`: Output standard log and error messages.
- `console.table()`: Displays tabular data as a clean grid.
- `console.time()` / `console.timeEnd()`: Measures execution duration for performance benchmarking.

---

## 2. Process Events, Methods & Properties

The `process` object is an instance of `EventEmitter`.

```javascript
// Process Properties & Events
console.log("Process Architecture:", process.arch);
console.log("Platform:", process.platform);
console.log("Process ID:", process.pid);

process.on("exit", (code) => {
  console.log(`Node process exiting with code: ${code}`);
});
```

---

## 3. File Systems (`fs` Module)

The `fs` module provides file system operations in both synchronous and asynchronous flavors.

```javascript
const fs = require("fs");

// Asynchronous Directory and File Creation
fs.mkdir("./temp-dir", { recursive: true }, (err) => {
  if (err) throw err;
  console.log("Directory created successfully.");

  fs.writeFile(
    "./temp-dir/notes.txt",
    "Node.js File System Module Demo",
    (err) => {
      if (err) throw err;
      console.log("File written successfully.");
    },
  );
});
```

---

## 4. Streams (Types, Piping & Chaining)

Streams are data-handling objects that read or write data continuously in chunks rather than loading everything into memory.

### Types of Streams

- **Readable:** Streams from which data can be read (e.g., `fs.createReadStream()`).
- **Writable:** Streams to which data can be written (e.g., `fs.createWriteStream()`).
- **Duplex:** Streams that are both Readable and Writable (e.g., `TCP sockets`).
- **Transform:** Duplex streams that can modify or transform data as it is written and read (e.g., `zlib.createGzip()`).

### Piping and Chaining Example

```javascript
const fs = require("fs");
const zlib = require("zlib");

// Compress a file using stream piping and chaining
fs.createReadStream("input.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("input.txt.gz"));

console.log("File compressed successfully via streams.");
```

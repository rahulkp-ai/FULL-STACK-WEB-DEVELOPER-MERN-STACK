# Advanced Node.js Topics

- **Topic:** Advanced Node.js Topics

- **Instructor: RAHUL KP**

## 1. File Uploads (Formidable & Multer)

Handling `multipart/form-data` for file uploads in web applications.

- **Multer:** A Node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files in Express applications.
- **Formidable:** A popular Node.js module for parsing form data, especially file uploads, with robust stream handling capabilities.

---

## 2. Scaling Applications

Node.js is single-threaded, but can scale across multi-core CPU architectures using child processes.

- **`exec()`:** Spawns a shell and runs a command, buffering the output in memory. Best for short-running shell commands.
- **`spawn()`:** Launches a new process with a stream-based interface, avoiding memory buffering overhead. Ideal for large data outputs.
- **`fork()`:** A special instance of `spawn()` designed specifically to spawn new Node.js worker processes, enabling robust Inter-Process Communication (IPC).
- **`execFile()`:** Similar to `exec()`, but directly executes the file without spawning a shell, providing higher security and performance.

```mermaid
graph TD
    A[Main Node Process] -->|child_process.fork()| B[Worker Process 1]
    A -->|child_process.fork()| C[Worker Process 2]
    A -->|child_process.spawn()| D[External CLI Task]
```

---

## 3. Packaging Applications

Bundling Node.js applications into standalone executable binaries for distribution without requiring target machines to pre-install Node.js.

- **Pkg:** Packages Node.js projects into executable binaries for Windows, macOS, and Linux by bundling your script assets and runtime dependencies.
- **Nexe:** A compiler that bundles Node.js applications into single executable binaries.
- **JXCore:** An enterprise-grade multi-threaded Node.js packaging and execution engine.

```mermaid
graph TD
    A[Client Request] -->|HTTP / WebSockets| B[Node.js Single-Threaded Event Loop]
    B -->|Non-Blocking I/O| C[(Database / File System)]
    C -->|Async Callback / Promise| B
    B -->|Response| A
```

```mermaid
graph TD
    A[Incoming Requests / Timers] --> B[Event Loop Phases]
    B -->|Timers| C[setTimeout / setInterval]
    B -->|Poll| D[I/O Events / File Reads / Network]
    B -->|Check| E[setImmediate]
    B -->|Close Callbacks| F[Socket Close Events]
    D -->|Callback Queue| B

```

# Start — Landy React Template

## Project Overview

- **Framework:** React 18 + TypeScript (Create React App / react-scripts)
- **UI Library:** Ant Design (antd v4)
- **Styling:** styled-components
- **Routing:** react-router-dom v5
- **i18n:** i18next

## Prerequisites

- Node.js >= 16
- npm >= 8

## Install Dependencies

```bash
npm install
```

If port 3000 is already in use, specify an alternate port:

```bash
PORT=3001 npm start
```

## Environment Variables

Create a `.env.local` file in the project root for any environment-specific configuration:

```bash
# .env.local
PORT=3000
```

## Development Server

```bash
npm start
```

Opens `http://localhost:3000` in your browser. Hot Module Replacement (HMR) is enabled — changes are reflected live.

## Production Build

```bash
npm run build
```

Output is written to `build/`.

## Running Tests

```bash
npm test
```

## Available Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm start`    | Start development server (port 3000) |
| `npm run build`| Create production build              |
| `npm test`     | Run Jest test suite                  |
| `npm run eject`| Eject react-scripts (irreversible)   |

## Project Structure

```
react-template/
├── public/          # Static assets
├── src/
│   ├── common/      # Shared components (Container, SvgIcon, etc.)
│   ├── components/   # Page sections (Header, Footer, ContactForm, etc.)
│   ├── i18n/        # Internationalization config
│   ├── App.tsx
│   └── index.tsx     # Entry point
├── package.json
├── tsconfig.json
└── .env.local        # (if created)
```

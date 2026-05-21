# Modern Redux Calculator

A clean, modern calculator built with React, Tailwind CSS, Redux Toolkit, and Vite.

## Features
- Digit buttons `0-9`
- Arithmetic operations: add, subtract, multiply, divide
- Clear (`C`), equals (`=`), undo, and redo
- Responsive, polished UI powered by Tailwind CSS
- State management using Redux Toolkit

## Prerequisites
- Node.js 18+ (or compatible LTS)
- npm (bundled with Node.js)

## Setup
1. Open a terminal in the project folder:
   ```bash
   cd "c:\Users\dharmendra.sehgal\ws\IGP\Practice\AI\CalculatorWithGitHubCopilot"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Run locally
Start the Vite development server:
```bash
npm run dev
```

Then open the local URL shown in the terminal, typically `http://localhost:5173` or the next available port if 5173 is already in use.

## Build for production
Create an optimized production bundle:
```bash
npm run build
```

## Preview production build
After building, preview the production output locally:
```bash
npm run preview
```

## Project structure
- `index.html` — application entry HTML file
- `src/main.jsx` — React entry point
- `src/App.jsx` — calculator UI and button logic
- `src/store.js` — Redux store setup
- `src/features/calculatorSlice.js` — calculator state logic and undo/redo behavior
- `src/index.css` — Tailwind base styles and custom button styles

## Notes
- The calculator UI is styled with Tailwind CSS utilities and a simple modern theme.
- Undo and Redo are implemented via Redux state history snapshots.

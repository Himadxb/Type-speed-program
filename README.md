# ⌨️ Type Speed Program

A modern, highly polished web application designed to measure typing speed (WPM) and accuracy. Built with React, TypeScript, and Vanilla CSS, this project serves as a comprehensive demonstration of modern frontend development practices, clean architecture, and UI/UX polish.

## ✨ Features

This isn't just a basic typing test. It includes several advanced features to showcase state management, logic, and data persistence:

- **📊 Measurable KPIs:** Real-time calculation of Gross WPM and exact Accuracy percentages.
- **⏱️ Configurable Timer:** Users can select between 15s, 30s, and 60s typing bursts.
- **🎚️ Difficulty Modes:**
  - **Easy:** Common, lowercase words.
  - **Medium:** Longer, technical terms (e.g., "algorithm", "bandwidth").
  - **Hard:** Specialized vocabulary with complex capitalization.
- **🔣 Punctuation Mode:** A toggle to inject dynamic grammar (commas, periods, question marks) into the typing text for an extra layer of difficulty.
- **💾 Data Persistence (Session History):** Automatic saving of session data to `localStorage`. Your progress isn't lost on refresh!
- **📈 Results Visualization:** A custom-built SVG line chart tracking your Words Per Minute performance across your last 10 sessions.
- **💅 UI Polish:** Glassmorphism design system, smooth CSS animations, modern typography, and a dark-mode oriented aesthetic—all achieved without heavy CSS frameworks.
- **🧪 Automated Tests:** Core business logic (metrics calculations and text generation) is verifiable via `vitest` unit tests.

## 🛠️ Technology Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (CSS Variables, Flexbox/Grid, custom animations)
- **Testing:** Vitest
- **Data Storage:** Browser LocalStorage API

## 🚀 Getting Started

To run this project locally, simply clone the repository and execute the following commands:

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 🧪 Running Tests

Unit tests are included for the core logic utilities to ensure the accuracy of scoring and text generation.

```bash
npm run test
# OR
npx vitest run
```

## 🏗️ Architecture & Code Quality Highlights

- **Custom Hooks:** Logic is carefully extracted into `useTyper.ts` and `useTimer.ts` for reusability and clean component files.
- **Separation of Concerns:** Business logic (WPM calculation, text generation) is decoupled from React components and placed in `src/utils/`.
- **Component-Driven:** Distinct, focused components like `SettingsBar`, `Typer`, and `ResultsChart`.
- **Type Safety:** Full TypeScript implementation preventing runtime errors.

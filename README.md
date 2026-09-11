# 🏷 Expense Tracker

A responsive personal expense tracker built with React which records income and expenses, organises them by category, set monthly budgets and you finally see where my money goes through an interactive dashboard with charts.

## 📌 Project goals

--This project was built as an individual assignment to demonstrate a working understanding of every layer of a modern React application, from setup to deployment:
--Project setup & tooling — scaffolding with Vite, configuring a linter (oxlint) and CI so code quality is checked automatically on every push
--Routing — multi-page navigation with React Router, including a layout shared across pages
--State management — global application state built entirely with the Context API and custom hooks, deliberately without a state management library, to understand what those libraries abstract away
--Persistence — a reusable useLocalStorage hook so the app survives a page refresh with no backend
--Component design — reusable, composable UI (modals, empty states, badges, forms) shared across features rather than duplicated per page
Responsive & accessible UI — a layout that adapts from mobile to desktop, plus a light/dark theme system driven by CSS variables
--Shipping — a production build deployed to a static host, with a clean git history showing incremental, understandable progress
--Every line in this codebase should be explainable — the goal wasn't just a working app, but a genuine understanding of how each piece fits together.

## 📌 Real world problems solved by this project

--Overspending goes unnoticed until it's too late — the per-category and global budget progress bars, with color-coded warnings (green → yellow → red) and an explicit over-budget message, surface the problem while it's happening, not at the end of the month.
--"Where did my money go?" has no easy answer — the spending-by-category chart breaks expenses down visually, so patterns (e.g. too much on Entertainment) are obvious at a glance instead of requiring manual tallying.
--Spending feels invisible day-to-day — the spending-over-time chart and the dashboard's running net balance turn scattered transactions into a trend you can actually see.
--Manually tracking income vs. expenses in a notebook or generic spreadsheet is error-prone — validated forms (positive amounts, required fields, sane date ranges) prevent bad data from ever being entered in the first place.
--Categorizing spending is tedious if categories don't fit your life — default categories cover common cases, but custom categories with their own color mean the app adapts to the user, not the other way around.
--Losing your data on refresh is a common pitfall of small personal-finance tools — everything persists to localStorage, so a browser refresh or accidental tab close never costs you your history.
--Finding one transaction in a long list is slow — filters (month, year, type, category) plus debounced note search narrow things down instantly instead of scrolling.
--Budgeting tools are often desktop-only — the responsive layout means budgets and spending can be checked and updated from a phone just as easily as a laptop.

## 🖥 Features

--Transactions — add, edit, and delete income/expense entries with amount, category, date, and note, with full validation
--Categories — sensible defaults plus custom categories with a color picker; safe deletion with reassignment when a category is still in use
Filters & search — filter by month, year, type, and category; debounced search over transaction notes
--Budgets — set a monthly limit per category with a progress bar and an over-budget warning; also supports a settable default global income used to color-code your overall net balance
--Dashboard — total income, total expenses, net balance, recent transactions, and two charts (spending by category, spending over time)
--Persistence — all data (transactions, categories, budgets, theme) is saved to localStorage and survives a page refresh
Light/dark theme — toggle persists across sessions and respects your system preference on first load
--Responsive — full desktop sidebar, tablet layout, and a mobile bottom navigation bar
--Empty states — clear messaging for no transactions, no search results, and no chart data

## 🛠 Tech Stack

--React (function components + hooks only)
--React Router for page navigation
--Context API + custom hooks for global state (useTransactions, useCategories, useBudgets, useTheme)
--Recharts for the dashboard charts
--lucide-react for icons
--Intl.NumberFormat for currency formatting (FCFA)
--oxlint for linting
--Vite for tooling and dev server
--No external state management library (Redux/MobX/Zustand) — state is handled entirely with Context + useLocalStorage

## ⚙ Installation & Setup

Node.js 20+
npm
Installation
Bash
Run locally

## 📷 Screenshots

![Homepage Screenshot](coming soon)

🧠 Challenges Faced

--Debouncing — didn't know it existed. Learned why search shouldn't filter on every keystroke, and built useDebounce to delay it.
--Charts — first time using Recharts. Had to learn the data shape each chart needs and how to memoize it with useMemo.
--useState doesn't update on prop change — the edit form bug. Fixed using key to force a remount instead.
--CSS leaking between components — styles in one file accidentally affected buttons in another, since CSS isn't scoped per-component.
--Typos that silently broke things — classname vs className, toLowercase vs toLowerCase, .Id vs .id, and similar.
--Theming from scratch — building light/dark mode with CSS variables and a data-theme attribute.
--Switching linters mid-project — moved from ESLint to oxlint, including resolving a real package-lock.json merge conflict.

Feature improvements (planned)
--Global income & savings tracker
--Recurring transactions
--Multi-month/yearly comparison view
--Export/import data
--Multiple accounts/wallets
--Budget rollover between months
--Budget limit notifications
--Shared/family budgets
--Multi-currency support

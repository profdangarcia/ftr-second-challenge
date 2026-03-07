# Financy

Personal finance app: transactions (income/expenses), categories, and a period summary dashboard.

## Stack

- **Frontend:** React, TypeScript, Vite, Apollo Client, React Router, Tailwind CSS, Zustand
- **Backend:** Node.js, TypeScript, Apollo Server, TypeGraphQL, Prisma, SQLite

## Prerequisites

- **Node.js** – Use the version defined in [.nvmrc](.nvmrc). With nvm: `nvm use`.
- **Linux / WSL2** – When running the desktop app, install Electron system dependencies:
  ```bash
  sudo apt update && sudo apt install -y libgtk-3-0 libnotify4 libnss3 libxss1 libasound2 libxtst6
  ```

## Projects

- **[backend/](backend/)** – GraphQL API (queries, auth and transaction/category mutations)
- **[frontend/](frontend/)** – Web app (login, dashboard, transactions, categories)
- **[desktop/](desktop/)** – Electron app that runs the frontend in a desktop window (backend and frontend run in separate terminals). Includes scripts to build installers (Linux, Windows, macOS); see the desktop README.

See each folder's README for how to run and configure.

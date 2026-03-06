# Financy

Personal finance app: transactions (income/expenses), categories, and a period summary dashboard.

## Stack

- **Frontend:** React, TypeScript, Vite, Apollo Client, React Router, Tailwind CSS, Zustand
- **Backend:** Node.js, TypeScript, Apollo Server, TypeGraphQL, Prisma, SQLite

## Pré-requisitos

- **Node.js** – Use a versão definida em [.nvmrc](.nvmrc). Com nvm: `nvm use`.
- **Linux / WSL2** – Ao rodar o app desktop, instale as dependências do Electron:
  ```bash
  sudo apt update && sudo apt install -y libgtk-3-0 libnotify4 libnss3 libxss1 libasound2 libxtst6
  ```

## Projects

- **[backend/](backend/)** – GraphQL API (queries, auth and transaction/category mutations)
- **[frontend/](frontend/)** – Web app (login, dashboard, transactions, categories)
- **[desktop/](desktop/)** – App Electron que roda o frontend em uma janela desktop (backend e frontend em terminais separados). Inclui scripts para gerar instaladores (Linux, Windows, macOS); ver README do desktop.

See each folder's README for how to run and configure.

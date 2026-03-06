# Financy Desktop

App Electron que abre o frontend do Financy em uma janela desktop. O backend e o frontend são executados **em terminais separados**.

## Pré-requisitos

- Node.js (versão do [.nvmrc](../.nvmrc) na raiz do repositório: `nvm use`)
- Backend e frontend do projeto (pastas `backend/` e `frontend/` na raiz)

## Desenvolvimento

1. **Terminal 1 – Backend**  
   Na raiz do repositório:
   ```bash
   cd backend && npm run dev
   ```
   O backend sobe na porta 4000.

2. **Terminal 2 – Frontend**  
   Na raiz do repositório:
   ```bash
   cd frontend && npm run dev
   ```
   O frontend sobe em http://localhost:5173.

3. **Terminal 3 – Desktop**  
   Na raiz do repositório:
   ```bash
   cd desktop && npm run dev
   ```
   O Electron abre uma janela carregando http://localhost:5173. O DevTools é aberto automaticamente em modo desenvolvimento.

## Scripts

| Script   | Descrição |
|----------|-----------|
| `npm run dev`   | Compila o processo main e inicia o Electron (carrega o frontend em dev). |
| `npm run build` | Compila o TypeScript do processo main para `dist/`. |
| `npm run start` | Inicia o Electron (use após `npm run build`; em dev prefira `npm run dev`). |

## Build do frontend (opcional)

Para testar o app com o build estático do frontend em vez do servidor Vite:

1. Build do frontend com a URI do GraphQL:
   ```bash
   cd frontend && VITE_GRAPHQL_URI=http://localhost:4000/graphql npm run build
   ```
2. Subir o backend (terminal 1) e rodar o desktop com `NODE_ENV=production`:
   ```bash
   cd desktop && NODE_ENV=production npm run start
   ```
   A janela passará a carregar os arquivos de `frontend/dist` em vez de http://localhost:5173.

## Estrutura

- `src/main.ts` – processo principal do Electron (janela e carregamento da UI).
- `src/env.ts` – paths do backend e do frontend e flag de ambiente.
- `dist/` – saída do `tsc` (gerada por `npm run build`).

Empacotamento/instalador não estão previstos nesta etapa.

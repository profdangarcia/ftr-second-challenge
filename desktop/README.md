# Financy Desktop

App Electron que abre o frontend do Financy em uma janela desktop. O backend e o frontend são executados **em terminais separados**.

## Pré-requisitos

- Node.js (versão do [.nvmrc](../.nvmrc) na raiz do repositório: `nvm use`)
- Backend e frontend do projeto (pastas `backend/` e `frontend/` na raiz)
- **Linux / WSL2** – Dependências de sistema para o Electron (GTK, etc.):
  ```bash
  sudo apt update && sudo apt install -y libgtk-3-0 libnotify4 libnss3 libxss1 libasound2 libxtst6
  ```

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
| `npm run build:icon` | Gera ícone PNG a partir do logo do frontend para o instalador. |
| `npm run build:ui` | Gera o build do frontend e copia para `frontend-dist/` (uso no empacotamento). |
| `npm run build:backend` | Prepara o backend compilado em `backend-packaged/` (uso no empacotamento). |
| `npm run dist` | Gera instaladores (deb, AppImage, nsis, dmg) em `release/`. |
| `npm run pack` | Gera o app empacotado sem instalador (pasta em `release/`) para testes. |

## Empacotamento

É possível gerar versões instaláveis do app (Linux, Windows, macOS) a partir da pasta `desktop/`.

**Pré-requisitos:** Node.js, builds do frontend e do backend funcionando (o script `dist` roda os builds necessários).

**Comando para gerar instaladores:**

```bash
cd desktop && npm run dist
```

Os instaladores são gerados em **`desktop/release/`**:

- **Linux:** `.deb` e `AppImage`
- **Windows:** instalador NSIS (`.exe`)
- **macOS:** `.dmg`

Para testar o app empacotado sem instalar (pasta descompactada):

```bash
cd desktop && npm run pack
```

O executável estará em `release/linux-unpacked/`, `release/win-unpacked/` ou `release/mac/` conforme o sistema.

## Estrutura

- `src/main.ts` – processo principal do Electron (janela, spawn do backend quando empacotado).
- `src/env.ts` – paths do backend e do frontend (dev vs empacotado).
- `dist/` – saída do `tsc` (gerada por `npm run build`).
- `scripts/copy-ui.js` – copia o build do frontend para `frontend-dist/`.
- `scripts/prepare-backend.js` – monta o backend para `backend-packaged/`.
- `scripts/build-icon.js` – gera `resources/icon.png` a partir do logo do frontend.

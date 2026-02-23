# Financy – Frontend

Interface web do Financy (React + TypeScript + Vite + Apollo Client + Tailwind).

## Como executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar ambiente

Copie o arquivo de exemplo e ajuste se precisar:

```bash
cp .env.example .env
```

Variável usada: `VITE_GRAPHQL_URI` (padrão: `http://localhost:4000/graphql`). O backend deve estar rodando nesse endpoint.

### 3. Subir o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação sobe em **http://localhost:5173** (ou na porta exibida no terminal).

### Outros comandos

- `npm run build` – build de produção
- `npm run preview` – preview do build
- `npm run lint` – ESLint

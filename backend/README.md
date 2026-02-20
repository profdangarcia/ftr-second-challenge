# Financy – Backend

API GraphQL (Apollo Server + TypeScript + Prisma + SQLite) para o app Financy.

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

Variáveis usadas: `DATABASE_URL` (ex.: `file:./dev.db` para SQLite) e `JWT_SECRET`.

### 3. Banco de dados

Criar/atualizar as tabelas:

```bash
npm run migrate
```

(Opcional) Popular com usuário e dados de exemplo:

```bash
npm run seed
```

### 4. Subir o servidor

```bash
npm run dev
```

O servidor sobe na porta **4000** (ou na definida em `PORT` no `.env`).

### 5. Apollo Server / GraphQL

Abra no navegador:

**http://localhost:4000/graphql**

Você verá a interface do **Apollo Sandbox**, onde dá para executar queries e mutations. Para operações que exigem login, use o header **HTTP Headers** e informe o token:

```json
{
  "Authorization": "Bearer SEU_TOKEN_JWT"
}
```

Obtenha o token fazendo a mutation `login` (ou `register`) e use o valor retornado em `token`.

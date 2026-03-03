# Financy – Backend

GraphQL API (Apollo Server + TypeScript + Prisma + SQLite) for the Financy app.

## How to run

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example file and adjust if needed:

```bash
cp .env.example .env
```

Variables used: `DATABASE_URL` (e.g. `file:./dev.db` for SQLite) and `JWT_SECRET`.

### 3. Database

Create or update the tables:

```bash
npm run migrate
```

(Optional) Seed with a sample user and data:

```bash
npm run seed
```

### 4. Start the server

```bash
npm run dev
```

The server runs on port **4000** (or the value set in `PORT` in `.env`).

### 5. Apollo Server / GraphQL

Open in your browser:

**http://localhost:4000/graphql**

You will see the **Apollo Sandbox** interface, where you can run queries and mutations. For operations that require login, use the **HTTP Headers** section and pass the token:

```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

Get the token by running the `login` (or `register`) mutation and use the value returned in `token`.

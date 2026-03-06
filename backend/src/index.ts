import 'reflect-metadata'
import express from 'express'
import type { Server } from 'node:http'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { buildSchema } from 'type-graphql'
import { expressMiddleware } from '@as-integrations/express5'
import { HealthResolver } from './resolvers/health.resolver'
import { AuthResolver } from './resolvers/auth.resolver'
import { CategoryResolver } from './resolvers/category.resolver'
import { TransactionResolver } from './resolvers/transaction.resolver'
import { DashboardResolver } from './resolvers/dashboard.resolver'
import { buildContext } from './graphql/context'

const PORT = process.env.PORT ?? 4000
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*'

export interface StartServerOptions {
  port?: number
  databaseUrl?: string
  corsOrigin?: string
  emitSchemaFile?: string | false
}

export async function startServer(options: StartServerOptions = {}): Promise<Server> {
  const port = options.port ?? Number(process.env.PORT) ?? 4000
  const corsOrigin = options.corsOrigin ?? process.env.CORS_ORIGIN ?? '*'
  const emitSchemaFile = options.emitSchemaFile !== undefined ? options.emitSchemaFile : './schema.graphql'

  if (options.databaseUrl) {
    process.env.DATABASE_URL = options.databaseUrl
  }

  const app = express()

  app.use(
    cors({
      origin: corsOrigin,
      credentials: true,
    })
  )

  const schema = await buildSchema({
    resolvers: [HealthResolver, AuthResolver, CategoryResolver, TransactionResolver, DashboardResolver],
    validate: false,
    emitSchemaFile: emitSchemaFile || undefined,
  })

  const server = new ApolloServer({
    schema,
  })

  await server.start()

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: buildContext,
    })
  )

  return new Promise<Server>((resolve) => {
    const httpServer = app.listen(port, () => {
      console.log(`Server started on port ${port}!`)
      resolve(httpServer)
    })
  })
}

const isMain = process.argv[1]?.endsWith('index.js') ?? false
if (isMain) {
  startServer()
}

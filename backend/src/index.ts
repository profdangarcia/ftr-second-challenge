import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { buildSchema } from 'type-graphql'
import { expressMiddleware } from '@as-integrations/express5'
import { HealthResolver } from './resolvers/health.resolver'
import { AuthResolver } from './resolvers/auth.resolver'
import { CategoryResolver } from './resolvers/category.resolver'
import { TransactionResolver } from './resolvers/transaction.resolver'
import { buildContext } from './graphql/context'

const PORT = process.env.PORT ?? 4000
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*'

async function bootstrap() {
  const app = express()

  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true,
    })
  )

  const schema = await buildSchema({
    resolvers: [HealthResolver, AuthResolver, CategoryResolver, TransactionResolver],
    validate: false,
    emitSchemaFile: './schema.graphql',
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

  app.listen(
    { port: Number(PORT) },
    () => {
      console.log(`Servidor iniciado na porta ${PORT}!`)
    }
  )
}

bootstrap()

import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createContext } from './context'
import { schema } from './schemas'

const app = express()

const server = new ApolloServer({
  schema,
  context: (expressContext) => createContext(expressContext)
});

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at  http://localhost:4000${server.graphqlPath}`)
})
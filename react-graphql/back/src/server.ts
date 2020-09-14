import { ApolloServer } from 'apollo-server'
import { createContext } from './context'
import { schema } from './schemas'

const server = new ApolloServer({ schema, context: createContext });

server.listen({ port: 8000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})
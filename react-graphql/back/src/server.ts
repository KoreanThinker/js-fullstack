import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import { createContext } from './context'
import { schema } from './schemas'
import morgan from 'morgan'
require('dotenv').config()

const app = express()

const server = new ApolloServer({
  schema,
  context: createContext
});


if (process.env.NODE_ENV === 'production') {
  // app.use(morgan('combined'))
  // app.use(cors({
  //   origin: ['http://xxx.com'],
  //   credentials: true
  // }))
} else {
  app.use(morgan('dev'))
  // app.use(cors({
  //   origin: true,
  //   credentials: true
  // }))
}

app.get('/', (req, res) => {
  res.send('Server is running');
});

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at  http://localhost:4000${server.graphqlPath}`)
})
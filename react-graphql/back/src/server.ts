import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import { createContext } from './context'
import { schema } from './schema'

require('dotenv').config()


const app = express()

const server = new ApolloServer({
  schema,
  context: createContext,
  uploads: {
    maxFileSize: 10000000,
    maxFiles: 10
  },
  playground: {
    settings: {
      "request.credentials": 'include'
    },
  }
});


if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
  // app.use(cors({
  //   origin: ['http://xxx.com'],
  //   credentials: true
  // }))
} else {
  // app.use(morgan('dev'))
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.get('/', (req, res) => {
  res.send('Server is running');
});


server.applyMiddleware({
  app,
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
})

app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at  http://localhost:4000${server.graphqlPath}`)
})
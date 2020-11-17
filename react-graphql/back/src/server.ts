import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import hpp from 'hpp'
import helmet from 'helmet'
import cors from 'cors'
import { createContext } from './context'
import { schema } from './schema'

require('dotenv').config()


const app = express()

const server = new ApolloServer({
  schema,
  context: createContext,
  uploads: { maxFileSize: 10000000, maxFiles: 10 },
  playground: process.env.NODE_ENV === 'production' ? false : { settings: { "request.credentials": 'include' } }
})


if (process.env.NODE_ENV === 'production') {
  app.use(hpp())
  app.use(helmet())
  app.use(morgan('combined'))
  app.use(cors({ origin: process.env.FRONT_URL, credentials: true }))
} else {
  app.use(morgan('dev'))
  console.log('dev')
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.get('/', (req, res) => res.send('Server is running'))

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: false
})

const port = process.env.NODE_ENV === 'production' ? 80 : 4000

app.listen({ port }, () => {
  console.log(`🚀  Server ready at  http://localhost:${port}${server.graphqlPath}`)
})
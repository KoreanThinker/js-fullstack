import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import morgan from 'morgan'
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
  playground: process.env.NODE_ENV === 'production' ? false : {
    settings: {
      "request.credentials": 'include'
    },
  }
});




app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.get('/', (req, res) => {
  res.send('Server is running')
})

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
  server.applyMiddleware({
    app,
    cors: {
      origin: process.env.FRONT_URL,
      credentials: true
    }
  })
} else {
  app.use(morgan('dev'))
  server.applyMiddleware({
    app,
    cors: {
      origin: 'http://localhost:3000',
      credentials: true
    }
  })
}

const port = process.env.NODE_ENV === 'production' ? 80 : 4000
app.listen({ port }, () => {
  console.log(`🚀  Server ready at  http://localhost:${port}${server.graphqlPath}`)
})
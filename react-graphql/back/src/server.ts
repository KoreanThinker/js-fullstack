// import { ApolloServer } from 'apollo-server'
// import { createContext } from './src/context'

// const server = new ApolloServer({ schema, context: createContext });

// server.listen({ port: 8000 }).then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
  .catch(e => {
    console.error(e)
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
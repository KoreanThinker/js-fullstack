import { PrismaClient } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'

export const prisma = new PrismaClient()

export interface Context {
    prisma: PrismaClient;
    expressContext: ExpressContext
}

export const createContext = (expressContext: ExpressContext) => {
    return {
        prisma,
        expressContext
    }
}


import { PrismaClient } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
const prisma = new PrismaClient()

export interface Context {
    prisma: PrismaClient
}

export function createContext({ req }: ExpressContext): Context {
    return { prisma }
}
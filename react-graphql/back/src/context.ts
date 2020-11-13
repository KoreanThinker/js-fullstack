import { PrismaClient } from '@prisma/client'
import { gql } from 'apollo-server-express'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { AWSS3Uploader } from './lib/s3Uploader'
import gqlLogger from './utils/gqlLogger'
require('dotenv').config()

export const prisma = new PrismaClient()

export const s3Uploader = new AWSS3Uploader({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    destinationBucketName: 'react-graphql-fullstack',
    region: 'ap-northeast-2'
})

export interface Context {
    prisma: PrismaClient
    expressContext: ExpressContext
    s3Uploader: AWSS3Uploader
}

export const createContext = (expressContext: ExpressContext) => {
    // gqlLogger(expressContext)
    return {
        s3Uploader,
        prisma,
        expressContext
    }
}


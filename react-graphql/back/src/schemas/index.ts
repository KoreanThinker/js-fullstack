import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { makeSchema } from '@nexus/schema'


import Query from "./Query";
import Mutation from "./Mutation";
import Post from "./Post";
import User from "./User";
import Auth from "./Auth";


export const schema = makeSchema({
    types: [Query, Mutation, Post, User, Auth],
    plugins: [nexusSchemaPrisma({})],
    outputs: {
        schema: __dirname + '/../../schema.graphql',
        typegen: __dirname + '/../generated/nexus.ts',
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'prisma',
            },
            {
                source: require.resolve('../context'),
                alias: 'Context',
            },
        ],
    },
})
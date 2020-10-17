import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { makeSchema } from '@nexus/schema'


import * as types from './types'
import * as scalars from './scalars'
import { iUser, userLogin, userLogout } from "./resolvers/user";

export const schema = makeSchema({
    types: [scalars, types, userLogout, userLogin, iUser],
    plugins: [nexusSchemaPrisma({})],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'prisma',
            },
            {
                source: require.resolve('./context'),
                alias: 'Context',
            },
        ],
    },
})
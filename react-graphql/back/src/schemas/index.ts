import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { makeSchema } from '@nexus/schema'


import Query from "./Query";
import Mutation from "./Mutation";
import User from "./User";
import Item from "./Item";
import Partner from "./Partner";
import Order from "./Order";
import Image from "./Image";


export const schema = makeSchema({
    types: [Query, Mutation, User, Item, Partner, Order, Image],
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
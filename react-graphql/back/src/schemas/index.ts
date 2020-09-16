import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { makeSchema, objectType } from '@nexus/schema'


import Post, { createPost, deletePost, longestPostTitle, post, publishPost } from './post'
import { filterPosts, posts } from "./posts";
import User, { user } from "./user";


const Query = objectType({
    name: 'Query',
    definition(t) {
        //posts
        posts(t)
        filterPosts(t)
        //post
        post(t)
        longestPostTitle(t)
        //user
        user(t)
    },
})

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        //post
        createPost(t)
        publishPost(t)
        deletePost(t)
    }
})


export const schema = makeSchema({
    types: [Query, Mutation, Post, User],
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
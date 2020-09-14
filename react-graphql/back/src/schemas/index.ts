import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { makeSchema, objectType } from '@nexus/schema'


import { createPost, deletePost, longestPostTitle, post, publishPost } from './post'
import { filterPosts, posts } from "./posts";


const Query = objectType({
    name: 'Query',
    definition(t) {
        t.crud.user()
        t.crud.post()
        //posts
        filterPosts(t)
        posts(t)
        //post
        post(t)
        longestPostTitle(t)
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

const Post = objectType({
    name: 'Post',
    definition(t) {
        t.model.id()
        t.model.title()
        t.model.content()
        t.model.published()
        t.model.author()
        t.model.authorId()
    },
})

const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.email()
        t.model.posts({
            pagination: false
        })
        t.model.age()
    },
})

export const schema = makeSchema({
    types: [Query, Mutation, Post, User],
    plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
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
import { intArg, ObjectDefinitionBlock, stringArg } from "@nexus/schema/dist/core"
import getUserId from "../utils/getUserId"

//Query
export const post = (t: ObjectDefinitionBlock<"Query">) => t.field('post', {
    type: 'Post',
    args: {
        id: intArg({ required: true }),
    },
    nullable: true,
    resolve: (_, { id }, ctx) => {
        return ctx.prisma.post.findOne({
            where: { id: Number(id) }
        })
    }
})

// Mutation
export const createPost = (t: ObjectDefinitionBlock<"Mutation">) => t.field('createPost', {
    type: 'Post',
    args: {
        title: stringArg({ nullable: false }),
        content: stringArg()
    },
    resolve: (_, { title, content }, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.post.create({
            data: {
                title,
                content,
                published: true,
                author: {
                    connect: { id: Number(userId) },
                },
            },
        })
    }
})

export const publishPost = (t: ObjectDefinitionBlock<"Mutation">) => t.field('publishPost', {
    type: 'Post',
    nullable: true,
    args: {
        id: intArg(),
    },
    resolve: (_, { id }, ctx) => {
        return ctx.prisma.post.update({
            where: { id: Number(id) },
            data: { published: true },
        })
    }
})

export const deletePost = (t: ObjectDefinitionBlock<"Mutation">) => t.field('deletePost', {
    type: 'Post',
    nullable: true,
    args: {
        id: intArg({ required: true })
    },
    resolve: async (_, { id }, ctx) => {
        const userId = getUserId(ctx)
        const post = await ctx.prisma.post.findOne({ where: { id } })
        if (!post) throw new Error('No post')
        if (post.authorId !== Number(userId)) throw new Error('Id not match')
        return ctx.prisma.post.delete({
            where: { id }
        })
    }
})
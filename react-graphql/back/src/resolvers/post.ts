import { intArg, ObjectDefinitionBlock, objectType, stringArg } from "@nexus/schema/dist/core"

//query
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

export const longestPostTitle = (t: ObjectDefinitionBlock<"Query">) => t.string('longestPostTitle', {
    resolve: async (_, args, ctx) => {
        const list = await ctx.prisma.post.findMany()
        let title = ''
        for (const item of list) {
            if (item.title.length > title.length) {
                title = item.title
            }
        }
        return title
    }
})


// mutation
export const createPost = (t: ObjectDefinitionBlock<"Mutation">) => t.field('createPost', {
    type: 'Post',
    args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorEmail: stringArg({ nullable: false }),
    },
    resolve: (_, { title, content, authorEmail }, ctx) => {
        return ctx.prisma.post.create({
            data: {
                title,
                content,
                published: false,
                author: {
                    connect: { email: authorEmail },
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
        id: intArg()
    },
    resolve: (_, { id }, ctx) => {
        return ctx.prisma.post.delete({
            where: { id: Number(id) }
        })
    }
})
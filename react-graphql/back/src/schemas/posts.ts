import { ObjectDefinitionBlock, stringArg } from "@nexus/schema/dist/core"

//query
export const filterPosts = (t: ObjectDefinitionBlock<"Query">) => t.list.field('filterPosts', {
    type: 'Post',
    args: {
        searchString: stringArg({ nullable: true }),
    },
    resolve: (_, { searchString }, ctx) => {
        return ctx.prisma.post.findMany({
            where: {
                OR: [
                    { title: { contains: searchString || undefined } },
                    { content: { contains: searchString } },
                ],
            },
        })
    },
})

export const posts = (t: ObjectDefinitionBlock<"Query">) => t.list.field('posts', {
    type: 'Post',
    resolve: (_, args, ctx) => {
        return ctx.prisma.post.findMany({
            where: { published: true },
        })
    },
})

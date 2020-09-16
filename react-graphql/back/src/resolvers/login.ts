import { intArg, ObjectDefinitionBlock, stringArg } from "@nexus/schema/dist/core"

//query
export const emailLogin = (t: ObjectDefinitionBlock<"Mutation">) => t.field('emailLogin', {
    type: 'Post',
    args: {
        title: stringArg({ nullable: false }),
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
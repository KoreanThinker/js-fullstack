import { intArg, ObjectDefinitionBlock, stringArg } from "@nexus/schema/dist/core"
//Query
//Mutation
export const emailLogin = (t: ObjectDefinitionBlock<"Mutation">) => t.field('emailLogin', {
    type: 'Post',
    args: {
        title: stringArg({ nullable: false }),
    },
    resolve: (_, { title, content, authorEmail }, ctx) => {
        return null
    }
})
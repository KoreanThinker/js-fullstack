import { intArg, objectType } from "@nexus/schema"
import { ObjectDefinitionBlock } from "@nexus/schema/dist/core"

const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.email()
        t.model.posts({
            pagination: true
        })
        t.int('postNum', {
            resolve({ id }, args, ctx) {
                return ctx.prisma.post.count({ where: { authorId: id } })
            }
        })
        t.model.age()
    }
})

export const user = (t: ObjectDefinitionBlock<"Query">) => t.field('user', {
    type: 'User',
    args: {
        id: intArg({ required: true }),
    },
    nullable: true,
    resolve: (_, { id }, ctx) => {
        return ctx.prisma.user.findOne({
            where: { id: Number(id) }
        })
    }
})

export default User
import { objectType } from "@nexus/schema"

const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.email()
        t.model.password()
        t.model.posts({
            pagination: true
        })
        t.int('postNum', {
            resolve({ id }, args, ctx) {
                return ctx.prisma.post.count({ where: { authorId: id } })
            }
        })
        t.model.age()
        t.model.test()
    }
})

export default User
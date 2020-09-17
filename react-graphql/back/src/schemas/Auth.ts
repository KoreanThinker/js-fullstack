import { objectType } from "@nexus/schema"

const Auth = objectType({
    name: 'Auth',
    definition(t) {
        t.string('token')
        t.field('user', { type: 'User', nullable: true, })
    }
})

export default Auth
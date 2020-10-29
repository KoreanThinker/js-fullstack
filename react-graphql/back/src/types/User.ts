import { extendType, objectType, unionType } from "@nexus/schema"

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.email()
        t.model.createdAt()
        t.model.orders()
        t.model.sns()
        t.model.cart()
    }
})

// export const IUser = objectType({
//     name: 'IUser',
//     definition(t) {
//         t.model('User').id()
//         t.model('User').name()
//         t.model('User').email()
//         t.model('User').createdAt()
//         t.model('User').orders()
//         t.model('User').sns()
//     }
// })
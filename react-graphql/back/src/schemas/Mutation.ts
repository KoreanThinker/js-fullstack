import { objectType } from "@nexus/schema"
import { login, logout, signup } from "../resolvers/auth"

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        //auth
        signup(t)
        login(t)
        logout(t)
        //post
    }
})


export default Mutation
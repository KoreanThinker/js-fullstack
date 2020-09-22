import { objectType } from "@nexus/schema"
import { login, signup } from "../resolvers/auth"
import { createPost, deletePost, publishPost } from "../resolvers/post"
import { updateUser } from "../resolvers/user"

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        //auth
        signup(t)
        login(t)
        //post
        createPost(t)
        publishPost(t)
        deletePost(t)
        //user
        updateUser(t)
    }
})


export default Mutation
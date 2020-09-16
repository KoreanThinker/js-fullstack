import { objectType } from "@nexus/schema"
import { createPost, deletePost, publishPost } from "../resolvers/post"

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        //post
        createPost(t)
        publishPost(t)
        deletePost(t)
    }
})


export default Mutation
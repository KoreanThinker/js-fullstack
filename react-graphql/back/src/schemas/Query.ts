import { objectType } from "@nexus/schema"
import { post } from "../resolvers/post"
import { filterPosts, posts } from "../resolvers/posts"
import { user } from "../resolvers/user"

const Query = objectType({
    name: 'Query',
    definition(t) {
        //posts
        posts(t)
        filterPosts(t)
        //post
        post(t)
        //user
        user(t)
    },
})

export default Query
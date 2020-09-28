import { objectType } from "@nexus/schema"
import { partnerLogin, partnerLogout, partnerSignup } from "../resolvers/partner"

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        //partner
        partnerSignup(t)
        partnerLogin(t)
        partnerLogout(t)
    }
})


export default Mutation
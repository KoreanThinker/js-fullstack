import { InMemoryCache, makeVar } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";


export default new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                items: offsetLimitPagination(),
            },
        }
    },
})
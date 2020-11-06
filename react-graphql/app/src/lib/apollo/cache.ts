import { InMemoryCache, makeVar } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const recentSearchKeywordsVar = makeVar(['hi'])
export const searchKeywordVar = makeVar('')

export default new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                items: offsetLimitPagination(),
                recentSearchKeywords: { read() { return recentSearchKeywordsVar() } },
                searchKeyword: { read() { return searchKeywordVar() } }
            },
        }
    },
})
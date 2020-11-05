import { gql, QueryHookOptions } from "@apollo/client";
import { client } from "../lib/apollo";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { ItemsItem } from "./item";

// QUERY/SEARCH
export const SEARCH = gql`
  query ($keyword: String!, $orderBy: String!) {
    search(keyword: $keyword, orderBy: $orderBy) {
      count
      orderBy
      items {
        id
        createdAt
        price
        mainImage
        name
      }
    }
  }
`
interface SearchData {
    search: {
        count: number
        items: ItemsItem[]
        orderBy: string
    }
}
interface SearchVars {
    orderBy: string
    keyword: string
}
export const useSearch = (options?: QueryHookOptions<SearchData, SearchVars>) => createQueryHook<SearchData, SearchVars>(SEARCH, {
    ...options,
    fetchPolicy: 'network-only',
    // onCompleted: (data) => {
    //     console.log(data)
    //     client.cache.evict({ fieldName: 'recentSearchKeywords' }) // remove cache & refetch recent keywords
    // }
})

//QUERY/RECENT_SEARCH_KEYWORDS
export const RECENT_SEARCH_KEYWORDS = gql`
    query {
        recentSearchKeywords {
            keyword
            id
        }
    }
`
interface RecentSearchKeywordData {
    recentSearchKeywords: {
        keyword: string
        id: number
    }[]
}
interface RecentSearchKeywordVars {

}
export const useRecentSearchKeyword = () => createQueryHook<RecentSearchKeywordData, RecentSearchKeywordVars>(RECENT_SEARCH_KEYWORDS, {
    fetchPolicy: 'cache-and-network'
})

//MUTATION/REMOVE_ALL_RECENT_SEARCH_KEYWORDS
export const REMOVE_ALL_RECENT_SEARCH_KEYWORDS = gql`
    mutation {
        removeAllRecentSearchKeywords
    }
`
interface RemoveAllRecentSearchKeywordsData {
    removeAllRecentSearchKeywords: boolean
}
interface RemoveAllRecentSearchKeywordsVars {

}
export const useRemoveAllRecentSearchKeywords = () => createMutationHook<RemoveAllRecentSearchKeywordsData, RemoveAllRecentSearchKeywordsVars>(REMOVE_ALL_RECENT_SEARCH_KEYWORDS, {
    update: (cache, { data }) => {
        cache.evict({ fieldName: 'recentSearchKeywords' }) // remove cache & get new data
    }
})
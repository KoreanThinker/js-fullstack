import { gql, QueryHookOptions } from "@apollo/client";
import { createQueryHook } from "../lib/createApolloHook";
import { ItemsItem } from "./item";

// QUERY/SEARCH
export const SEARCH = gql`
  query ($keyword: String!, $orderBy: String!) {
    search(keyword: $keyword, orderBy: $orderBy) {
      count
      orderBy
      keyword
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
    keyword: string
  }
}
interface SearchVars {
  orderBy: string
  keyword: string
}
export const useSearch = (options?: QueryHookOptions<SearchData, SearchVars>) => createQueryHook<SearchData, SearchVars>(SEARCH, {
  ...options,
  fetchPolicy: 'network-only'
})
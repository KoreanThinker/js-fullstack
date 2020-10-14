import { gql } from "@apollo/client";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";



// QUERY/TEST
export const TEST = gql`
  query {
    user (id: 1) {
    orders {
      id
      item {
id}
    }
  }
  }
`
interface TestData {
  user: any
}
interface TestVars {

}
export const useTest = (options?: any) => createQueryHook<TestData, TestVars>(TEST, options)
import { gql } from "@apollo/client"
import { createQueryHook } from "../lib/createApolloHook"

// QUERY/IS_LOGGED_IN
export const I_USER = gql`
  query {
    iUser {
        id
        name
        email
    }
  }
`
interface IUserData {
    iUser: {
        id: string
        name: string
        email: string
    }
}
interface IUserVars {

}
export const useIUser = () => createQueryHook<IUserData, IUserVars>(I_USER) // SSR 
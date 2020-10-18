import { gql, useApolloClient } from "@apollo/client";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";

// QUERY/I_USER
export const I_USER = gql`
  query {
    iUser {
      name
      email
    }
  }
`
interface IUserData {
  iUser: {
    name: string
    email: string
  }
}
interface IUserVars {

}
export const useIUser = (options?: any) => createQueryHook<IUserData, IUserVars>(I_USER, {
  fetchPolicy: 'cache-first',
  ...options,

})

// MUTATION/LOGIN
const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
        email
        name
    }
  }
`
interface LoginData {
  userLogin: {
    email: string
    name: string
    id: number
  }
}
interface LoginVars {
  email: string
  password: string
}
export const useLogin = () => createMutationHook<LoginData, LoginVars>(LOGIN, {
  errorPolicy: 'all'
})

// MUTATION/LOGOUT
const LOGOUT = gql`
  mutation {
    userLogout 
  }
`
interface LogoutData {
  userLogout: null
}
interface LogoutVars {

}
export const useLogout = () => createMutationHook<LogoutData, LogoutVars>(LOGOUT, {
  update: (cache, { data }) => {
    if (!data) return
    cache.modify({
      id: cache.identify({ __typename: 'IUser' }),
      fields: (_, { DELETE }) => DELETE
    })
  }
})
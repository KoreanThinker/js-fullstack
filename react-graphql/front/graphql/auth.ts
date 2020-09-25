import { gql } from "@apollo/client";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";



// QUERY/IS_LOGGED_IN
export const IS_LOGGED_IN = gql`
  query {
    isLoggedIn
  }
`
interface IsLoggedInData {
  isLoggedIn: boolean
}
interface IsLoggedInVars {

}
export const useIsLoggedIn = () => createQueryHook<IsLoggedInData, IsLoggedInVars>(IS_LOGGED_IN, {
  fetchPolicy: 'cache-first'
}) // SSR 

// MUTATION/SIGNUP
const SIGHUP = gql`
  mutation ($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
        id
    }
  }
`
interface SignupData {
  signup: {
    id: string
  }
}
interface SignupVars {
  email: string
  password: string
  name: string
}
export const useSignup = () => createMutationHook<SignupData, SignupVars>(SIGHUP)

// MUTATION/LOGIN
const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        id
    }
  }
`
interface LoginData {
  login: {
    id: string
  }
}
interface LoginVars {
  email: string
  password: string
}
export const useLogin = () => createMutationHook<LoginData, LoginVars>(LOGIN)

// MUTATION/LOGOUT
const LOGOUT = gql`
  mutation {
    logout 
  }
`
interface LogoutData {
  logout: boolean
}
interface LogoutVars {

}
export const useLogout = () => createMutationHook<LogoutData, LogoutVars>(LOGOUT)
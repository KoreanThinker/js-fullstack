import { gql } from "@apollo/client";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";



// QUERY/IS_LOGGED_IN
export const IS_LOGGED_IN = gql`
  query {
    isPartnerLoggedIn
  }
`
interface IsLoggedInData {
  isPartnerLoggedIn: boolean
}
interface IsLoggedInVars {

}
export const useIsLoggedIn = () => createQueryHook<IsLoggedInData, IsLoggedInVars>(IS_LOGGED_IN, {
  fetchPolicy: 'cache-first'
}) // SSR

// MUTATION/SIGNUP
const SIGNUP = gql`
  mutation ($email: String!, $password: String!, $name: String!) {
    partnerSignup(email: $email, password: $password, name: $name) {
        id
    }
  }
`
interface SignupData {
  partnerSignup: {
    id: string
  }
}
interface SignupVars {
  email: string
  password: string
  name: string
}
export const useSignup = () => createMutationHook<SignupData, SignupVars>(SIGNUP)

// MUTATION/LOGIN
const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    partnerLogin(email: $email, password: $password) {
        id
    }
  }
`
interface LoginData {
  partnerLogin: {
    id: string
  }
}
interface LoginVars {
  email: string
  password: string
}
export const useLogin = () => createMutationHook<LoginData, LoginVars>(LOGIN, { errorPolicy: 'all' })

// MUTATION/LOGOUT
const LOGOUT = gql`
  mutation {
    partnerLogout 
  }
`
interface LogoutData {
  partnerLogout: boolean
}
interface LogoutVars {

}
export const useLogout = () => createMutationHook<LogoutData, LogoutVars>(LOGOUT)
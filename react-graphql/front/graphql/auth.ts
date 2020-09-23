import { gql, MutationHookOptions, QueryHookOptions, useMutation, useQuery } from "@apollo/client";


// QUERY/IS_LOGGED_IN
const IS_LOGGED_IN = gql`
  query {
    isLoggedIn
  }
`
interface IsLoggedInData {
  isLoggedIn: boolean
}
interface IsLoggedInVars {

}
export const useIsLoggedIn = <Data = IsLoggedInData, Vars = IsLoggedInVars>(options?: QueryHookOptions<Data, Vars>) => useQuery<Data, Vars>(IS_LOGGED_IN, {
  fetchPolicy: 'network-only',
  ...options
})


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
export const useSignup = <Data = SignupData, Vars = SignupVars>(options?: MutationHookOptions<Data, Vars>) => useMutation<Data, Vars>(SIGHUP, options)

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
export const useLogin = <Data = LoginData, Vars = LoginVars>(options?: MutationHookOptions<Data, Vars>) => useMutation<Data, Vars>(LOGIN, options)

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
export const useLogout = <Data = LogoutData, Vars = LogoutVars>(options?: MutationHookOptions<Data, Vars>) => useMutation<Data, Vars>(LOGOUT, options)
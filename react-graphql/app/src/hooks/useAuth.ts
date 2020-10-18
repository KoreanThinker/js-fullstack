import { useApolloClient } from "@apollo/client"
import { StackActions, useNavigation } from "@react-navigation/native"
import { useCallback } from "react"
import { I_USER, useLogin, useLogout } from "../graphql/auth"

const useAuth = () => {

    const client = useApolloClient()
    const { dispatch } = useNavigation()
    const [loginRequset] = useLogin()
    const [logoutRequest] = useLogout()

    const checkIsLoggedIn = useCallback(async () => {
        try {
            const { data } = await client.query({ query: I_USER, fetchPolicy: 'network-only' })
            if (data) dispatch(StackActions.replace('Tab'))
        } catch (error) {
            console.log(error)
        }
    }, [])

    const login = useCallback(async (email: string, password: string) => {
        await loginRequset({ variables: { email, password } })
        dispatch(StackActions.replace('Tab'))
    }, [])

    const logout = useCallback(async () => {
        await logoutRequest()
        await client.resetStore()
        dispatch(StackActions.replace('Login'))
    }, [])


    return { login, logout, checkIsLoggedIn }
}

export default useAuth
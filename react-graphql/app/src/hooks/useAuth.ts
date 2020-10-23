import { useApolloClient } from "@apollo/client"
import { StackActions, useNavigation } from "@react-navigation/native"
import { useCallback } from "react"
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { I_USER, useLogout, useKakaoLogin, useFacebookLogin } from "../graphql/auth"

const useAuth = () => {

    const client = useApolloClient()
    const { dispatch } = useNavigation()
    const [kakaoLoginRequest] = useKakaoLogin()
    const [facebookLoginRequest] = useFacebookLogin()
    const [logoutRequest] = useLogout()

    const checkIsLoggedIn = useCallback(async () => {
        try {
            const { data } = await client.query({ query: I_USER, fetchPolicy: 'network-only' })
            if (data) dispatch(StackActions.replace('Tab'))
        } catch (error) {
            console.log(error)
        }
    }, [])

    const kakaoLogin = useCallback(async () => {
        try {
            const token = await KakaoLogins.login([KAKAO_AUTH_TYPES.Talk])
            console.log(token)
            await kakaoLoginRequest({ variables: { token: token.accessToken } })
            dispatch(StackActions.replace('Tab'))
        } catch (error) {
            console.log(error)
        }
    }, [])

    const facebookLogin = useCallback(async () => {
        try {
            const { grantedPermissions } = await LoginManager.logInWithPermissions(["public_profile"])
            if (!grantedPermissions) throw new Error('No Permissions')
            const token = await AccessToken.getCurrentAccessToken()
            if (!token) throw new Error('No Token')
            console.log(token)
            await facebookLoginRequest({ variables: { token: token.accessToken } })
            dispatch(StackActions.replace('Tab'))
        } catch (error) {
            console.log(error)
        }
    }, [])


    const logout = useCallback(async () => {
        try {
            await logoutRequest()
            await client.resetStore()
            LoginManager.logOut()
            await KakaoLogins.logout() // if no refresh token throw error!
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(StackActions.replace('Login'))
        }
    }, [])


    return {
        checkIsLoggedIn,
        kakaoLogin,
        facebookLogin,
        logout
    }
}

export default useAuth
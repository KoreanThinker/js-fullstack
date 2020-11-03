import { useApolloClient } from "@apollo/client"
import { StackActions, useNavigation } from "@react-navigation/native"
import { useCallback, useState } from "react"
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { I_USER, useLogout, useKakaoLogin, useFacebookLogin } from "../graphql/auth"

const useAuth = () => {

    const client = useApolloClient()
    const { dispatch, reset } = useNavigation()
    const [kakaoLoginRequest] = useKakaoLogin()
    const [facebookLoginRequest] = useFacebookLogin()
    const [logoutRequest] = useLogout()
    const [itemId, setItemId] = useState<string | undefined>()

    const checkIsLoggedIn = useCallback(async (itemId?: string) => {
        try {
            setItemId(itemId)
            const { data } = await client.query({ query: I_USER, fetchPolicy: 'network-only' })
            if (data) {
                if (itemId) reset({ index: 1, routes: [{ name: 'Tab' }, { name: 'ItemDetail', params: { itemId } }] })
                else dispatch(StackActions.replace('Tab'))
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const kakaoLogin = useCallback(async () => {
        try {
            const token = await KakaoLogins.login([KAKAO_AUTH_TYPES.Talk])
            const { errors } = await kakaoLoginRequest({ variables: { token: token.accessToken } })
            if (errors) throw new Error('Login Error')
            if (itemId) reset({ index: 1, routes: [{ name: 'Tab' }, { name: 'ItemDetail', params: { itemId } }] })
            else dispatch(StackActions.replace('Tab'))
        } catch (error) {
            console.log(error)
        }
    }, [itemId])

    const facebookLogin = useCallback(async () => {
        try {
            console.log(0)
            const { grantedPermissions } = await LoginManager.logInWithPermissions(["public_profile"])
            console.log(grantedPermissions)
            if (!grantedPermissions) throw new Error('No Permissions')
            console.log(1)
            const token = await AccessToken.getCurrentAccessToken()
            if (!token) throw new Error('No Token')
            console.log(2)
            const { errors } = await facebookLoginRequest({ variables: { token: token.accessToken } })
            if (errors) throw new Error('Login Error')
            if (itemId) reset({ index: 1, routes: [{ name: 'Tab' }, { name: 'ItemDetail', params: { itemId } }] })
            else dispatch(StackActions.replace('Tab'))
        } catch (error) {
            console.log(error)
        }
    }, [itemId])


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
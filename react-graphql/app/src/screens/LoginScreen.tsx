import React, { useCallback, useEffect } from 'react'
import { StyleSheet, TextInput, ToastAndroid, View } from 'react-native'
import { LoginManager, AccessToken } from "react-native-fbsdk";
import BaseButton from '../components/BaseButton'
import useInput from '../hooks/useInput'
import useAuth from '../hooks/useAuth'
import BaseText from '../components/BaseText'
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';

const LoginScreen = () => {

    const [email, onEmailChange] = useInput()
    const [password, onPasswordChange] = useInput()
    const { login, checkIsLoggedIn } = useAuth()

    useEffect(() => { checkIsLoggedIn() }, [])

    const onLogin = useCallback(async () => {
        await login(email, password)
    }, [email, password])

    const onKakao = useCallback(async () => {
        try {
            const token = await KakaoLogins.login([KAKAO_AUTH_TYPES.Talk])
            console.log(token)
        } catch (error) {
            console.log(error)
            ToastAndroid.show('Error:Try again', ToastAndroid.SHORT)
        }
    }, [])

    const onFacebook = useCallback(async () => {
        try {
            const { grantedPermissions } = await LoginManager.logInWithPermissions(["public_profile"])
            if (!grantedPermissions) throw new Error('No Permissions')
            const token = await AccessToken.getCurrentAccessToken()
            if (!token) throw new Error('No Token')
            console.log(token.accessToken)
        } catch (error) {
            console.log(error)
            ToastAndroid.show('Error:Try again', ToastAndroid.SHORT)
        }
    }, [])

    return (
        <View style={styles.container} >
            <TextInput
                value={email}
                onChangeText={onEmailChange}
                placeholder='Email'
                keyboardType='email-address'
            />
            <TextInput
                value={password}
                onChangeText={onPasswordChange}
                placeholder='Password'
                secureTextEntry={true}
            />
            <BaseButton onPress={onLogin} >
                <BaseText>Login</BaseText>
            </BaseButton>
            <BaseButton onPress={onKakao} style={styles.snsBtn} >
                <BaseText>Kakao</BaseText>
            </BaseButton>
            <BaseButton onPress={onFacebook} style={styles.snsBtn} >
                <BaseText >Facebook</BaseText>
            </BaseButton>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    snsBtn: {
        width: 320,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        overflow: 'hidden'
    }
})
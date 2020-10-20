import React, { useCallback, useEffect } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import BaseButton from '../components/BaseButton'
import useInput from '../hooks/useInput'
import useLoginProcess from '../hooks/useAuth'
import BaseText from '../components/BaseText'

const LoginScreen = () => {

    const [email, onEmailChange] = useInput()
    const [password, onPasswordChange] = useInput()
    const { login, checkIsLoggedIn } = useLoginProcess()

    useEffect(() => { checkIsLoggedIn() }, [])

    const onLogin = useCallback(async () => {
        await login(email, password)
    }, [email, password])

    const onKakao = useCallback(() => {

    }, [])

    const onFacebook = useCallback(() => {

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
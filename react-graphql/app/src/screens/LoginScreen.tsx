import React, { useCallback, useEffect } from 'react'
import { StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import BaseButton from '../components/BaseButton'
import { useLogin } from '../graphql/auth'
import useInput from '../hooks/useInput'

const LoginScreen = () => {

    const [email, onEmailChange] = useInput()
    const [password, onPasswordChange] = useInput()
    const [loginRequest, { error }] = useLogin()

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
        }
    }, [error])

    const onLogin = useCallback(() => {
        loginRequest({ variables: { email, password } })
    }, [email, password])

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
                <Text>Login</Text>
            </BaseButton>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})
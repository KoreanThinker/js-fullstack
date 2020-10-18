import React, { useCallback, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import BaseButton from '../components/BaseButton'
import useInput from '../hooks/useInput'
import useLoginProcess from '../hooks/useAuth'

const LoginScreen = () => {

    const [email, onEmailChange] = useInput()
    const [password, onPasswordChange] = useInput()
    const { login, checkIsLoggedIn } = useLoginProcess()

    useEffect(() => { checkIsLoggedIn() }, [])

    const onLogin = useCallback(async () => {
        await login(email, password)
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
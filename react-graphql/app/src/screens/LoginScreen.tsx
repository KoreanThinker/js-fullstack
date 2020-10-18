import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import BaseButton from '../components/BaseButton'
import { useIUser, useLogin } from '../graphql/auth'
import useInput from '../hooks/useInput'

const LoginScreen = () => {

    const { dispatch } = useNavigation()
    const [email, onEmailChange] = useInput()
    const [password, onPasswordChange] = useInput()
    const { data, refetch } = useIUser({ fetchPolicy: 'network_only' })
    const [loginRequest] = useLogin()

    useEffect(() => {
        if (data?.iUser) { //loggedIn
            console.log('loggedin', data.iUser)
            // dispatch({ target: 'Tab', type: 'replace' })
        }
    }, [data])

    const onLogin = useCallback(async () => {
        await loginRequest({ variables: { email, password } })
        await refetch()
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
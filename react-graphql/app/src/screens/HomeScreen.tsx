import React, { useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import BaseButton from '../components/BaseButton'
import { useNavigation } from '@react-navigation/native'
import { useIsLoggedIn, useLogin, useLogout, useTest } from '../graphql/auth'

const HomeScreen = () => {

    const { navigate } = useNavigation()
    const [loginRequest] = useLogin()
    const [logoutRequest] = useLogout()
    const { data, refetch } = useIsLoggedIn()

    const onLogin = useCallback(async () => {
        await loginRequest({ variables: { email: '123@gmail.com', password: '123123' } })
        // refetch()
    }, [])

    const onLogout = useCallback(async () => {
        await logoutRequest()
        // refetch()
    }, [])

    return (
        <View style={{ flex: 1 }} >
            <BaseButton onPress={() => refetch()} >
                <Text>login : {data?.isPartnerLoggedIn ? 'true' : 'false'}</Text>
            </BaseButton>
            <BaseButton onPress={onLogin} >
                <Text>Login</Text>
            </BaseButton>
            <BaseButton onPress={onLogout}>
                <Text>Logout</Text>
            </BaseButton>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})

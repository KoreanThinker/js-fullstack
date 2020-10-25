import React, { useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import BaseButton from '../components/BaseButton'
import { useApolloClient } from '@apollo/client'
import useAuth from '../hooks/useAuth'
import { useRoute } from '@react-navigation/native'

const HomeScreen = () => {
    const client = useApolloClient()
    const { logout } = useAuth()

    const onLogout = useCallback(async () => {
        logout()
    }, [])

    return (
        <View style={{ flex: 1 }} >

            <BaseButton onPress={onLogout}>
                <Text>Logout</Text>
            </BaseButton>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})

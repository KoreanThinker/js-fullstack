import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import BaseButton from '../components/BaseButton'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

    const { navigate } = useNavigation()

    return (
        <View style={{ flex: 1 }} >
            <Text>Home</Text>
            <BaseButton
                style={{ flex: 1 }}
                onPress={() => navigate('PostDetail')}
            >
                <Text>PostDetail</Text>
            </BaseButton>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})

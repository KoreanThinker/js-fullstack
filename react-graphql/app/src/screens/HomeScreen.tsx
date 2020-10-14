import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import BaseButton from '../components/BaseButton'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTest } from '../graphql/auth'

const HomeScreen = () => {

    const { navigate } = useNavigation()
    const { data } = useTest({ fetchPolicy: 'network-only' })

    useEffect(() => {
        console.log('START')
        fetch('http://10.0.2.2:4000')
            .then(res => console.log(res))
            .catch(e => console.error(e))
    }, [])

    return (
        <View style={{ flex: 1 }} >
            <BaseButton
                style={{ flex: 1 }}
                onPress={() => navigate('PostDetail')}
            >
                <Icon name='home' size={50} />
            </BaseButton>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})

import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import BaseButton from '../components/BaseButton'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers'

const HomeScreen = () => {

    const { navigate } = useNavigation()
    const { num, num2 } = useSelector((state: RootState) => state.value)

    return (
        <View style={{ flex: 1 }} >
            <Text>{num}</Text>
            <Text>{num2}</Text>
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

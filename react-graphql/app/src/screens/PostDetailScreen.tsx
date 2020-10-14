import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseButton from '../components/BaseButton'
import { useTest } from '../graphql/auth'

const PostDetailScreen = () => {

    const { data } = useTest({ fetchPolicy: 'cache-only' })
    console.log('detail', data)

    const onPress = useCallback(() => {

    }, [])

    return (
        <View>
            <BaseButton onPress={onPress} >
                <Text>ADD</Text>
            </BaseButton>
        </View>
    )
}

export default PostDetailScreen

const styles = StyleSheet.create({})

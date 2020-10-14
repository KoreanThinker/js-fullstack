import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseButton from '../components/BaseButton'

const PostDetailScreen = () => {

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

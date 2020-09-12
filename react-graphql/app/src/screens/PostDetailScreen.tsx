import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../reducers'
import BaseButton from '../components/BaseButton'
import { changeNumAction } from '../reducers/value'

const PostDetailScreen = () => {
    const dispatch = useDispatch()
    const { num, num2 } = useSelector((state: RootState) => state.value)

    return (
        <View>
            <Text>{num}</Text>
            <Text>{num2}</Text>
            <BaseButton onPress={() => dispatch(changeNumAction(num + 1))} >
                <Text>ADD</Text>
            </BaseButton>
        </View>
    )
}

export default PostDetailScreen

const styles = StyleSheet.create({})

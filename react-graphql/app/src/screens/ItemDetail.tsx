import { useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseButton from '../components/BaseButton'

const ItemDetail = () => {
    const { params } = useRoute()
    useEffect(() => {
        console.log(params)
    }, [])

    return (
        <View>
            <Text>ItemDetail</Text>
        </View>
    )
}

export default ItemDetail

const styles = StyleSheet.create({})

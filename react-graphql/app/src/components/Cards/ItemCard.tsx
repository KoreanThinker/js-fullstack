import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { WIDTH } from '../../constants/styles'
import { ItemsItem } from '../../graphql/item'
import BaseButton from '../BaseButton'

const CARD_WIDTH = (WIDTH - 48) / 2

const ItemCard: React.FC<ItemsItem> = ({ id, mainImage, name, price }) => {

    const { navigate } = useNavigation()

    const onPress = useCallback(() => {
        navigate('ItemDetail', { id })
    }, [id])

    return (
        <BaseButton
            onPress={onPress}
            style={styles.container}
        >
            <Image
                style={styles.image}
                source={{ uri: mainImage }}
                resizeMode='cover'
            />
            <Text style={{ marginTop: 16 }} >{name}</Text>
            <Text style={{ marginTop: 8, fontSize: 20 }} >{price}$</Text>
        </BaseButton>
    )
}

export default ItemCard

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        marginTop: 24
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: 16
    }
})

import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GRAY } from '../constants/styles'
import useSearchKeyword from '../hooks/useSearchKeyword'
import BaseButton from './BaseButton'

interface KeywordListProps {
    data: string[]
}

interface KeywordListItemProps {
    keyword: string
    onPress: (keyword: string) => void
}

const KeywordListItem: React.FC<KeywordListItemProps> = ({ keyword, onPress }) => {
    return (
        <BaseButton
            style={styles.itemContainer}
            onPress={() => onPress(keyword)}
        >
            <Text numberOfLines={1} style={styles.keyword} >{keyword}</Text>
        </BaseButton>
    )
}

const KeywordList: React.FC<KeywordListProps> = ({ data }) => {

    const { navigate } = useNavigation()
    const { onChange } = useSearchKeyword()

    const onKeyword = useCallback((keyword: string) => {
        onChange(keyword)
        navigate('SearchDetail')
    }, [])

    return (
        <View style={styles.container}>
            {data.map((keyword, index) =>
                <KeywordListItem
                    keyword={keyword}
                    key={index}
                    onPress={onKeyword}
                />
            )}
        </View>
    )
}

export default KeywordList

const styles = StyleSheet.create({
    itemContainer: {
        height: 40,
        maxWidth: 200,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: GRAY,
        borderWidth: 0.5,
        marginHorizontal: 8,
        marginBottom: 16
    },
    keyword: {
        color: GRAY
    },
    container: {
        paddingHorizontal: 8,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})
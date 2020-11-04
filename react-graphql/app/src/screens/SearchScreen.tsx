import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import SearchHeader from '../components/Headers/SearchHeader'
import KeywordList from '../components/KeywordList'
import { LIGHT_GRAY, VERY_LIGHT_GRAY } from '../constants/styles'


const SearchScreen = () => {


    const onRecentKeywordRemoveAll = useCallback(() => {

    }, [])

    return (
        <View>
            <SearchHeader />
            <View style={styles.recentKeywordsContainer} >
                <View style={styles.recentKeywordsHeader} >
                    <Text style={styles.recentKeywordHeaderText} >Recent Keywords</Text>
                    <Pressable onPress={onRecentKeywordRemoveAll} >
                        <Text style={styles.recentKeywordHeaderText} >Remove all</Text>
                    </Pressable>
                </View>
                <KeywordList
                    data={['hello', 'world', 'hiasdfkasdlfk;lkasdfasdfasdfasd', 'hello', 'hi', 'good']}
                />
            </View>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    recentKeywordsContainer: {
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY
    },
    recentKeywordsHeader: {
        height: 48,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    recentKeywordHeaderText: {
        color: LIGHT_GRAY
    }
})

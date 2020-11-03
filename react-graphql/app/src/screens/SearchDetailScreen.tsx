import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SearchHeader from '../components/Headers/SearchHeader'

const SearchDetailScreen = () => {
    return (
        <View>
            <SearchHeader editable={false} />
        </View>
    )
}

export default SearchDetailScreen

const styles = StyleSheet.create({})

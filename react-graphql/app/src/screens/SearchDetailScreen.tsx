import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import SearchHeader from '../components/Headers/SearchHeader'
import { useSearch } from '../graphql/search'
import useSearchKeyword from '../hooks/useSearchKeyword'

const SearchDetailScreen = () => {

    const { searchKeyword } = useSearchKeyword()
    const { data } = useSearch({ variables: { orderBy: '', keyword: searchKeyword } })

    return (
        <View>
            <SearchHeader editable={false} />
        </View>
    )
}

export default SearchDetailScreen

const styles = StyleSheet.create({})

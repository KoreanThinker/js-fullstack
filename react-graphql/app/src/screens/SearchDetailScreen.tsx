import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import ItemCard from '../components/Cards/ItemCard'
import SearchHeader from '../components/Headers/SearchHeader'
import { useSearch } from '../graphql/search'
import useSearchKeyword from '../hooks/useSearchKeyword'

const SearchDetailScreen = () => {

    const { searchKeyword } = useSearchKeyword()
    const { data, refetch } = useSearch({ variables: { orderBy: '', keyword: searchKeyword } })
    const [refreshing, setRefresing] = useState(false)

    const onRefresh = useCallback(async () => {
        try {
            if (refreshing) return
            setRefresing(true)
            await refetch()
        } catch (error) {
            console.log(error)
        } finally {
            setRefresing(false)
        }
    }, [refreshing, refetch])

    return (
        <View>
            <SearchHeader editable={false} />
            <FlatList
                onRefresh={onRefresh}
                refreshing={refreshing}
                style={{ paddingHorizontal: 16 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={data?.search?.items || []}
                renderItem={({ item }) => <ItemCard {...item} />}
            />
        </View>
    )
}

export default SearchDetailScreen

const styles = StyleSheet.create({})

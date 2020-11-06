import { Route, useRoute } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import BaseButton from '../components/BaseButton'
import ItemCard from '../components/Cards/ItemCard'
import SearchHeader from '../components/Headers/SearchHeader'
import { GRAY } from '../constants/styles'
import { useSearch } from '../graphql/search'


interface RouteParams {
    searchKeyword: string
}

type OrderBy = 'Popular' | 'Recent' | 'Cheap' | 'Expensive'
const ORDER_BY_LIST: OrderBy[] = ['Popular', 'Recent', 'Cheap', 'Expensive']


const SearchDetailScreen = () => {

    const { params } = useRoute<Route<'SearchDetail', RouteParams>>()
    const [refreshing, setRefresing] = useState(false)
    const [orderBy, setOrderBy] = useState<OrderBy>('Popular')
    const { data, refetch } = useSearch({ variables: { orderBy, keyword: params.searchKeyword } })

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
            <View style={styles.orderSelector} >
                {ORDER_BY_LIST.map(v => <BaseButton key={v} onPress={() => setOrderBy(v)} style={styles.orderBtn} ><Text style={{ color: v === orderBy ? '#000' : GRAY }}>{v}</Text></BaseButton>)}
            </View>
            <FlatList
                onRefresh={onRefresh}
                refreshing={refreshing}
                style={{ paddingHorizontal: 16 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={data?.search?.items || []}
                renderItem={({ item }) => <ItemCard {...item} />}
            />
        </View >
    )
}

export default SearchDetailScreen

const styles = StyleSheet.create({
    orderSelector: {
        width: '100%',
        height: 56,
        flexDirection: 'row'
    },
    orderBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

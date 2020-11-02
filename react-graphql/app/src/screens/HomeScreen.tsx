import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import ItemCard from '../components/Cards/ItemCard'
import HomeHeader from '../components/Headers/HomeHeader'
import { useItems } from '../graphql/item'

const HomeScreen = () => {

    const { data, refetch, fetchMore } = useItems({ fetchPolicy: 'network-only' })
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

    const onEndReached = useCallback(async () => {
        if (!data) return
        await fetchMore({ variables: { offset: data.items.length } })
    }, [data, fetchMore])

    return (
        <View style={{ flex: 1 }} >
            <HomeHeader />
            <FlatList
                onRefresh={onRefresh}
                refreshing={refreshing}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                style={{ paddingHorizontal: 16 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={data?.items || []}
                renderItem={({ item }) => <ItemCard {...item} />}
                ListFooterComponent={<ActivityIndicator style={{ marginVertical: 24 }} />}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})

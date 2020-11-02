import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import ItemCard from '../components/Cards/ItemCard'
import HomeHeader from '../components/Headers/HomeHeader'
import { useItems } from '../graphql/item'

const HomeScreen = () => {

    const { data, refetch, fetchMore, loading } = useItems()
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
        <View style={{ flex: 1 }} >
            <HomeHeader />
            {data
                ?
                <FlatList
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    data={data.items}
                    renderItem={({ item }) => <ItemCard {...item} />}
                    numColumns={2}
                    style={{ paddingHorizontal: 16 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
                :
                <ActivityIndicator />
            }
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})

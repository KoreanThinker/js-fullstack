import { makeVar, useReactiveVar } from "@apollo/client"
import AsyncStorage from "@react-native-community/async-storage"
import { useCallback, useEffect } from "react"
import asyncStroageParser from "../lib/asyncStorageParser"


const recentSearchKeywordsVar = makeVar<string[]>([])
const STORAGE_KEY = 'recentSearckKeywords'
const MAX_KEYWORDS = 20
let isInited = false

export const addRecentSearchKeywords = async (keyword: string) => {
    recentSearchKeywordsVar([keyword, ...recentSearchKeywordsVar().filter((_, i) => i < MAX_KEYWORDS - 1)])
}
export const removeAllRecentSearchKeywords = () => recentSearchKeywordsVar([])

const useRecentSearchKeywords = () => {

    const recentSearchKeywords = useReactiveVar(recentSearchKeywordsVar)

    useEffect(() => { init() }, [])
    useEffect(() => { synchronization() }, [recentSearchKeywords])

    const init = useCallback(async () => {
        if (isInited) return
        const result = await asyncStroageParser<string[]>(STORAGE_KEY, [])
        recentSearchKeywordsVar(result)
        isInited = true
    }, [])

    const synchronization = useCallback(async () => {
        if (!isInited) return
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearchKeywords))
    }, [recentSearchKeywords])

    return {
        recentSearchKeywords,
        addRecentSearchKeywords,
        removeAllRecentSearchKeywords
    }
}

export default useRecentSearchKeywords

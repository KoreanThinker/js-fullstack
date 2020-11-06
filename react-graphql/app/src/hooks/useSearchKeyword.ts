import { useCallback } from "react"
import { searchKeywordVar } from "../lib/apollo/cache"
import { useSearchKeywordQuery } from '../graphql/search'
const useSearchKeyword = () => {

    const { data } = useSearchKeywordQuery()

    const onClear = useCallback(() => {
        searchKeywordVar('')
    }, [])

    const onChange = useCallback((t: string) => {
        searchKeywordVar(t)
    }, [])

    return {
        searchKeyword: data?.searchKeyword || '',
        onClear,
        onChange
    }
}

export default useSearchKeyword
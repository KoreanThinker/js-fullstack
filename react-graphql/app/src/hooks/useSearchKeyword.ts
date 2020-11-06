import { useCallback } from "react"
import { makeVar, useReactiveVar } from "@apollo/client"

export const searchKeywordVar = makeVar('')

const useSearchKeyword = () => {

    const searchKeyword = useReactiveVar(searchKeywordVar)

    const onClear = useCallback(() => {
        searchKeywordVar('')
    }, [])

    const onChange = useCallback((t: string) => {
        searchKeywordVar(t)
    }, [])

    return {
        searchKeyword,
        onClear,
        onChange
    }
}

export default useSearchKeyword
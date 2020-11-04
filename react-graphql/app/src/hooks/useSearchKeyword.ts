import { useCallback, useContext } from "react"
import { Context } from '../contexts'

const useSearchKeyword = () => {

    const { searchKeyword, setSearchKeyword } = useContext(Context)

    const onClear = useCallback(() => {
        setSearchKeyword('')
    }, [])

    const onChange = useCallback((t: string) => {
        setSearchKeyword(t)
    }, [])

    return { searchKeyword, onClear, onChange }
}

export default useSearchKeyword
import { useState, useCallback } from 'react';

const useInput = (initialValue = '') => {

    const [value, setValue] = useState(initialValue)

    const onChange = useCallback((t: string) => {
        setValue(t)
    }, [])

    const onClear = useCallback(() => {
        setValue('')
    }, [])

    return { value, onChange, setValue, onClear }
}

export default useInput
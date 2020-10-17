import { useState, useCallback } from 'react';

const useInput = (initialValue = ''): any => {
    const [value, setValue] = useState(initialValue)
    const handler = useCallback((t: string) => {
        setValue(t)
    }, [])
    return [value, handler, setValue]
}

export default useInput
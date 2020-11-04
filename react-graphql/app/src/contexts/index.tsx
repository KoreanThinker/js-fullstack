import React, { createContext, useState } from 'react'

type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>

interface ContextType {
    searchKeyword: string
    setSearchKeyword: SetStateType<string>
}

//@ts-ignore
export const Context = createContext<ContextType>()

const ContextProvider: React.FC = ({ children }) => {

    const [searchKeyword, setSearchKeyword] = useState('')

    return (
        <>
            <Context.Provider
                value={{
                    searchKeyword,
                    setSearchKeyword
                }}
            >
                {children}
            </Context.Provider>
        </>
    )
}

export default ContextProvider
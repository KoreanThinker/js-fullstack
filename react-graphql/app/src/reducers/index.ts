import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

import value from './value'

const rootConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['value'] // state to use persistReducer
}

const valueReducerConfig = {
    key: 'value',
    storage: AsyncStorage,
    whitelist: ['num2'] // state that keep the value when you reload app
}

const other = (state: any) => { return { ...state } }

const rootReducer = combineReducers({
    value: persistReducer(valueReducerConfig, value),
    other
})


export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(rootConfig, rootReducer)
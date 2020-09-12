import { createStore } from 'redux'
import { persistStore } from 'redux-persist'
import rootReducer from '../reducers'


export default () => {
    const store = createStore(rootReducer)
    const persistor = persistStore(store)
    return { store, persistor }
}
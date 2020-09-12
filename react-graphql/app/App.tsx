import React from 'react'
import { View } from 'react-native';
import 'react-native-gesture-handler';
import Navigation from './src/screens';
import configureStore from './src/store/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {

  const { store, persistor } = configureStore()

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1 }} >
            <Navigation />
          </View>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App

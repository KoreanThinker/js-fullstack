import { ApolloProvider, useApolloClient } from '@apollo/client';
import React from 'react'
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { createApolloClient } from './src/lib/apollo';
import Navigation from './src/screens';

const App = () => {

  const client = createApolloClient()

  return (
    <>
      <ApolloProvider client={client}>
        <View style={{ flex: 1 }} >
          <Navigation />
        </View>
      </ApolloProvider>
    </>
  )
}

export default App

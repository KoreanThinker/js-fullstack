import { ApolloClient, ApolloProvider } from '@apollo/client';
import React from 'react'
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { client } from './src/lib/apollo';
import Navigation from './src/screens';
import { enableFlipperApolloDevtools } from 'react-native-flipper-apollo-devtools'

//@ts-ignore
enableFlipperApolloDevtools(client)


const App = () => {

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

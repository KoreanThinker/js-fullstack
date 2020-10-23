import 'react-native-gesture-handler';
import React from 'react'
import { ApolloProvider } from '@apollo/client';
import { enableFlipperApolloDevtools } from 'react-native-flipper-apollo-devtools'
import { SafeAreaView } from 'react-native-safe-area-context';
import { client } from './src/lib/apollo';
import Navigation from './src/screens';
import { StyleSheet } from 'react-native';
//@ts-ignore
enableFlipperApolloDevtools(client)


const App = () => {

  return (
    <>
      <ApolloProvider client={client}>
        <SafeAreaView style={styles.container} >
          <Navigation />
        </SafeAreaView>
      </ApolloProvider>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
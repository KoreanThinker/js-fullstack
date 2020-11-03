import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { enableFlipperApolloDevtools } from 'react-native-flipper-apollo-devtools'
import codePush from "react-native-code-push";
import { SafeAreaView } from 'react-native-safe-area-context';
import { client } from './src/lib/apollo';
import Navigation from './src/screens';

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

export default codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME })(App)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
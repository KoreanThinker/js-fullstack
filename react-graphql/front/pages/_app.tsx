import { AppProps } from 'next/dist/next-server/lib/router/router'
import React from 'react'
import '../styles/global.css'
import 'antd/dist/antd.css';
import { ToastContainer } from 'react-toastify';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
  uri: process.env.GRAPHQL_SERVER_URL,
  cache: new InMemoryCache()
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <ToastContainer />
    </ApolloProvider>
  </>
}

export default App
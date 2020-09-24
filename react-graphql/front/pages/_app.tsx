import React from 'react'
import '../styles/global.css'
import 'antd/dist/antd.css';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { useApollo } from '../lib/apollo';
import { AppProps } from 'next/app';


const App: React.FC<AppProps> = ({ Component, pageProps }) => {

  const apolloClient = useApollo(pageProps.initialApolloState)

  return <>
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <ToastContainer />
    </ApolloProvider>
  </>
}

export default App
import { AppProps } from 'next/dist/next-server/lib/router/router'
import React from 'react'
import '../styles/global.css'
import 'antd/dist/antd.css';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';

import client from '../apollo/client'


const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <ToastContainer />
    </ApolloProvider>
  </>
}

export default App
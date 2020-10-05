import React, { useEffect } from 'react'
import '../styles/global.css'
import 'antd/dist/antd.css';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { useApollo } from '../lib/apollo';
import { AppProps } from 'next/app';
import { GetServerSideProps } from 'next';


const App: React.FC<AppProps> = ({ Component, pageProps }) => {

  const apolloClient = useApollo(pageProps.initialApolloState)

  useEffect(() => {
    console.log('APP')
  }, [])

  return <>
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <ToastContainer />
    </ApolloProvider>
  </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('SSR')
  return { props: {} }
}

export default App
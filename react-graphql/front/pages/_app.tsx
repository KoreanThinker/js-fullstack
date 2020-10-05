import React from 'react'
import '../styles/global.css'
import 'antd/dist/antd.css';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider, DocumentNode } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { initializeApollo, useApollo } from '../lib/apollo';
import { AppProps, AppContext } from 'next/app';
import { IS_LOGGED_IN } from '../graphql/auth';


const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return <>
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <ToastContainer />
    </ApolloProvider>
  </>
}

App.getInitialProps = async (appContext: AppContext) => {
  const apolloClient = initializeApollo()

  const { QUERYS: PAGE_QUERYS } = require(`.${appContext.router.pathname}`) as { QUERYS?: DocumentNode[] } // get gqls from page's QUERYS
  const QUERYS = [IS_LOGGED_IN, ...(PAGE_QUERYS || [])]

  for (const [index, query] of QUERYS.entries()) {
    const { data } = await apolloClient.query({ query, context: appContext.ctx.req, fetchPolicy: 'network-only' })
    console.log('SSR DATA', index, data)
  }

  return { pageProps: { initialApolloState: apolloClient.cache.extract() } }
}

export default App
import { AppProps } from 'next/dist/next-server/lib/router/router'
import React from 'react'
import '../styles/global.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
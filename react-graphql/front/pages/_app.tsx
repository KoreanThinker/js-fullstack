import { AppProps } from 'next/dist/next-server/lib/router/router'
import React from 'react'
import '../styles/global.css'
import 'antd/dist/antd.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <>
    <Component {...pageProps} />
    <ToastContainer />
  </>
}

export default App
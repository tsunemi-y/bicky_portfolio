import React from 'react'
import type { AppProps } from 'next/app'
import type { NextComponentType, NextPageContext } from 'next'

import { Provider } from 'react-redux'
import { store } from 'store/index'

import CircularProgress from 'components/atoms/CircularProgress/CircularProgress'
import Snackbar from 'components/organisms/Snackbar/Snackbar'
import Layout from 'components/templates/Layout/Layout'
import AdminLayout from 'components/templates/AdminLayout/AdminLayout'

import 'styles/globals.css'

type CustomPageComponent = NextComponentType<NextPageContext, any, any> & { isAdmin?: boolean; isNotLayout?: boolean }

function MyApp({ Component, pageProps }: AppProps & { Component: CustomPageComponent }) {
  const isAdmin = Component.isAdmin ? true : false
  const isNotLayout = Component.isNotLayout ? true : false

  return (
    <>
      <Provider store={store}>
        <CircularProgress />
        <Snackbar />

        {isAdmin && !isNotLayout && (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        )}

        {!isAdmin && !isNotLayout && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}

        {isNotLayout && <Component {...pageProps} />}
      </Provider>
    </>
  )
}

export default MyApp

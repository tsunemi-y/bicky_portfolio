import React from 'react'
import { GetServerSideProps } from 'next'

import nookies from 'nookies'
import { Typography } from '@mui/material'

import AdminLayout from 'components/templates/AdminLayout/AdminLayout'

const Dashboard: React.FC & { isAdmin: boolean } = () => {
  return (
    <AdminLayout>
      <Typography variant="h4">ダッシュボード</Typography>
    </AdminLayout>
  )
}

Dashboard.isAdmin = true

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context)
  const adminJwt = cookies.adminJwt

  if (!adminJwt) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
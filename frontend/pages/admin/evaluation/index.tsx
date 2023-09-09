import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'

import Link from 'next/link'
import nookies from 'nookies'

import MailList from 'components/organisms/MailList/MailList'

const EvaluationPage: React.FC & { isAdmin: boolean } = () => {
  return (
    <>
      <MailList title="評価表" url={'/admin/evaluation'} />
    </>
  )
}

EvaluationPage.isAdmin = true

export default EvaluationPage

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

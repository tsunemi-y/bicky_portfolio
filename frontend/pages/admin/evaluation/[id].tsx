import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store/index'
import nookies from 'nookies'
import { Box, Button, Typography } from '@mui/material'

import getUserById from 'services/users/getUserById'
import sendEvaluation from 'services/users/sendEvaluation'

import type { User } from 'types/UserType'

const ReceiptDetailPage: React.FC & { isAdmin: boolean } = () => {
  const [user, setUser] = useState<User | null>(null)
  const [fileObj, setFileObj] = useState<File | null>(null)

  const dispatch: AppDispatch = useDispatch()

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      const userData = await getUserById(id, dispatch)
      setUser(userData)
    }

    fetchData()
  }, [id])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileObj(event.target.files ? event.target.files[0] : null)
  }

  const handleEvaluationSend = () => {
    if (user && user.parent_name && user.email && fileObj) {
      const data = new FormData()
      data.append('name', user.parent_name)
      data.append('email', user.email)
      data.append('file', fileObj)

      if (!confirm(`${user.parent_name}さんの評価表を送信します。よろしいですか?`)) return
      sendEvaluation(data, dispatch)
    }
  }

  return (
    <Box component="div">
      <Typography variant="h4" align="left" gutterBottom>
        評価表送信
      </Typography>
      <Box bgcolor="background.paper" mt={3} p={4} width="75%">
        <Typography variant="body1">
          【氏名】
          {user && user.parent_name}
        </Typography>
        <Typography variant="body1" mt={3}>
          【メール】
          {user && user.email}
        </Typography>
        <Box mt={3}>
          【PDFファイル】
          <input accept="application/pdf" type="file" onChange={handleFileChange} />
        </Box>
        <Box mt={3}>
          <Button variant="contained" component="label" onClick={handleEvaluationSend}>
            送信
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

ReceiptDetailPage.isAdmin = true

export default ReceiptDetailPage

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

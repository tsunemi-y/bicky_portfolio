import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store/index'
import nookies from 'nookies'
import { Box, Button, Typography, TextField } from '@mui/material'

import getUserById from 'services/users/getUserById'
import sendReceipt from 'services/users/sendReceipt'
import updateFee from 'services/users/updateFee'

import type { User } from 'types/UserType'

const ReceiptDetailPage: React.FC & { isAdmin: boolean } = () => {
  const [user, setUser] = useState<User | null | undefined>(null)
  const [fee, setFee] = useState<number | null | undefined>(null)

  const dispatch: AppDispatch = useDispatch()

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserById(id, dispatch)
      setUser(userData)
    }

    fetchData()
  }, [])

  const onUpdateFee = (event: React.FocusEvent<HTMLInputElement>) => {
    setFee(parseInt(event.target.value))
    const data = {
      fee,
    }
    updateFee(id, data, dispatch)
  }

  const onClickSendReceipt = () => {
    if (user) {
      const data = {
        name: user.parent_name,
        email: user.email,
        fee: fee,
      }
      if (!confirm(`${user.parent_name}さんの領収書を送信します。よろしいですか?`)) return
      sendReceipt(data, dispatch)
    }
  }

  return (
    <Box component="div">
      <Typography variant="h4" align="left" gutterBottom>
        領収書送信
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
          【料金】
          <TextField variant="outlined" onBlur={onUpdateFee} defaultValue={fee} />
        </Box>
        <Box
          bgcolor="primary.main"
          mt={3}
          p={1}
          borderRadius="borderRadius"
          display="flex"
          justifyContent="center"
          color="background.paper"
          width="80px"
        >
          <Button variant="contained" component="label" onClick={onClickSendReceipt}>
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

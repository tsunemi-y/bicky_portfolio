import React from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store/index'
import nookies from 'nookies'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, TextField, Container, FormControl, Box, Typography } from '@mui/material'

import adminLogin from 'services/users/adminLogin'

import { loginFormValues } from 'types/UserType'

import styles from './LoginPage.module.css'

const LoginPage: React.FC & { isNotLayout: boolean } = () => {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormValues>()

  const onSubmit: SubmitHandler<loginFormValues> = async (data) => {
    const { isLoginSuccess } = await adminLogin(data, dispatch)

    if (isLoginSuccess) {
      router.push('/admin')
    }
  }

  return (
    <Container className={styles.container}>
      <Typography variant="h5" align="center" gutterBottom>
        管理者ログイン画面
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormControl className={styles.formControl}>
          <TextField
            {...register('email', {
              required: 'メールアドレスは必須項目です。',
            })}
            id="email"
            label="メールアドレス"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
            className={styles.textField}
          />

          <TextField
            {...register('password', {
              required: 'パスワードは必須項目です。',
            })}
            id="password"
            label="パスワード"
            type="password"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
            className={styles.textField}
          />

          <Box mt={3}>
            <Button variant="contained" component="label" onClick={handleSubmit(onSubmit)}>
              ログイン
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Container>
  )
}

LoginPage.isNotLayout = true

export default LoginPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context)
  const adminJwt = cookies.adminJwt

  if (adminJwt) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

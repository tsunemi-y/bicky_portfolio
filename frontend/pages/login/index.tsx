import React from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store/index'
import nookies from 'nookies'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, TextField, Container, FormControl, Box, Breadcrumbs, Link } from '@mui/material'

import LargeHeading from 'components/atoms/LargeHeading/LargeHeading'

import login from 'services/users/login'

import styles from './LoginPage.module.css'

import { loginFormValues } from 'types/UserType'

const LoginPage: React.FC = () => {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormValues>()

  const onSubmit: SubmitHandler<loginFormValues> = async (data) => {
    const { isLoginSuccess } = await login(data, dispatch)

    if (isLoginSuccess) {
      router.push('/reservations')
    }
  }

  return (
    <Container className={styles.container}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" href="/">
          TOP
        </Link>
        <Link color="inherit" href="/login">
          ログイン
        </Link>
      </Breadcrumbs>

      <LargeHeading text="ログイン" />

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

          <Button type="submit" variant="contained" color="primary" className="secondary_btn">
            ログイン
          </Button>
        </FormControl>
      </Box>
    </Container>
  )
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context)
  const jwt = cookies.jwt

  if (jwt) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

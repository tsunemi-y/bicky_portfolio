import React from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store/index'
import nookies from 'nookies'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Button,
  TextField,
  Container,
  FormControl,
  Box,
  Breadcrumbs,
  Link,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from '@mui/material'

import LargeHeading from 'components/atoms/LargeHeading/LargeHeading'

import signup from 'services/users/signup'

import styles from './SignupPage.module.css'

import { signUpFormValues } from 'types/UserType'

const SignupPage: React.FC = () => {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<signUpFormValues>()

  const onSubmit: SubmitHandler<signUpFormValues> = async (data) => {
    const { isSignUpSuccess } = await signup(data, dispatch)

    if (isSignUpSuccess) {
      router.push('/reservations')
    }
  }

  const siblingUseWatched = watch('siblingUse')
  const lineConsultationWatched = watch('lineConsultation')

  return (
    <Container className={styles.container}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" href="/">
          TOP
        </Link>
        <Link color="inherit" href="/signup">
          新規会員登録
        </Link>
      </Breadcrumbs>

      <LargeHeading text="新規会員登録" />

      <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormControl className={styles.formControl}>
          <TextField
            {...register('parentName', {
              required: '年齢は必須項目です。',
            })}
            id="parentName"
            label="保護者氏名"
            variant="outlined"
            error={!!errors.parentName}
            helperText={errors.parentName && errors.parentName.message}
            className={styles.textField}
          />

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
            {...register('tel', {
              required: '電話番号は必須項目です。',
            })}
            id="tel"
            label="電話番号"
            type="number"
            variant="outlined"
            error={!!errors.tel}
            helperText={errors.tel && errors.tel.message}
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

          <TextField
            {...register('passwordConfirm', {
              validate: (value) => value === getValues().password || 'パスワードと一致しません。',
            })}
            id="passwordConfirm"
            label="パスワード確認"
            type="password"
            variant="outlined"
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm && errors.passwordConfirm.message}
            className={styles.textField}
          />

          <TextField
            {...register('childName', {
              required: '利用児氏名は必須項目です。',
            })}
            id="childName"
            label="利用児氏名"
            variant="outlined"
            error={!!errors.childName}
            helperText={errors.childName && errors.childName.message}
            className={styles.textField}
          />

          <TextField
            {...register('age', {
              required: '年齢は必須項目です。',
              min: {
                value: 0,
                message: '年齢は0以上で入力してください。',
              },
            })}
            id="age"
            label="利用児年齢"
            type="number"
            variant="outlined"
            error={!!errors.age}
            helperText={errors.age && errors.age.message}
            className={styles.textField}
          />

          <FormControl component="fieldset" className={styles.formControl}>
            <FormLabel component="legend" className={styles.formLabel}>
              利用児性別
            </FormLabel>
            <RadioGroup aria-label="gender" defaultValue="male" row>
              <FormControlLabel value="male" control={<Radio {...register('gender', { required: true })} />} label="男の子" />
              <FormControlLabel value="female" control={<Radio {...register('gender', { required: true })} />} label="女の子" />
            </RadioGroup>
          </FormControl>

          <TextField
            {...register('diagnosis', {
              required: '診断名は必須項目です。',
            })}
            id="diagnosis"
            label="診断名"
            variant="outlined"
            error={!!errors.diagnosis}
            helperText={errors.diagnosis && errors.diagnosis.message}
            className={styles.textField}
          />

          <FormControl component="fieldset" className={styles.formControl}>
            <FormLabel component="legend" className={styles.formLabel}>
              兄弟児での利用
            </FormLabel>
            <RadioGroup aria-label="siblingUse" defaultValue="no" row>
              <FormControlLabel value="no" control={<Radio {...register('siblingUse', { required: true })} />} label="しない" />
              <FormControlLabel value="yes" control={<Radio {...register('siblingUse', { required: true })} />} label="する" />
            </RadioGroup>
          </FormControl>

          {siblingUseWatched === 'yes' && (
            <>
              <TextField
                {...register('childName2', {
                  required: '第二利用児の氏名は必須項目です。',
                })}
                id="childName2"
                label="第二利用児の氏名"
                variant="outlined"
                error={!!errors.childName2}
                helperText={errors.childName2 && errors.childName2.message}
                className={styles.textField}
              />

              <TextField
                {...register('age2', {
                  required: '第二利用児の年齢は必須項目です。',
                })}
                id="age2"
                label="第二利用児の年齢"
                type="number"
                variant="outlined"
                error={!!errors.age2}
                helperText={errors.age2 && errors.age2.message}
                className={styles.textField}
              />

              <FormControl component="fieldset" className={styles.formControl}>
                <FormLabel component="legend" className={styles.formLabel}>
                  第二利用児の性別
                </FormLabel>
                <RadioGroup aria-label="gender2" defaultValue="male" row>
                  <FormControlLabel value="male" control={<Radio {...register('gender2', { required: true })} />} label="男の子" />
                  <FormControlLabel value="female" control={<Radio {...register('gender2', { required: true })} />} label="女の子" />
                </RadioGroup>
              </FormControl>

              <TextField
                {...register('diagnosis2', {
                  required: '第二利用児の診断名は必須項目です。',
                })}
                id="diagnosis2"
                label="第二利用児の診断名"
                variant="outlined"
                error={!!errors.diagnosis2}
                helperText={errors.diagnosis2 && errors.diagnosis2.message}
                className={styles.textField}
              />
            </>
          )}

          <TextField
            {...register('postCode', {
              required: '郵便番号は必須項目です。',
            })}
            id="postCode"
            label="郵便番号"
            type="number"
            variant="outlined"
            error={!!errors.postCode}
            helperText={errors.postCode && errors.postCode.message}
            className={styles.textField}
          />

          <TextField
            {...register('address', {
              required: '住所は必須項目です。',
            })}
            id="address"
            label="住所"
            variant="outlined"
            error={!!errors.address}
            helperText={errors.address && errors.address.message}
            className={styles.textField}
          />

          <FormControl component="fieldset" className={styles.formControl}>
            <FormLabel component="legend" className={styles.formLabel}>
              ご利用プラン
            </FormLabel>
            <FormControlLabel control={<Checkbox {...register('lineConsultation')} defaultChecked={false} />} label="LINE相談のみ" />
            {!lineConsultationWatched && (
              <>
                <RadioGroup aria-label="numberOfUse" defaultValue="1" row>
                  <FormControlLabel value="1" control={<Radio {...register('numberOfUse', { required: true })} />} label="月一回利用" />
                  <FormControlLabel value="2" control={<Radio {...register('numberOfUse', { required: true })} />} label="月二回利用" />
                </RadioGroup>
                <RadioGroup aria-label="coursePlan" defaultValue="1" row>
                  <FormControlLabel value="1" control={<Radio {...register('coursePlan', { required: true })} />} label="平日利用" />
                  <FormControlLabel value="2" control={<Radio {...register('coursePlan', { required: true })} />} label="休日利用" />
                </RadioGroup>
              </>
            )}
          </FormControl>

          <TextField
            {...register('introduction')}
            id="introduction"
            label="紹介先"
            variant="outlined"
            error={!!errors.introduction}
            className={styles.textField}
          />

          <TextField
            {...register('consaltation')}
            id="consaltation"
            label="相談内容"
            multiline
            rows={5}
            variant="outlined"
            error={!!errors.consaltation}
            className={styles.textField}
          />

          <Button type="submit" variant="contained" color="primary" className="secondary_btn">
            新規会員登録
          </Button>
        </FormControl>
      </Box>
    </Container>
  )
}

export default SignupPage

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

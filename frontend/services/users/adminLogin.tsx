import axios from 'axios'

import { AppDispatch } from 'store/index'

import { setOpen, setMessage, setSeverity } from 'store/utils/snackbarSlice'
import { setLoading } from 'store/utils/loadingSlice'

import { loginFormValues } from 'types/UserType'

const adminLogin = async (formData: loginFormValues, dispatch: AppDispatch) => {
  let isLoginSuccess = false
  let message = ''
  let severity: 'error' | 'info' | 'success' | 'warning' = 'error'

  try {
    dispatch(setLoading(true))

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/user/login`, formData, { withCredentials: true })

    if (response.data.isEmptyUserFailed) {
      message = 'ユーザが存在しません。'
    } else if (response.data.isPasswordFailed) {
      message = 'パスワードが間違っています。'
    } else if (response.data.isLoginSuccess) {
      isLoginSuccess = true
      message = 'ログインに成功しました。'
      severity = 'success'
    }
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      const errors = error.response.data.errors
      message = Object.values(errors).flat().join('<br />')
    } else {
      message = 'ログインに失敗しました。<br />再度お試しください。'
    }
  } finally {
    dispatch(setLoading(false))
  }

  dispatch(setMessage(message))
  dispatch(setSeverity(severity))
  dispatch(setOpen(true))

  return { isLoginSuccess }
}

export default adminLogin

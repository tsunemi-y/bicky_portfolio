import axios from 'axios'

import { AppDispatch } from 'store/index'

import { setOpen, setMessage, setSeverity } from 'store/utils/snackbarSlice'
import { setLoading } from 'store/utils/loadingSlice'

import { signUpFormValues } from 'types/UserType'

const signup = async (formData: signUpFormValues, dispatch: AppDispatch) => {
  let isSignUpSuccess = false
  let message = ''
  let severity: 'error' | 'info' | 'success' | 'warning' = 'error'

  try {
    dispatch(setLoading(true))

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/store`, formData, { withCredentials: true })

    if (response.data.isSignUpSuccess) {
      isSignUpSuccess = true
      message = '新規登録に成功しました。'
      severity = 'success'
    }
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      const errors = error.response.data.errors
      message = Object.values(errors).flat().join('<br />')
    } else {
      message = '新規登録に失敗しました。<br />再度お試しください。'
    }
  } finally {
    dispatch(setLoading(false))
  }

  dispatch(setMessage(message))
  dispatch(setSeverity(severity))
  dispatch(setOpen(true))

  return { isSignUpSuccess }
}

export default signup

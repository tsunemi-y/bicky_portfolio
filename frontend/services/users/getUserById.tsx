import { setLoading } from 'store/utils/loadingSlice'
import { AppDispatch } from 'store/index'

import { setOpen, setMessage, setSeverity } from 'store/utils/snackbarSlice'

import type { User } from 'types/UserType'

const getUserById = async (id: string | string[] | undefined | null, dispatch: AppDispatch): Promise<User> => {
  let data = null
  let message = ''
  let severity: 'error' | 'info' | 'success' | 'warning' = 'error'

  try {
    dispatch(setLoading(true))

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/user/${id}`, {
      credentials: 'include',
    })

    data = await response.json()

    message = 'ユーザ情報の取得に成功しました。'
    severity = 'success'
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      const errors = error.response.data.errors
      message = Object.values(errors).flat().join('<br />')
    } else {
      message = 'ユーザ情報の取得に失敗しました。<br />再度お試しください。'
    }
  } finally {
    dispatch(setLoading(false))
  }

  dispatch(setMessage(message))
  dispatch(setSeverity(severity))
  dispatch(setOpen(true))

  return data
}

export default getUserById

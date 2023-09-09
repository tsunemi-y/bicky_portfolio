import { setLoading } from 'store/utils/loadingSlice'
import { AppDispatch } from 'store/index'

import { setOpen, setMessage, setSeverity } from 'store/utils/snackbarSlice'

import type { User } from 'types/UserType'

const getUsers = async (name: string, dispatch: AppDispatch): Promise<User[]> => {
  let data = null

  try {
    dispatch(setLoading(true))
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/user?name=${name}`, {
      credentials: 'include',
    })

    data = await response.json()
  } catch (error) {
    dispatch(setMessage('ユーザ情報の取得に失敗しました。<br />再度お試しください。'))
    dispatch(setSeverity('error'))
    dispatch(setOpen(true))
  }

  dispatch(setLoading(false))
  return data
}

export default getUsers

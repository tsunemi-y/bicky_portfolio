import axios from 'axios'
import { AppDispatch } from 'store/index'
import { setOpen, setMessage, setSeverity } from 'store/utils/snackbarSlice'
import { setLoading } from 'store/utils/loadingSlice'

const sendEvaluation = async (data: FormData, dispatch: AppDispatch): Promise<void> => {
  let message = ''
  let severity: 'error' | 'info' | 'success' | 'warning' = 'error'

  try {
    dispatch(setLoading(true))

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/user/sendEvaluation`, data, {
      withCredentials: true,
    })

    message = '評価表の送信に成功しました。'
    severity = 'success'
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      const errors = error.response.data.errors
      message = Object.values(errors).flat().join('<br />')
    } else {
      message = '評価表の送信に失敗しました。<br />再度お試しください。'
    }
  } finally {
    dispatch(setLoading(false))
  }

  dispatch(setMessage(message))
  dispatch(setSeverity(severity))
  dispatch(setOpen(true))
}

export default sendEvaluation

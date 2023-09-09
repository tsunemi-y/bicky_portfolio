import axios from 'axios'
import { AppDispatch } from 'store/index'
import { setOpen, setMessage, setSeverity } from 'store/utils/snackbarSlice'
import { setLoading } from 'store/utils/loadingSlice'

const deleteAvailableDatetime = async (id: number, dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(setLoading(true))

    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/reservation/${id}`, {
      withCredentials: true,
    })

    message = '利用可能時間の削除に成功しました。'
    severity = 'success'
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      const errors = error.response.data.errors
      message = Object.values(errors).flat().join('<br />')
    } else {
      message = '利用可能時間の削除に成功しました。<br />再度お試しください。'
    }
  } finally {
    dispatch(setLoading(false))
  }

  dispatch(setMessage(message))
  dispatch(setSeverity(severity))
  dispatch(setOpen(true))
}

export default deleteAvailableDatetime

import axios from 'axios'
import { AppDispatch } from 'store/index'
import { setOpen, setMessage, setSeverity } from 'store/utils/snackbarSlice'
import { setLoading } from 'store/utils/loadingSlice'
import { setModalOpen } from 'store/utils/modalSlice'

interface ReservationCancel {
  isCancelSuccess: boolean | null
}

const cancelReservation = async (id: string | string[] | undefined, dispatch: AppDispatch): Promise<ReservationCancel> => {
  let isCancelSuccess: boolean | null = false
  let message = ''
  let severity: 'error' | 'info' | 'success' | 'warning' = 'error'

  try {
    dispatch(setLoading(true))

    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reservation/${id}`, {
      withCredentials: true,
    })

    isCancelSuccess = response.data.isCancelSuccess
    message = '予約キャンセルに成功しました。'
    severity = 'success'
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      const errors = error.response.data.errors
      message = Object.values(errors).flat().join('<br />')
    } else {
      message = '予約キャンセルに失敗しました。<br />時間を置いてから再度、ご予約ください。'
    }
  } finally {
    dispatch(setLoading(false))
  }

  dispatch(setMessage(message))
  dispatch(setSeverity(severity))
  dispatch(setOpen(true))

  return {
    isCancelSuccess: isCancelSuccess,
  }
}

export default cancelReservation

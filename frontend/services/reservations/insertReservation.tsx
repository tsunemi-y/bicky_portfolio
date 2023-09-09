import axios from 'axios'

import { AppDispatch } from 'store/index'
import { setOpen, setMessage, setSeverity } from 'store/utils/snackbarSlice'
import { setLoading } from 'store/utils/loadingSlice'
import { setModalOpen } from 'store/utils/modalSlice'

const insertReservation = async (selectedDate: string | null, time: string, dispatch: AppDispatch): Promise<void> => {
  let message = ''
  let severity: 'error' | 'info' | 'success' | 'warning' = 'error'

  try {
    dispatch(setLoading(true))

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservation`,
      {
        date: selectedDate,
        time: time,
      },
      {
        withCredentials: true,
      },
    )

    if (response.data.isReservationDuplicate) {
      message = '指定日時は既に予約がございます。<br />時間を変更してください。'
    } else if (response.data.isReservationSuccess) {
      message = '予約に成功しました。<br />予約完了メールをお送りしましたので、ご確認お願いいたします。'
      severity = 'success'
    }
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      const errors = error.response.data.errors
      message = Object.values(errors).flat().join('<br />')
    } else {
      message = '予約に失敗しました。<br />再度お試しください。'
    }
  } finally {
    dispatch(setLoading(false))
    dispatch(setModalOpen(false))
  }

  dispatch(setMessage(message))
  dispatch(setSeverity(severity))
  dispatch(setOpen(true))
}

export default insertReservation

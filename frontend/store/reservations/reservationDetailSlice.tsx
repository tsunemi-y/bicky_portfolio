import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Reservation {
  date: string | null
  time: string | null
}

interface ReservationDetail {
  reservationDetail: Reservation | null
}

const initialState: ReservationDetail = {
  reservationDetail: null,
}

export const reservationDetailSlice = createSlice({
  name: 'reservationDetail',
  initialState,
  reducers: {
    setReservationDetail: (state, action: PayloadAction<Reservation>) => {
      state.reservationDetail = action.payload
    },
  },
})

export const { setReservationDetail } = reservationDetailSlice.actions

export default reservationDetailSlice.reducer

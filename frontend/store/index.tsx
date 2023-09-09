import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from 'store/utils/loadingSlice'
import snackbarReducer from 'store/utils/snackbarSlice'
import modalReducer from 'store/utils/modalSlice'
import headerMenuReducer from 'store/utils/headerMenuSlice'
import calendarReducer from 'store/reservations/calendarSlice'
import reservationDetailReducer from 'store/reservations/reservationDetailSlice'

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    snackbar: snackbarReducer,
    modal: modalReducer,
    headerMenu: headerMenuReducer,
    calendar: calendarReducer,
    reservationDetail: reservationDetailReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

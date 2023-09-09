import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CalendarState {
  selectedDate: string | null
}

const initialState: CalendarState = {
  selectedDate: null,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload
    },
  },
})

export const { setSelectedDate } = calendarSlice.actions

export default calendarSlice.reducer

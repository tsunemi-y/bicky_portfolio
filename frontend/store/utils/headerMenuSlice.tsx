import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type HeaderMenuState = {
  isHeaderMenuOpen: boolean
}

const initialState: HeaderMenuState = {
  isHeaderMenuOpen: false,
}

const headerMenuSlice = createSlice({
  name: 'headerMenu',
  initialState,
  reducers: {
    setHeaderMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isHeaderMenuOpen = action.payload
    },
  },
})

export const { setHeaderMenuOpen } = headerMenuSlice.actions

export default headerMenuSlice.reducer

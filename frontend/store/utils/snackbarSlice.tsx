import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SnackbarState = {
  open: boolean
  message: string
  severity: 'error' | 'info' | 'success' | 'warning'
}

const initialState: SnackbarState = {
  open: false,
  message: '',
  severity: 'info',
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
    setSeverity: (state, action: PayloadAction<SnackbarState['severity']>) => {
      state.severity = action.payload
    },
  },
})

export const { setOpen, setMessage, setSeverity } = snackbarSlice.actions

export default snackbarSlice.reducer

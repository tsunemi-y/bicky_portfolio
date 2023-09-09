import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SignUpState {
  isSiblingUse: string
}

const initialState: SignUpState = {
  isSiblingUse: 'no',
}

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setSiblingUse: (state, action: PayloadAction<string>) => {
      state.isSiblingUse = action.payload
    },
  },
})

export const { setSiblingUse } = signUpSlice.actions

export default signUpSlice.reducer

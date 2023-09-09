import React from 'react'

import { Snackbar as MuiSnackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store/index'

import { setOpen } from 'store/utils/snackbarSlice'

type HandleClsoeSnackbar = () => void

const Snackbar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const handleClose: HandleClsoeSnackbar = () => dispatch(setOpen(false))

  const isOpen = useSelector((state: RootState) => state.snackbar.open)
  const message = useSelector((state: RootState) => state.snackbar.message)
  const severity = useSelector((state: RootState) => state.snackbar.severity)

  if (!isOpen) {
    return null
  }

  return (
    <MuiSnackbar open={isOpen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        <div dangerouslySetInnerHTML={{ __html: message }} />
      </Alert>
    </MuiSnackbar>
  )
}

export default Snackbar

import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

interface SnackbarProps {
  open: boolean
  handleClose: () => void
  message: string
  severity?: 'error' | 'info' | 'success' | 'warning'
}

const CustomSnackbar: React.FC<SnackbarProps> = ({ open, handleClose, message, severity = 'success' }) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
)

export default CustomSnackbar

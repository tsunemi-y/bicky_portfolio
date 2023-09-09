import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/index'
import { CircularProgress as MuiCircularProgress, Box } from '@mui/material'

const CircularProgress: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading)

  if (!isLoading) {
    return null
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}
    >
      <MuiCircularProgress />
    </Box>
  )
}

export default CircularProgress

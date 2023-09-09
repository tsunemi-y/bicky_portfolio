import React from 'react'

import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#fdffe5',
        marginTop: 'auto',
        padding: '2rem',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Copyright (c) bicky All Rights Reserved.
      </Typography>
    </Box>
  )
}

export default Footer

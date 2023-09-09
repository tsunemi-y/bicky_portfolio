import React from 'react'
import { Box, Typography } from '@mui/material'
import styles from './ContentBlock.module.css'
import { colors } from 'constants/colors'
import { sizes } from 'constants/sizes'

interface ContentBlockProps {
  title: string
  children: string | React.ReactNode | null
  textColor?: string
}

const ContentBlock: React.FC<ContentBlockProps> = ({ title, children, textColor }) => {
  return (
    <Box>
      <Typography variant="h2" component="h2" color={colors.secondary} align="center" mt={5} fontSize={sizes.h2}>
        {title}
      </Typography>
      <Box component="div" className={`${styles.text} ${styles.customBody1}`} sx={{ color: textColor }}>
        {children}
      </Box>
    </Box>
  )
}

export default ContentBlock

import React, { ReactNode } from 'react'
import { Typography as MuiTypography } from '@mui/material'

interface TypographyProps {
  children: ReactNode
  [key: string]: any // 追加のpropsを受け入れるためのインデックスシグネチャ
}

const Typography: React.FC<TypographyProps> = (props) => {
  return <MuiTypography {...props} sx={{ ...props.sx, fontFamily: "'ten-mincho', serif" }} />
}

export default Typography

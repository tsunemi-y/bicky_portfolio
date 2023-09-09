import React from 'react'
import Link from 'next/link'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'store/index'
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, List, ListItem, ListItemText } from '@mui/material'
import { styled } from '@mui/system'
import MenuIcon from '@mui/icons-material/Menu'

import { setHeaderMenuOpen } from 'store/utils/headerMenuSlice'

import { colors } from 'constants/colors'

import styles from './Header.module.css'

const CustomAppBar = styled(AppBar)({
  background: colors.primary,
})

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const isHeaderMenuOpen = useSelector((state: RootState) => state.headerMenu.isHeaderMenuOpen)

  const handleMenuClick = () => {
    dispatch(setHeaderMenuOpen(!isHeaderMenuOpen))
  }

  const handleHeaderMenuClose = () => {
    dispatch(setHeaderMenuOpen(false))
  }

  const headerContents = [
    {
      name: '新規会員登録',
      path: '/signup',
    },
    {
      name: 'ログイン',
      path: '/login',
    },
    {
      name: '予約',
      path: '/reservations',
    },
    {
      name: 'ご挨拶',
      path: '/greeting',
    },
    {
      name: '訓練内容',
      path: '/training-content',
    },
    {
      name: '料金',
      path: '/fee',
    },
    {
      name: '遠方の方へ',
      path: '/remote',
    },
    {
      name: '指導員紹介',
      path: '/introduction',
    },
    {
      name: 'アクセス',
      path: '/access',
    },
  ]

  return (
    <CustomAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" flexGrow={1} color={colors.mainText}>
          <Link href="/">ビッキーことば塾</Link>
        </Typography>
        <Box>
          <IconButton edge="end" color="default" aria-label="menu" sx={{ mr: 2, color: colors.mainText }} onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Drawer
        anchor="right"
        open={isHeaderMenuOpen}
        onClose={handleMenuClick}
        sx={{
          '& .MuiDrawer-paper': {
            background: colors.secondary,
          },
        }}
      >
        <List>
          {headerContents.map((content, index) => (
            <ListItem key={index} className={`${styles.listWithUnderline}`} onClick={handleHeaderMenuClose}>
              <Link href={content.path}>
                <ListItemText primary={content.name} style={{ color: colors.subText }} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </CustomAppBar>
  )
}

export default Header

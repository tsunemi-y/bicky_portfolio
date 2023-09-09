import React from 'react'
import Link from 'next/link'
import { Drawer, List, ListItem, ListItemText } from '@mui/material'

interface AdminLayoutProps {
  children: string | React.ReactNode | null
}

const drawerWidth = 50

const sideMenuContents = [
  {
    name: '予約一覧',
    path: '/admin/reservations',
  },
  {
    name: '領収書',
    path: '/admin/receipt',
  },
  {
    name: '評価表',
    path: '/admin/evaluation',
  },
]

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#00897B', color: '#fff' },
        }}
      >
        <List>
          {sideMenuContents.map((content, index) => (
            <Link href={content.path} key={index}>
              <ListItem
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemText primary={content.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <div style={{ flexGrow: 1, padding: '1rem' }}>{children}</div>
    </div>
  )
}

export default AdminLayout

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Box, Grid, TextField, Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store/index'

import getUsers from 'services/users/getUsers'

import type { User } from 'types/UserType'

interface Props {
  title: string
  url: string
}

const MailList: React.FC<Props> = ({ title, url }) => {
  const [name, setName] = useState('')
  const [users, setUsers] = useState<User[] | null>(null)
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUsers(name, dispatch)
      setUsers(userData)
    }

    fetchData()
  }, [])

  const handleOnClick = (id: number | undefined) => {
    router.push(`${url}/${id}`)
  }

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onClickSearchBtn = async () => {
    const userData = await getUsers(name, dispatch)
    setUsers(userData)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <TextField label="氏名" value={name} onChange={onChangeName} variant="outlined" />
        <Button variant="contained" component="label" onClick={onClickSearchBtn} sx={{ marginLeft: '10px' }}>
          検索
        </Button>
        <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden', marginTop: '1rem' }}>
          <Grid container>
            <Grid item xs={4}>
              <Typography sx={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>氏名</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography sx={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>メールアドレス</Typography>
            </Grid>
            {users &&
              users.map((user: User, index: number) => (
                <Grid
                  container
                  key={index}
                  onClick={() => handleOnClick(user.id)}
                  sx={{ cursor: 'pointer', backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#fff' }}
                >
                  <Grid item xs={4}>
                    <Typography sx={{ padding: '0.5rem' }}>{user.parent_name}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography sx={{ padding: '0.5rem' }}>{user.email}</Typography>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default MailList

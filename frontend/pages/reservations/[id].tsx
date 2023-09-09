import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'store/index'
import { setOpen, setMessage, setSeverity } from 'store/utils/snackbarSlice'
import { setLoading } from 'store/utils/loadingSlice'
import { Container, Breadcrumbs, Link, Grid, Paper, Typography, Button } from '@mui/material'
import LargeHeading from 'components/atoms/LargeHeading/LargeHeading'
import getReservationDetail from 'services/reservations/getReservationDetail'
import cancelReservation from 'services/reservations/cancelReservation'

const ReservationDetailPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const router = useRouter()
  const { id } = router.query

  const { reservationDetail, isLoading, isError } = getReservationDetail(id)

  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading])

  if (isError) {
    setOpen(true)
    setMessage('エラーです')
    setSeverity('error')
  }

  const handleCancelReservation = async () => {
    const { isCancelSuccess } = await cancelReservation(id, dispatch)

    if (isCancelSuccess) {
      router.push('/reservations')
    }
  }

  return (
    <Container maxWidth="lg">
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginTop: '30px' }}>
        <Link color="inherit" href="/">
          TOP
        </Link>
        <Link color="inherit" href={`/reservations/${[id]}`}>
          予約キャンセル
        </Link>
      </Breadcrumbs>

      <LargeHeading text="予約キャンセル" />

      {reservationDetail && (
        <Paper style={{ padding: '24px', marginTop: '24px', marginBottom: '36px', borderRadius: '12px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>
                <strong>予約日付:</strong>
              </Typography>
              <Typography variant="body1" style={{ marginLeft: '16px' }}>
                {reservationDetail.date}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>
                <strong>予約時間:</strong>
              </Typography>
              <Typography variant="body1" style={{ marginLeft: '16px' }}>
                {reservationDetail.time}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
      <Button type="submit" variant="contained" color="primary" className="secondary_btn" style={{ width: '100%' }} onClick={handleCancelReservation}>
        キャンセル
      </Button>
    </Container>
  )
}

export default ReservationDetailPage

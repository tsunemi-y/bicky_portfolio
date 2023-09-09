import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'
import Link from 'next/link'
import nookies from 'nookies'
import { Grid, Breadcrumbs, Container, Modal, Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { isHoliday } from 'japanese-holidays'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'store/index'
import { setOpen, setMessage, setSeverity } from 'store/utils/snackbarSlice'
import { setModalOpen } from 'store/utils/modalSlice'
import { setLoading } from 'store/utils/loadingSlice'
import { setSelectedDate } from 'store/reservations/calendarSlice'
import LargeHeading from 'components/atoms/LargeHeading/LargeHeading'
import ContentBlock from 'components/molecules/ContentBlock/ContentBlock'
import getAvailableDatetimes from 'services/availableDatetimes/useAvailableDatetimes'
import insertReservation from 'services/reservations/insertReservation'
import { colors } from 'constants/colors'
import styles from './ReservationPage.module.css'
import { AvailableTime } from 'types/ReservationType'

type TileContentHandler = (props: { date: Date; view: string }) => React.ReactNode | null
type TileClassNameHandler = (props: { date: Date; view: string }) => string | null
type HandleCalendarClick = (date: Date) => void
type HandleClsoeModal = () => void
type HandleSelectTime = (time: string) => Promise<void | undefined>
type CheckDateAvailable = (date: Date) => boolean
type CheckDateWithinLimit = (date: Date, targetDayNum: number) => boolean

const ReservationPage: React.FC = () => {
  const { availableDatetimes, isLoading, isError, refetch } = getAvailableDatetimes()

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading])

  if (isError) {
    setOpen(true)
    setMessage('エラーです')
    setSeverity('error')
  }

  const selectedDate = useSelector((state: RootState) => state.calendar.selectedDate)
  const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen)

  const getTileClassName: TileClassNameHandler = ({ date, view }) => {
    if (view !== 'month') return null

    if (date.getDay() === 6) {
      return 'saturday'
    }

    if (isHoliday(date)) {
      return 'holiday'
    }

    return null
  }

  const renderTileContent: TileContentHandler = ({ date, view }) => {
    if (view !== 'month') return

    // 予約当日３日前からは予約不可とする
    if (checkDateWithinLimit(date, 3)) return <p>-</p>

    if (!availableDatetimes) return <p>-</p>

    // 利用可能日が存在する場合、○を表示する
    if (checkDateAvailable(date)) return <p>○</p>

    // 予約が埋まっていることを伝える
    return <p>×</p>
  }

  const handleCalendarClick: HandleCalendarClick = (date) => {
    if (checkDateWithinLimit(date, 3)) return
    if (!availableDatetimes) return
    if (!checkDateAvailable(date)) return

    dispatch(setSelectedDate(dayjs(date).format('YYYY-MM-DD')))
    dispatch(setModalOpen(true))
  }

  const handleClsoeModal: HandleClsoeModal = () => dispatch(setModalOpen(false))

  const handleSelectTime: HandleSelectTime = async (time) => {
    if (time === null) return
    if (!confirm(`${selectedDate} ${time}で予約を行います。よろしいでしょうか？`)) return
    await insertReservation(selectedDate, time, dispatch)
    refetch()
  }

  const checkDateAvailable: CheckDateAvailable = (date) => {
    if (!availableDatetimes) return false
    return Object.keys(availableDatetimes).includes(dayjs(date).format('YYYY-MM-DD'))
  }

  const checkDateWithinLimit: CheckDateWithinLimit = (date, targetDayNum) => {
    return dayjs(date).isBefore(dayjs().add(targetDayNum, 'day'))
  }

  // カレンダーの選択範囲の設定。１ヶ月先までしか想定していないため
  const currentMonthStart = dayjs().startOf('month').toDate()
  const nextMonthEnd = dayjs().add(1, 'month').endOf('month').toDate()

  return (
    <>
      <Container maxWidth="lg">
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginTop: '30px' }}>
          <Link color="inherit" href="/">
            TOP
          </Link>
          <Link color="inherit" href="/reservations">
            予約
          </Link>
        </Breadcrumbs>

        <LargeHeading text="予約" />

        <Grid container>
          <Grid item xs={12} sm={12}>
            <ContentBlock title="予約方法">
              {`1. 予約カレンダーから日付を指定
                ※○になっている日付のみ選択可能
                2. 時間を選択`}
            </ContentBlock>
          </Grid>

          <Grid item xs={12} sm={12}>
            <ContentBlock title="お知らせ" textColor={colors.dangerText}>
              {`当面の間は、平日のご予約を承っておりません。
              ご迷惑をおかけしますが、ご理解の程、よろしくお願い致します。`}
            </ContentBlock>
          </Grid>
        </Grid>

        <Calendar
          locale="ja-JP"
          className={styles.reactCalendar}
          value={dayjs().toDate()}
          next2Label={null}
          prev2Label={null}
          minDate={currentMonthStart}
          maxDate={nextMonthEnd}
          tileContent={renderTileContent}
          tileClassName={getTileClassName}
          onClickDay={handleCalendarClick}
        />
      </Container>
      <Modal open={isModalOpen} onClose={handleClsoeModal} className={styles.modal}>
        <Box className={styles.paper}>
          <Typography variant="h6" id="modal-title">
            {selectedDate}の利用可能な時間
          </Typography>
          <List>
            {availableDatetimes &&
              selectedDate &&
              availableDatetimes[selectedDate]?.map((time: AvailableTime) => (
                <ListItem key={time.id} onClick={() => handleSelectTime(time.available_time)}>
                  <ListItemText primary={time.available_time} />
                  <Button className={styles.button}>この時間を選択する</Button>
                </ListItem>
              ))}
          </List>
        </Box>
      </Modal>
    </>
  )
}

export default ReservationPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context)
  const jwt = cookies.jwt

  if (!jwt) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

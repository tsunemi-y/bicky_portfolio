import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'

import nookies from 'nookies'
import {
  Modal,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import Calendar from 'react-calendar'
import { isHoliday } from 'japanese-holidays'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store/index'

import { setOpen, setMessage, setSeverity } from 'store/utils/snackbarSlice'
import { setLoading } from 'store/utils/loadingSlice'
import getReservations from 'services/reservations/admin/getReservations'
import deleteAvailableDatetime from 'services/availableDatetimes/deleteAvailableDatetime'
import insertAvailableDatetime from 'services/availableDatetimes/insertAvailableDatetime'

import { AvailableTime, ReservationInfo } from 'types/ReservationType'

import 'react-calendar/dist/Calendar.css'
import styles from './ReservationPage.module.css'

type TileContentHandler = (props: { date: Date; view: string }) => React.ReactNode | null
type TileClassNameHandler = (props: { date: Date; view: string }) => string | null

const ReservationPage: React.FC & { isAdmin: boolean } = () => {
  const [datetime, setDatetime] = useState('')
  const [isBulkWeekend, setIsBulkWeekend] = useState(false)
  const [isBulkMonth, setIsBulkMonth] = useState(false)
  const [isBulkDay, setIsBulkDay] = useState(false)
  const [isAvaDatetimeModalOpen, setAvaDatetimeModalOpen] = useState(false)
  const [isReservationModalOpen, setReservationModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  const { reservations, isLoading, isError, refetch } = getReservations()

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading])

  if (isError) {
    setOpen(true)
    setMessage('エラーです')
    setSeverity('error')
  }

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

    if (dayjs(date).isBefore(dayjs(), 'day')) return

    if (!reservations) return

    const formatDate = dayjs(date).format('YYYY-MM-DD')

    let isShownAvaDatetimes = false
    if (reservations.avaDatetimes[formatDate]) {
      isShownAvaDatetimes = true
    }

    let isShownReservations = false
    if (reservations.reservations[formatDate]) {
      isShownReservations = true
    }

    return (
      <div className={styles.dateIndicators}>
        {isShownAvaDatetimes && (
          <div className={styles.availableBar} onClick={() => setAvaDatetimeModalOpen(true)}>
            利用可能時間
          </div>
        )}
        {isShownReservations && (
          <div className={styles.reservationBar} onClick={() => setReservationModalOpen(true)}>
            予約者情報
          </div>
        )}
      </div>
    )
  }

  const handleCalendarClick = (date: Date) => {
    setSelectedDate(dayjs(date).format('YYYY-MM-DD'))
  }

  // カレンダーの選択範囲の設定。１ヶ月先までしか想定していないため
  const currentMonthStart = dayjs().startOf('month').toDate()
  const nextMonthEnd = dayjs().add(1, 'month').endOf('month').toDate()

  const onChangeDatetime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDatetime(event.target.value)
  }

  const onClickInsertAvailableDatetime = async () => {
    const replacedDatetime = datetime.replace('T', ' ')
    if (!replacedDatetime) {
      alert('日程を選択してください。')
      return
    }

    await insertAvailableDatetime(
      {
        datetime: replacedDatetime,
        isBulkDay,
        isBulkMonth,
        isBulkWeekend,
      },
      dispatch,
    )

    setReservationModalOpen(false)
    setAvaDatetimeModalOpen(false)
    refetch()
  }

  const onClickDeleteAvailableDatetime = async (id: number) => {
    await deleteAvailableDatetime(id, dispatch)

    setReservationModalOpen(false)
    setAvaDatetimeModalOpen(false)
    refetch()
  }

  return (
    <>
      <div className="mb-2">
        <TextField
          label="利用日"
          type={isBulkWeekend || isBulkMonth ? 'month' : 'date'}
          value={datetime}
          onChange={onChangeDatetime}
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <FormControl component="fieldset">
        <RadioGroup
          row
          name="bulkOptions"
          defaultValue="weekend"
          onChange={(e) => {
            setIsBulkWeekend(e.target.value === 'weekend')
            setIsBulkMonth(e.target.value === 'month')
            setIsBulkDay(e.target.value === 'day')
          }}
        >
          <FormControlLabel value="weekend" control={<Radio />} label="土日" />
          <FormControlLabel value="month" control={<Radio />} label="一ヶ月" />
          <FormControlLabel value="day" control={<Radio />} label="一日" />
        </RadioGroup>
      </FormControl>

      <Box>
        <Button variant="contained" component="label" sx={{ mt: 2 }} onClick={onClickInsertAvailableDatetime}>
          追加
        </Button>
      </Box>

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

      <Modal open={isAvaDatetimeModalOpen} onClose={() => setAvaDatetimeModalOpen(false)} className={styles.modal}>
        <Box className={styles.paper}>
          <Typography variant="h6" id="modal-title">
            {selectedDate}の利用可能な時間
          </Typography>
          <List>
            {reservations &&
              selectedDate &&
              reservations.avaDatetimes[selectedDate]?.map((time: AvailableTime) => (
                <ListItem key={time.id} onClick={() => onClickDeleteAvailableDatetime(time.id)}>
                  <ListItemText primary={time.available_time} />
                  <Button variant="contained" className="danger_btn">
                    この時間を削除する
                  </Button>
                </ListItem>
              ))}
          </List>
        </Box>
      </Modal>

      <Modal open={isReservationModalOpen} onClose={() => setReservationModalOpen(false)} className={styles.modal}>
        <Box className={styles.paper}>
          <Typography variant="h6" id="modal-title">
            {selectedDate}の予約者情報
          </Typography>
          <List>
            {reservations &&
              selectedDate &&
              reservations.reservations[selectedDate]?.map((value: ReservationInfo, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={value.reservationName} />
                  <ListItemText primary={value.reservationTime} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Modal>
    </>
  )
}

ReservationPage.isAdmin = true

export default ReservationPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context)
  const adminJwt = cookies.adminJwt

  if (!adminJwt) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

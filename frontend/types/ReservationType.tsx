export interface AvailableDatetime {
  [date: string]: AvailableTime[]
}

export interface AvailableTime {
  id: number
  available_time: string
}

export interface ReservationInfo {
  reservationName: string
  reservationTime: string
}

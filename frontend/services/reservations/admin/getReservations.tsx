import useSWR, { mutate } from 'swr'
import { AvailableDatetime, ReservationInfo } from 'types/ReservationType'
interface Reservations {
  [date: string]: ReservationInfo[]
}

interface Reservation {
  avaDatetimes: AvailableDatetime
  holidays: string[]
  reservations: Reservations
}

const fetcher = (url: string): Promise<Reservation> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL + url}`, {
    credentials: 'include',
  }).then((res) => res.json())

const getReservations = () => {
  const url = '/admin/reservation'
  const { data, error } = useSWR<Reservation>(url, fetcher)

  const refetch = async () => {
    mutate(url, null)
  }

  return {
    reservations: data,
    isLoading: !error && !data,
    isError: error,
    refetch: refetch,
  }
}

export default getReservations

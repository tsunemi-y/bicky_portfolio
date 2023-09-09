import useSWR from 'swr'

interface Reservation {
  date: string
  time: string
}

const fetcher = (url: string): Promise<Reservation> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL + url}`, {
    credentials: 'include',
  }).then((res) => res.json())

const getReservationDetail = (id: string | string[] | undefined) => {
  const url = `/reservation/${id}`
  const { data, error } = useSWR<Reservation>(url, fetcher)

  return {
    reservationDetail: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default getReservationDetail

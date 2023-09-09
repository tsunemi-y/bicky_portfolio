import useSWR, { mutate } from 'swr'
import { AvailableDatetime } from 'types/ReservationType'

const fetcher = (url: string): Promise<AvailableDatetime> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL + url}`, {
    credentials: 'include',
  }).then((res) => res.json())

const useAvailableDatetimes = () => {
  const { data, error } = useSWR<AvailableDatetime>('/reservation', fetcher)

  const refetch = async () => {
    mutate('/reservation', null)
  }

  return {
    availableDatetimes: data,
    isLoading: !error && !data,
    isError: error,
    refetch: refetch,
  }
}

export default useAvailableDatetimes

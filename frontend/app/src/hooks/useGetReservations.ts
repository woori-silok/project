import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Reservation } from '../interfaces';

dayjs.locale('ko');

interface GetReservationsState {
  error: Error | null;
  loading: boolean;
  reservations: Reservation[];
}

const useGetReservations = (
  props:
    | {
        now: Date;
      }
    | undefined,
): GetReservationsState => {
  const date = dayjs(props?.now);
  const [state, setState] = useState<GetReservationsState>({
    error: null,
    loading: true,
    reservations: [],
  });

  useEffect(() => {
    const year = date.year();
    const month = date.month() + 1;
    const startDay = dayjs(`${year}-${month}-1`).day() - 1;
    const week = Math.floor((date.date() + startDay) / 7) + 1;

    (async () => {
      try {
        const res = await axios.get(
          `/reservations?month=${month}&week=${week}`,
        );

        setState({ ...state, loading: false, reservations: res.data });
      } catch (error) {
        setState({ ...state, error, loading: false });
      }
    })();
  }, [props?.now]);

  return { ...state };
};

export default useGetReservations;

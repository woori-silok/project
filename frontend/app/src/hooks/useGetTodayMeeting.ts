import { useEffect, useState } from 'react';
import axios from 'axios';
import { Reservation } from '../interfaces';

interface GetTodayMeetingsState {
  error: Error | null;
  loading: boolean;
  meetings: Reservation[];
}

const useGetTodayMeeting = (): GetTodayMeetingsState => {
  const [state, setState] = useState<GetTodayMeetingsState>({
    error: null,
    loading: true,
    meetings: [],
  });

  const parseReservationTime = (reservations: Reservation[]): Reservation[] => {
    const parsedReservations = reservations
      .map((reservation) => ({
        ...reservation,
        startTime: reservation.startTime.replace(/:/g, ''),
        endTime: reservation.endTime.replace(/:/g, ''),
      }))
      .sort((a, b) => +a.startTime - +b.startTime);

    return parsedReservations;
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/reservations/today');
        const meetings = parseReservationTime(res.data);
        setState({ ...state, loading: false, meetings });
      } catch (error) {
        setState({ ...state, error, loading: false });
      }
    })();
  }, []);
  return { ...state };
};

export default useGetTodayMeeting;

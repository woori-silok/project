import { useState, useEffect } from 'react';
import axios from 'axios';
import { OngoingMeeting } from '../interfaces';

interface GetMyInfoState {
  error: Error | null;
  loading: boolean;
  noData: boolean;
  reservation: OngoingMeeting | null;
}

const useGetOngoingMeeting = (): GetMyInfoState => {
  const [state, setState] = useState<GetMyInfoState>({
    error: null,
    loading: true,
    noData: false,
    reservation: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/reservations/ongoing');
        setState({
          ...state,
          loading: false,
          noData: res.data.reservationId === 0,
          reservation: res.data,
        });
      } catch (error) {
        setState({ ...state, error, loading: false });
      }
    })();
  }, []);
  return state;
};

export default useGetOngoingMeeting;

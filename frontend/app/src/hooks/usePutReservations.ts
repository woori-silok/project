import { useState, useCallback } from 'react';
import axios from 'axios';
import { Reservation } from '../interfaces';

type ModifiedReservation = Omit<Reservation, 'room' | 'subject'>;
// type ModifiedReservation = any ;

interface PutReservations {
  error: Error | null;
  loading: boolean;
  complete: boolean;
  handleSubmit: (
    reservationId: number,
    reservation: ModifiedReservation,
  ) => Promise<void>;
}

const usePutReservations = (): PutReservations => {
  const handleSubmit = useCallback(async (reservationId, reservation) => {
    try {
      setState({ ...state, loading: true });

      await axios.put(`/reservations/${reservationId}`, reservation);

      setState({ ...state, loading: false, complete: true });
    } catch (error) {
      setState({ ...state, error, loading: false, complete: false });
    }
  }, []);

  const [state, setState] = useState<PutReservations>({
    error: null,
    loading: true,
    complete: false,
    handleSubmit,
  });

  return state;
};

export default usePutReservations;

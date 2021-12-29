import { useEffect, useState } from 'react';
import axios from 'axios';
import { FormData } from '../interfaces';

interface SubmitState {
  error: Error | null;
  loading: boolean;
  reservationId: number | null;
}

const useSubmitForm = (formData: FormData): void => {
  const [state, setState] = useState<SubmitState>({
    error: null,
    loading: true,
    reservationId: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post('/reservations', formData);
        setState({ ...state, loading: false, reservationId: response.data });
      } catch (error) {
        setState({ ...state, error, loading: false });
      }
    })();
  }, []);
};

export default useSubmitForm;

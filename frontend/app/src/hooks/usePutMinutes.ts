import { useState, useCallback } from 'react';
import axios from 'axios';
import { Minute } from '../interfaces';

interface PutMinutes {
  error: Error | null;
  loading: boolean;
  complete: boolean;
  handleSubmit: (minuestsId: number, minuet: Minute) => Promise<void>;
}

const usePutMinutes = (): PutMinutes => {
  const handleSubmit = useCallback(async (minuestsId, minute) => {
    try {
      setState({ ...state, loading: true });

      await axios.put(`/minutes/${minuestsId}`, minute);

      setState({ ...state, loading: false, complete: true });
    } catch (error) {
      setState({ ...state, error, loading: false, complete: false });
    }
  }, []);

  const [state, setState] = useState<PutMinutes>({
    error: null,
    loading: true,
    complete: false,
    handleSubmit,
  });

  return state;
};

export default usePutMinutes;

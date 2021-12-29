import { useState, useCallback } from 'react';
import axios from 'axios';

interface PostMinuets {
  error: Error | null;
  loading: boolean;
  complete: boolean;
  emails: string[];
  handleSubmit: (minuestsId: number, emails: string[]) => Promise<void>;
}

const usePostMinutes = (): PostMinuets => {
  const handleSubmit = useCallback(async (minuestsId, emails) => {
    try {
      setState({ ...state, loading: true });

      await axios.post(`/minutes/${minuestsId}`, emails);

      setState({ ...state, loading: false, complete: true });
    } catch (error) {
      setState({ ...state, error, loading: false, complete: false });
    }
  }, []);

  const [state, setState] = useState<PostMinuets>({
    error: null,
    loading: true,
    complete: false,
    emails: [],
    handleSubmit,
  });

  return state;
};

export default usePostMinutes;

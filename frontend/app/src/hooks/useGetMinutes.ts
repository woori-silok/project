import { useState, useEffect } from 'react';
import axios from 'axios';
import { Minute } from '../interfaces';

interface GetMinutes {
  error: Error | null;
  loading: boolean;
  minutes: Minute[];
}

const useGetMinutes = (subjectId: number): GetMinutes => {
  const [state, setState] = useState<GetMinutes>({
    error: null,
    loading: true,
    minutes: [],
  });

  useEffect(() => {
    if (subjectId) {
      try {
        (async () => {
          const response = await axios.get(`/minutes?subjectId=${subjectId}`);
          setState({
            ...state,
            loading: false,
            minutes: response.data,
          });
        })();
      } catch (error) {
        setState({ ...state, error, loading: false });
      }
    }
  }, [subjectId]);

  return state;
};

export default useGetMinutes;

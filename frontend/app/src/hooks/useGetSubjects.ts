import { useState, useEffect } from 'react';
import axios from 'axios';
import { Subject } from '../interfaces';

interface GetSubjectsState {
  error: Error | null;
  loading: boolean;
  subjects: Subject[];
}

const useGetSubjects = (): GetSubjectsState => {
  const [state, setState] = useState<GetSubjectsState>({
    error: null,
    loading: true,
    subjects: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/subjects');
        setState({ ...state, loading: false, subjects: response.data });
      } catch (error) {
        setState({ ...state, error, loading: false });
      }
    })();
  }, []);
  return state;
};

export default useGetSubjects;

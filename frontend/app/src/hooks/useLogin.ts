import { useEffect, useState } from 'react';
import axios from 'axios';

interface GetReservationsState {
  error: Error | null;
  loading: boolean;
  token: string;
}

const useLogin = (): void => {
  const [state, setState] = useState<GetReservationsState>({
    error: null,
    loading: true,
    token: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post('/login', {
          email: 'ljs981120@gmail.com',
          // email: 'mjhwang34@naver.com',
          // email:'o0myself0o@naver.com',
          password: 'admin',
        });

        const token = res.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('woori-silok-jwt', token);
        setState({ ...state, loading: false, token: token });
      } catch (error) {
        setState({ ...state, error, loading: false });
      }
    })();
  }, []);

  localStorage.setItem('woori-silok-jwt', state.token);
};

export default useLogin;

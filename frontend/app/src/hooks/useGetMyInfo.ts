import { useState, useEffect } from 'react';
import axios from 'axios';
import { MyInfo } from '../interfaces';

interface GetMyInfoState {
  error: Error | null;
  loading: boolean;
  myInfo: MyInfo;
}

const useGetMyInfo = (): GetMyInfoState => {
  const [state, setState] = useState<GetMyInfoState>({
    error: null,
    loading: true,
    myInfo: {
      name: '',
      email: '',
      authorityDtoSet: [],
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/members/me');
        const { name, email, authorityDtoSet } = response.data;
        setState({
          ...state,
          loading: false,
          myInfo: { ...state.myInfo, name, email, authorityDtoSet },
        });
      } catch (error) {
        setState({ ...state, error, loading: false });
      }
    })();
  }, []);
  return { ...state };
};

export default useGetMyInfo;

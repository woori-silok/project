import { useState, useEffect } from 'react';
import axios from 'axios';
import { MyInfo } from '../interfaces';
import { Attendee } from '../interfaces';

interface GetMembersState {
  error: Error | null;
  loading: boolean;
  members: Attendee[];
}

const useGetMembers = (): GetMembersState => {
  const [state, setState] = useState<GetMembersState>({
    error: null,
    loading: true,
    members: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/members');
        const { data } = response;
        const members = data.map((member: MyInfo) => ({
          name: member.name,
          email: member.email,
          isHost: false,
          isWriter: false,
          status: 'WAITING',
        }));
        setState({ ...state, loading: false, members });
      } catch (error) {
        setState({ ...state, error, loading: false });
      }
    })();
  }, []);
  return { ...state };
};

export default useGetMembers;

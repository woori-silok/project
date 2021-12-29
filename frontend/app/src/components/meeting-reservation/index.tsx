import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';
import Top from './Top';
import Bottom from '../../containers/meeting-reservation/Bottom';
import { FormData } from '../../interfaces';
import useGetMyInfo from '../../hooks/useGetMyInfo';
import useReservationValidate from '../../hooks/useReservationValidate';
import axios from 'axios';

interface Status {
  loading: boolean;
  error: Error | null;
  success: boolean;
}

const MeetingReservationWrapper = styled(Box)`
  height: calc(100vh - 112px);
`;

const newDate = new Date();
const now = {
  year: newDate.getFullYear(),
  month: newDate.getMonth() + 1,
  date: newDate.getDate(),
  hour: newDate.getHours(),
  minute: newDate.getMinutes(),
};

const date = `${now.year}-${now.month}-${now.date}`;
const startTime =
  now.minute >= 30
    ? `${String(now.hour + 1).padStart(2, '0')}:00:00`
    : `${String(now.hour).padStart(2, '0')}:30:00`;
const endTime =
  `${now.hour + 1}`.padStart(2, '0') + `:${now.minute < 30 ? '00' : '30'}:00`;

const MeetingReservation: React.FC = () => {
  const { myInfo } = useGetMyInfo();
  const [status, setStatus] = useState<Status>({
    loading: false,
    error: null,
    success: false,
  });

  const [formData, setFormData] = useState<FormData>({
    title: '',
    date: `${date}`,
    startTime: startTime,
    endTime: endTime,
    attendeeList: [
      {
        isHost: true,
        isWriter: true,
        email: '',
        name: '',
        status: 'WAITING',
      },
    ],
    subjectId: -1,
    note: '',
    roomId: null,
    online: {
      isOnline: false,
      onlineUrl: '',
    },
  });

  useEffect(() => {
    setFormData((state) => ({
      ...state,
      attendeeList: [
        {
          isHost: true,
          isWriter: true,
          email: myInfo.email,
          name: myInfo.name,
          status: 'ACCEPTED',
        },
      ],
    }));
  }, [myInfo]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await useReservationValidate(formData);
    } catch (error) {
      const validationError = new Error(error);
      alert(validationError.message.slice(17));
      return;
    }

    try {
      setStatus((status) => ({ ...status, loading: true }));
      await axios.post('/reservations', formData);
      setStatus((status) => ({ ...status, loading: false, success: true }));
    } catch (error) {
      setStatus((status) => ({ ...status, loading: false, error }));
    }
    e.currentTarget?.reset();
  };

  if (status.loading || status.error || status.success) {
    return (
      <Box textAlign="center">
        {status.loading && <CircularProgress />}
        {status.error && <div>{status.error.message}</div>}
        {status.success && <div>회의 예약이 완료되었습니다.</div>}
      </Box>
    );
  }

  return (
    <MeetingReservationWrapper>
      <form onSubmit={handleSubmit}>
        <Top setFormData={setFormData} />
        <Divider></Divider>
        <Bottom setFormData={setFormData} />
      </form>
    </MeetingReservationWrapper>
  );
};

export default MeetingReservation;

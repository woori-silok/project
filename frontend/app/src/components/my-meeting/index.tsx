import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Box, CircularProgress } from '@mui/material';
import useGetMyInfo from '../../hooks/useGetMyInfo';
import useGetReservations from '../../hooks/useGetReservations';
import Calendar from './calendar';
import theme from '../../Palette';
import { ISchedule } from 'tui-calendar';

dayjs.locale('ko');

const MyMeeting: React.FC = () => {
  const [date, setDate] = useState({ now: new Date() });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tuiReservationsAll, setTuiReservationsAll] = useState<any | ISchedule>(
    [],
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tuiReservations, setTuiReservations] = useState<any | ISchedule>([]);

  const { myInfo } = useGetMyInfo();
  const { reservations, loading, error } = useGetReservations(date);

  useEffect(() => {
    if (myInfo) {
      const parseReservations = reservations.map((reservation) => {
        const status = reservation.attendeeList.filter(
          (attendee) => attendee.email === myInfo.email,
        )[0]?.status;
        return {
          id: reservation.reservationId as unknown as string,
          category: 'time',
          title: reservation.title,
          start: `${reservation.date}T${reservation.startTime}+09:00`,
          end: `${reservation.date}T${reservation.endTime}+09:00`,
          attendees: reservation.attendeeList.reduce((acc, attendee) => {
            acc.push(attendee.name);
            return acc;
          }, [] as string[]),
          color: 'white',
          bgColor: theme.status[status],
          borderColor: theme.status[status],
          raw: {
            subject: reservation.subject.name,
            host: reservation.attendeeList.filter(
              (attendee) => attendee.isHost === true,
            )[0].name,
            status: status,
          },
        };
      });

      const pureReservations = [
        ...new Map(
          [...tuiReservationsAll, ...parseReservations].map((item) => [
            item['id'],
            item,
          ]),
        ).values(),
      ];

      const checkReservations = tuiReservationsAll.some((tui: ISchedule) => {
        return parseReservations.some((par) => {
          return tui.id === par.id;
        });
      });

      setTuiReservationsAll(pureReservations);

      if (!checkReservations) {
        setTuiReservations(parseReservations);
      }
    }
  }, [reservations, myInfo]);

  if (loading || error) {
    return (
      <Box textAlign="center">
        {loading && <CircularProgress />}
        {error && <div>{error.message}</div>}
      </Box>
    );
  }

  return (
    <Calendar
      date={date}
      setDate={setDate}
      tuiReservations={tuiReservations}
      reservations={reservations}
    />
  );
};

export default MyMeeting;

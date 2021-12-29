import { useEffect, useState } from 'react';
import axios from 'axios';
import { Room } from '../containers/meeting-reservation/MeetingReservation';

const useLoadAbleRooms = (
  date: string,
  startTime: string,
  endTime: string,
): Room[] => {
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    try {
      (async () => {
        await axios
          .get(
            `/rooms?date=${date}&endTime=${endTime}&startTime=${startTime}&attendeeNumber=5`,
          )
          .then((res) => setRooms(res.data));
      })();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, []);
  return rooms;
};

export default useLoadAbleRooms;

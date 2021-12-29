import React, { useState, useEffect } from 'react';
import TodayMeeting from '../components/TodayMeeting';
import { Reservation } from '../interfaces';
import useGetTodaymeeting from '../hooks/useGetTodayMeeting';

const TodayMeetingContainer: React.FC = () => {
  const { error, loading, meetings } = useGetTodaymeeting();

  const reservations = meetings;

  const [ongoingIndex, setOngoingIndex] = useState<number>(-1);
  const [nextIndex, setNextIndex] = useState<number>(-1);

  const checkOngoingMeeting = (reservations: Reservation[]) => {
    let ongoingIndex = -1;
    let nextIndex = -1;
    const now = new Date();
    const parsedNow = +`${now.getHours()}${
      now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    }00`;

    for (let i = 0; i < reservations.length; i++) {
      if (
        +reservations[i].startTime <= parsedNow &&
        +reservations[i].endTime > parsedNow
      ) {
        ongoingIndex = i;
      }
    }

    for (let i = 0; i < reservations.length; i++) {
      if (+reservations[i].startTime > parsedNow) {
        nextIndex = i;
        break;
      }
    }
    return [ongoingIndex, nextIndex];
  };

  useEffect(() => {
    if (reservations && reservations.length) {
      const [ongoingIndex, nextIndex] = checkOngoingMeeting(reservations);
      setOngoingIndex(ongoingIndex);
      setNextIndex(nextIndex);
    }
  });

  return (
    <TodayMeeting
      reservations={reservations}
      ongoingIndex={ongoingIndex}
      nextIndex={nextIndex}
      status={{ error, loading }}
    />
  );
};

export default TodayMeetingContainer;

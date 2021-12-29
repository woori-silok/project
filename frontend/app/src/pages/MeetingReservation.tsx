import React from 'react';
import MainContents from '../components/layout/MainContents';
import MeetingReservationContainer from '../containers/meeting-reservation/MeetingReservation';

const MeetingReservation: React.FC = () => {
  return (
    <MainContents>
      <MeetingReservationContainer />
    </MainContents>
  );
};

export default MeetingReservation;

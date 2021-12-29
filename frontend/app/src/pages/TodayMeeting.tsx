import React from 'react';
import MainContents from '../components/layout/MainContents';
import TodayMeeting from '../containers/TodayMeeting';

const TodayMeetingPage: React.FC = () => {
  return (
    <MainContents>
      <TodayMeeting />
    </MainContents>
  );
};

export default TodayMeetingPage;

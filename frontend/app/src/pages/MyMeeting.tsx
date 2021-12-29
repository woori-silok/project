import React from 'react';
import MainContents from '../components/layout/MainContents';
import MyMeetingContainer from '../containers/my-meeting/MyMeeting';

const MyMeeting: React.FC = () => {
  return (
    <MainContents>
      <MyMeetingContainer />
    </MainContents>
  );
};

export default MyMeeting;

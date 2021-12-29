import React from 'react';
import MainContents from '../components/layout/MainContents';
import _OnGoingMeeting from '../components/on-going-meeting/index';

const OnGoingMeeting: React.FC = () => {
  return (
    <MainContents>
      <_OnGoingMeeting />
    </MainContents>
  );
};

export default OnGoingMeeting;

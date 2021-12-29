import React from 'react';
import MainContents from '../components/layout/MainContents';
import _MeetingNotes from '../components/meeting-notes';

const MeetingNotes: React.FC = () => {
  return (
    <MainContents>
      <_MeetingNotes />
    </MainContents>
  );
};

export default MeetingNotes;

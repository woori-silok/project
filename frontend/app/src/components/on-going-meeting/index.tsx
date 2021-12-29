import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Info from './Info';
import Editor from './Editor';
import useGetOngoingMeeting from '../../hooks/useGetOngoingMeeting';

const index: React.VFC = () => {
  const { reservation, loading, error, noData } = useGetOngoingMeeting();

  if (loading || error || noData) {
    return (
      <Box display="flex" justifyContent="center">
        {loading && <CircularProgress />}
        {error && <div>에러가 발생되었습니다. 새로고침 해주세요. </div>}
        {noData && <div>현재 회의가 없습니다...</div>}
      </Box>
    );
  }

  return (
    <Box display="flex" height="90vh" flexDirection="column" gap={1.5}>
      <Info reservation={reservation} />
      <Editor
        subjectId={reservation?.subject.id as number}
        minuetsId={reservation?.minutesId as number}
      />
    </Box>
  );
};

export default index;

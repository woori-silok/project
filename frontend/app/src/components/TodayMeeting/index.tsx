import React from 'react';
import { Typography, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Schedule from './Schedule';
import { Reservation } from '../../interfaces';
import useCheckToken from '../../hooks/useCheckToken';

const ContentsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 76px;
  aling-items: center;
  width: 1100px;
  margin: auto;

  @media (max-height: 900px) {
    transform-origin: 50% 0;
    transform: scale(0.9);
  }
`;

const ScheduleTable = styled(Box)`
  width: 100%;
  box-shadow: 0px 4px 8px 1px gray;
  border: 1px solid lightgray;
  border-radius: 6px;
`;

interface TodayMeetingProps {
  reservations: Reservation[];
  ongoingIndex: number;
  nextIndex: number;
  status: { error: Error | null; loading: boolean };
}

const TodayMeeting: React.FC<TodayMeetingProps> = (props) => {
  const { reservations, ongoingIndex, nextIndex, status } = props;
  const { loading, error } = status;

  if (loading || error) {
    return (
      <Box textAlign="center">
        {loading && <CircularProgress />}
        {error && <div>{error.message}. 새로 고침 해주세요.</div>}
      </Box>
    );
  }

  return (
    <ContentsWrapper>
      <button onClick={useCheckToken}>test</button>
      <Box>
        {ongoingIndex >= 0 ? (
          <Typography align="center" variant="h4">
            현재 진행중인 회의는 <b>{reservations[ongoingIndex]?.title}</b>
            입니다.
          </Typography>
        ) : nextIndex >= 0 ? (
          <Typography align="center" variant="h4">
            다음 회의는 <b>{reservations[nextIndex]?.title}</b>입니다.
          </Typography>
        ) : (
          <Typography align="center" variant="h4">
            오늘의 회의가 모두 끝났습니다.
          </Typography>
        )}
      </Box>
      <ScheduleTable>
        {reservations.map((reservation, index) => (
          <ul key={reservation.startTime + index}>
            <li>
              <Schedule
                reservation={reservation}
                isNow={
                  ongoingIndex >= 0
                    ? index === ongoingIndex
                    : index === nextIndex
                }
              />
            </li>
          </ul>
        ))}
      </ScheduleTable>
    </ContentsWrapper>
  );
};

export default TodayMeeting;

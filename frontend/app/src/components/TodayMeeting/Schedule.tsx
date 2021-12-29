import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import theme from '../../Palette';
import { Reservation } from '../../interfaces';

const BoxWrapper = styled(Box)<{ isNow: boolean; isMemoOverFlow?: boolean }>`
  position: relative;
  height: 130px;
  width: 100%;
  border-bottom: 1px solid lightgray;
  display: flex;
  color: #666666;

  ${(props) =>
    props.isNow &&
    css`
      color: ${theme.palette.secondary.main};
      font-weight: bold;
      background-color: ${theme.palette.primary.main};
      transform: scale(1.05);
      box-shadow: 0px 6px 6px gray;
      border-radius: 6px;
      border: none;
    `}

  ${(props) =>
    props.isMemoOverFlow &&
    css`
      &:hover .tool-tip {
        display: block;
      }
    `}
`;

const TimeBox = styled(Box)<{ spacing: string }>`
  height: 100%;
  width: 20%;
  vertical-align: middle;
  padding-left: ${(props) => props.spacing};
`;

const lineHeight = '130px';

const InfoBox = styled(Box)`
  height: 100%;
  width: 78%;
  padding: 0.5rem 0;
  font-weight: inherit;
  white-space: nowrap;
  overflow: hidden;

  & h6 {
    margin-bottom: 0.5rem;
    font-weight: inherit;
  }
`;

const ToolTip = styled(Box)`
  position: absolute;
  top: calc(100% + 8px);
  width: 600px;
  display: none;
  padding: 8px;
  color: ${theme.palette.secondary.main};
  background-color: black;
  border-radius: 5px;
  white-space: normal;
  z-index: 100;

  &::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 6%;
    width: 0;
    height: 0;
    border-bottom: 15px solid black;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-radius: 5px;
  }
`;

interface ScheduleProps {
  reservation: Reservation;
  isNow: boolean;
}

const Schedule: React.FC<ScheduleProps> = (props) => {
  const { reservation, isNow } = props;
  const theme = useTheme();
  const spacing = theme.spacing(4);

  const formatHour = (startTime: string) => {
    const hour = +String(startTime).padStart(2, '0').slice(0, 2);
    if (hour < 12) {
      if (hour === 0) {
        return `오전 12`;
      }
      return `오전 ${hour}`;
    } else if (hour === 24) {
      return `오전 12`;
    } else if (hour === 12) {
      return `오후 ${hour}`;
    } else {
      return `오후 ${hour - 12}`;
    }
  };

  const formatMinute = (startTime: string): number => {
    return +startTime.slice(2, 4);
  };

  const attendees: string[] = [];
  let host = '';

  (() => {
    reservation.attendeeList?.forEach((attendee) => {
      if (attendee.isHost) {
        host = attendee.name;
      } else {
        attendees.push(attendee.name);
      }
    });
  })();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMemoOverFlow, setIsMemoOverFlow] = useState<boolean>(false);

  useEffect(() => {
    if (wrapperRef?.current) {
      if (wrapperRef?.current?.clientWidth < wrapperRef?.current?.scrollWidth) {
        setIsMemoOverFlow(true);
      }
    }
  }, []);

  return (
    <BoxWrapper isNow={isNow} isMemoOverFlow={isMemoOverFlow}>
      <TimeBox spacing={spacing}>
        <Typography variant="h5" sx={{ lineHeight: lineHeight }}>
          {formatHour(reservation.startTime) + `시 `}
          {formatMinute(reservation.startTime) !== 0 &&
            formatMinute(reservation.startTime) + `분`}
        </Typography>
      </TimeBox>
      <InfoBox>
        <Typography variant="h6">{reservation.title}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography>{`주최자: ${host}`}</Typography>
          <Typography>{`참석자: ${attendees.join(',')}`}</Typography>
        </Box>
        {reservation.room ? (
          <Typography>회의실: {reservation.room.name} </Typography>
        ) : (
          <Typography>온라인 url: {reservation.online.onlineUrl}</Typography>
        )}
        <Box sx={{ width: '100%' }} ref={wrapperRef}>
          <Typography> 메모: {reservation.note}</Typography>
        </Box>
        <ToolTip className="tool-tip">{reservation.note}</ToolTip>
      </InfoBox>
    </BoxWrapper>
  );
};

export default Schedule;

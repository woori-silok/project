import React from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import TuiCalendar from 'tui-calendar';
import CalendarButton, { StyledButton } from './CalendarButton';
import theme from '../../../Palette';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TodayButton = styled(StyledButton)`
  padding: 0 ${theme.spacing(2)};
  line-height: 30px;
  font-weight: bold;
`;

interface HeaderProps {
  tuiCalendar: TuiCalendar;
  date: { now: Date };
  setDate: ({ now }: { now: Date }) => void;
}

const Header: React.VFC<HeaderProps> = (props) => {
  const { tuiCalendar, date, setDate } = props;

  const handleToday = () => {
    const today = new Date();
    setDate({ now: today });

    tuiCalendar.today();
  };

  const handlePrev = () => {
    const prev = dayjs(date?.now).subtract(1, 'week').toDate();
    setDate({ now: prev });

    tuiCalendar.prev();
  };

  const handleNext = () => {
    const next = dayjs(date?.now).add(1, 'week').toDate();
    setDate({ now: next });

    tuiCalendar.next();
  };

  return (
    <Box display="flex" alignItems="center" mb={1}>
      <TodayButton onClick={handleToday}>Today</TodayButton>
      <CalendarButton onClick={handlePrev}>&lt;</CalendarButton>
      <CalendarButton onClick={handleNext}>&gt;</CalendarButton>
      <Typography variant="h5" sx={{ ml: 2 }}>
        {date.now.getFullYear()}년 {date.now.getMonth() + 1}월
      </Typography>
    </Box>
  );
};

export default Header;

import React from 'react';
import 'dayjs/locale/ko';
import TuiCalendar, { ISchedule } from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import _Popover from '@mui/material/Popover';
import theme from '../../../Palette';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SubjectIcon from '@mui/icons-material/Subject';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Typography from '@mui/material/Typography';
import usePutReservations from '../../../hooks/usePutReservations';
import { Reservation } from '../../../interfaces';
import useGetMyInfo from '../../../hooks/useGetMyInfo';

interface Schedule {
  id: string;
  title: string;
  subject: string;
  date: string;
  start: string;
  end: string;
  attendees: string;
  host: string;
}

interface PopoverProps {
  tuiCalendar: TuiCalendar;
  anchorEl: Element | null;
  setAnchorEl: (_: Element | null) => void;
  target?: ISchedule;
  schedule: Schedule;
  reservation?: Reservation;
}

const Popover: React.VFC<PopoverProps> = (props) => {
  const { tuiCalendar, anchorEl, setAnchorEl, target, schedule, reservation } =
    props;

  const { myInfo } = useGetMyInfo();

  const putReservations = usePutReservations();

  const handleAccept = () => {
    if (target) {
      target.color = 'white';
      target.bgColor = theme.status.ACCEPTED;
      target.borderColor = theme.status.ACCEPTED;
      tuiCalendar.updateSchedule(
        target.id as string,
        target.calendarId as string,
        target,
      );

      reservation?.attendeeList.forEach((at) => {
        if (at.email === myInfo.email) at.status = 'ACCEPTED';
      });

      let roomId = 1;
      if (reservation?.room) {
        roomId = reservation?.room.id ?? 1;
      }

      const modifiedReservation = {
        ...reservation,
        roomId: roomId,
        subjectId: reservation?.subject.id,
      };

      delete modifiedReservation.room;
      delete modifiedReservation.subject;
      delete modifiedReservation.reservationId;

      putReservations.handleSubmit(
        +schedule.id,
        modifiedReservation as Reservation,
      );
    }
    handleClose();
  };
  const handleRefuse = () => {
    if (target) {
      target.color = 'gray';
      target.bgColor = theme.status.REFUSED;
      target.borderColor = theme.status.REFUSED;
      tuiCalendar.updateSchedule(
        target.id as string,
        target.calendarId as string,
        target,
      );

      reservation?.attendeeList.forEach((at) => {
        if (at.email === myInfo.email) at.status = 'REFUSED';
      });

      let roomId = 1;
      if (reservation?.room) {
        roomId = reservation?.room.id ?? 1;
      }

      const modifiedReservation = {
        ...reservation,
        roomId: roomId,
        subjectId: reservation?.subject.id,
      };

      delete modifiedReservation.room;
      delete modifiedReservation.subject;
      delete modifiedReservation.reservationId;

      putReservations.handleSubmit(
        +schedule.id,
        modifiedReservation as Reservation,
      );
    }
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;
  return (
    <_Popover
      id={popoverId}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          width: 300,
          p: 3,
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
      >
        <Box pl={0.5}>
          <Typography variant="body1">{schedule.title}</Typography>
        </Box>
        <Box pl={0.5} pb={1} display="flex">
          <Typography variant="body2" fontSize="0.8rem">
            {schedule.date} ⋅ {schedule.start} ~ {schedule.end}
          </Typography>
        </Box>
        <Box p={0.5} display="flex">
          <SubjectIcon fontSize="inherit" style={{ marginRight: 4 }} />
          <Typography variant="body2" fontSize="0.8rem">
            {schedule.subject}
          </Typography>
        </Box>
        <Box p={0.5} display="flex">
          <GroupIcon fontSize="inherit" style={{ marginRight: 4 }} />
          <Typography variant="body2" fontSize="0.8rem">
            {schedule.attendees}
          </Typography>
        </Box>
        <Box p={0.5} display="flex">
          <AssignmentIndIcon fontSize="inherit" style={{ marginRight: 4 }} />
          <Typography variant="body2" fontSize="0.8rem">
            {schedule.host}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            pt: 2,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={handleAccept}
            style={{ margin: 8, color: 'white' }}
          >
            수락
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleRefuse}
            style={{ margin: 8 }}
          >
            거절
          </Button>
        </Box>
      </Box>
    </_Popover>
  );
};

export default Popover;

import React from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import SubjectIcon from '@mui/icons-material/Subject';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Box from '@mui/material/Box';
import MemoIcon from '../meeting-reservation/MemoIcon';
import theme from '../../Palette';
import File from './File';
import { OngoingMeeting } from '../../interfaces';

dayjs.locale('ko');

const ReservationInfoTypography = styled(Typography)`
  font-size: ${theme.typography.pxToRem(12)};
`;

const TextArea = styled(Box)`
  display: flex;
  gap: ${theme.spacing(1)};
  height: 130px;
  width: 100%;
  box-sizing: border-box;

  textarea {
    height: 100%;
    width: 100%;
    resize: none;
    border: 1px solid lightgray;
    border-radius: 5px;
  }

  textarea: focus {
    padding: ${theme.spacing(0.5)};
    font-size: 1rem;

    outline: none;
  }
`;

interface InfoProps {
  reservation: OngoingMeeting | null;
}

const Info: React.VFC<InfoProps> = (props) => {
  const { reservation } = props;

  const date = dayjs(reservation?.date);

  const month = date.format('MMMM');
  const day = date.format('D') + '일';
  const dayOfWeek = date.format('dddd');

  const start = dayjs(
    `${reservation?.date} ${reservation?.startTime}`,
    'YYYY-MM-D HH:mm:ss',
  );
  const end = dayjs(
    `${reservation?.date} ${reservation?.endTime}`,
    'YYYY-MM-D HH:mm:ss',
  );

  const startHour = start.format('A h');
  const startMinute = start.format('mm');

  const endHour = end.format('A h');
  const endMinute = end.format('mm');

  const displayDate = month + ' ' + day + ' ' + dayOfWeek;
  const startTime = startHour + ':' + startMinute;
  const endTime = endHour + ':' + endMinute;

  return (
    <Box display="flex" width="100%">
      <Box display="flex" flexDirection="column" width="50%" gap={1.5}>
        <Box>
          <Typography variant="h5" variantMapping={{ h5: 'h1' }}>
            {reservation?.title}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <SubjectIcon fontSize="inherit" sx={{ mr: 1 }} />
          <ReservationInfoTypography>
            {reservation?.subject.name}
          </ReservationInfoTypography>
        </Box>
        <Box display="flex" alignItems="center">
          <AccessTimeIcon fontSize="inherit" sx={{ mr: 1 }} />
          <ReservationInfoTypography>
            {displayDate} {startTime} ~ {endTime}
          </ReservationInfoTypography>
        </Box>
        <Box display="flex" alignItems="center">
          <GroupIcon fontSize="inherit" sx={{ mr: 1 }} />
          <ReservationInfoTypography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            주최자:{' '}
            {reservation?.attendeeList.filter((att) => att.isHost)[0].name} |
            참석자:{' '}
            {reservation?.attendeeList?.reduce((acc, attendee, idx) => {
              return idx === 0
                ? acc + attendee.name
                : acc + ', ' + attendee.name;
            }, '')}
          </ReservationInfoTypography>
        </Box>
        <Box display="flex" alignItems="center">
          <EmojiPeopleIcon fontSize="inherit" sx={{ mr: 1 }} />
          <ReservationInfoTypography>
            작성자:{' '}
            {reservation?.attendeeList.filter((att) => att.isWriter)[0].name}
          </ReservationInfoTypography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap={1} width="50%">
        <TextArea>
          <MemoIcon />
          <textarea
            name="memo"
            id="memo"
            readOnly
            value={reservation?.note}
            style={{
              resize: 'none',
            }}
          />
        </TextArea>
        <File minutesId={reservation?.minutesId} />
      </Box>
    </Box>
  );
};

export default Info;

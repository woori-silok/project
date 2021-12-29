import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Invitation } from './Notifications';

interface NotificationProps {
  invitation: Invitation;
}

const Notification: React.FC<NotificationProps> = (props) => {
  const { invitation } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', py: 2 }}>
      <Box sx={{ mb: 1 }}>
        <Typography>
          {invitation.host}님께서 귀하를 회의에 초대하셨습니다.
          확인하시겠습니까?
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography>주제: {invitation.title}</Typography>
        <Typography>
          날짜: {invitation.date.getFullYear()}.{invitation.date.getMonth() + 1}
          .{invitation.date.getDate()}
        </Typography>
        <Typography>
          시간: {invitation.startTime} -{invitation.endTime}
        </Typography>
      </Box>
      <Box sx={{ justifyContent: 'right', display: 'flex', gap: 1 }}>
        <Button variant="contained" sx={{ width: '100px' }}>
          이동
        </Button>
        <Button variant="outlined" sx={{ width: '100px' }}>
          취소
        </Button>
      </Box>
    </Box>
  );
};

export default Notification;

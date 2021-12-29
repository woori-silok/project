import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import Card from './Card';
import theme from '../../Palette';
import { FormData } from '../../interfaces';
import { roomStateContext } from '../../containers/meeting-reservation/MeetingReservation';

interface BottomProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const BottomWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: ${theme.spacing(4)} 0;
`;

const Bottom: React.FC<BottomProps> = (props) => {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const { setFormData } = props;

  useEffect(() => {
    setFormData((state) => ({ ...state, roomId: selectedRoom }));
  }, [selectedRoom]);

  const rooms = useContext(roomStateContext);

  const dangjinRooms = rooms.filter((room) => room.location === '당진');
  const seoulRooms = rooms.filter((room) => room.location === '서울');

  return (
    <BottomWrapper>
      <Box sx={{ display: 'inline' }}>
        <Typography variant="h5">당진</Typography>
        <br />
        <Box sx={{ display: 'flex', gap: 4.5 }}>
          {dangjinRooms.map((room) => (
            <Card
              key={room.name}
              setSelectedRoom={setSelectedRoom}
              selectedRoom={selectedRoom}
              room={room}
            />
          ))}
        </Box>
      </Box>
      <Box sx={{ display: 'inline' }}>
        <Typography variant="h5">서울</Typography>
        <br />
        <Box sx={{ display: 'flex', gap: 4.5 }}>
          {seoulRooms.map((room) => (
            <Card
              key={room.name}
              setSelectedRoom={setSelectedRoom}
              selectedRoom={selectedRoom}
              room={room}
            />
          ))}
        </Box>
      </Box>
    </BottomWrapper>
  );
};

export default Bottom;

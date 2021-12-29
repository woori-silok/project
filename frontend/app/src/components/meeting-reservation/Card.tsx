import React, { SetStateAction } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import theme from '../../Palette';
import { Room } from '../../containers/meeting-reservation/MeetingReservation';

interface CardProps {
  setSelectedRoom: React.Dispatch<SetStateAction<number | null>>;
  selectedRoom: number | null;
  room: Room;
}

const CardWrapper = styled(Box)<{
  selectedRoom: number | null;
  roomId: number;
  available: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 292px;
  height: 180px;
  padding: ${theme.spacing(1.5)};

  opacity: ${(props) => props.available || `0.6`};
  user-select: ${(props) => props.available || 'none'};

  &: hover {
    box-shadow: ${(props) =>
      props.selectedRoom !== props.roomId && `0px 5px 10px  lightgray`};
  }

  box-shadow: ${(props) =>
    props.available
      ? props.selectedRoom === props.roomId &&
        `0px 4px 8px ${theme.palette.primary.main}`
      : `inset 0 0 5px 1px lightgray`};

  transition: box-shadow 0.2s ease;

  border: ${(props) =>
    props.selectedRoom === props.roomId && props.available
      ? `2px solid ${theme.palette.primary.main} `
      : `1px solid lightgray`};
  border-radius: 4px;
  cursor: pointer;
  pointer-events: ${(props) => props.available || `none`};
`;
const Card: React.FC<CardProps> = (props) => {
  const {
    selectedRoom,
    setSelectedRoom,
    room: { roomId, name, location, capacity, facility, note, available },
  } = props;

  const handleClick = () => {
    if (roomId == selectedRoom) {
      setSelectedRoom(null);
    } else {
      setSelectedRoom(roomId);
    }
  };
  return (
    <CardWrapper
      onClick={handleClick}
      selectedRoom={selectedRoom}
      roomId={roomId}
      available={available}
    >
      {available || (
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: '0',
            left: '0',
            backgroundColor: 'rgba(90,90,90,0.1)',
          }}
        ></div>
      )}
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body2">장소: {location}</Typography>
      <Typography variant="body2">수용 인원: {capacity}인</Typography>
      <Typography variant="body2">시설: {facility}</Typography>
      <Typography variant="body2">비고: {note}</Typography>
    </CardWrapper>
  );
};

export default Card;

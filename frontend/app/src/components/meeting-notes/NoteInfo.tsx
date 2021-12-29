import React, { useState, useRef, useEffect } from 'react';
import { Divider, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import GuestsDropDownIcon from './GuestsDropDownIcon';
import List from '@mui/material/List';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import useOutsideClickDetect from '../../hooks/useOutsideClickDetect';
import { Minute } from '../../interfaces';

interface NoteInfoProps {
  noteData: Minute;
}

const Info = styled(Box)`
  width: 100%;
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 3px;
  border: 1px solid lightgray;
  transition: 0.2s;
  white-space: nowrap;

  &: hover {

  }

  & > div {
    cursor: default;
  }
`;

const Right = styled(Box)`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const Guests = styled(List)`
  position: absolute;
  white-space: nowrap;
  background-color: white;
  z-index: 1;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 0;
  width: 100%;

  & div {
    height: 1.2rem;
    text-align: center;
  }
`;

const NoteInfo: React.FC<NoteInfoProps> = (props) => {
  const { roomName, startTime, endTime, attendeeList, title } = props.noteData;
  const [guestsOpen, setGuestsOpen] = useState<boolean>(false);

  const guestsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const guestsOutsideDetect = useOutsideClickDetect(guestsRef, setGuestsOpen);

    return () => {
      document.removeEventListener('mousedown', guestsOutsideDetect);
    };
  });

  const handleShowGuests = () => {
    setGuestsOpen((prev) => !prev);
  };

  return (
    <Info>
      <Box onClick={(e) => e.stopPropagation()}>제목: {title}</Box>
      <Right onClick={(e) => e.stopPropagation()}>
        <Box>{roomName ? `회의실: ${roomName}` : '온라인 회의'}</Box>
        <Box>
          회의시간: {startTime.slice(0, 5)} ~ {endTime.slice(0, 5)}
        </Box>
        <Box sx={{ position: 'relative' }} ref={guestsRef}>
          <Box
            onClick={handleShowGuests}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography>참석자</Typography>
            <Box>
              <GuestsDropDownIcon />
            </Box>
          </Box>
          {guestsOpen && (
            <Guests>
              {attendeeList.map((attendee) => (
                <>
                  <ListItemText key={attendee.email}>
                    {attendee.name}
                  </ListItemText>
                  <Divider />
                </>
              ))}
            </Guests>
          )}
        </Box>
      </Right>
    </Info>
  );
};

export default NoteInfo;

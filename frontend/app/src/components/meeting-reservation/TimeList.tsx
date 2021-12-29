import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import styled from '@emotion/styled';

const TimeListWrapper = styled(List)`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  padding: 0;
  background-color: white;
  height: 200px;
  overflow-y: scroll;
  border: 1px solid lightgray;
  border-radius: 5px;
  z-index: 1;

  & div {
    padding: 2px 4px;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

interface TimeListProps {
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

const TimeList: React.FC<TimeListProps> = (props) => {
  const { setTime } = props;

  const returnAllDayHours = (): string[] => {
    const allDayHours: string[] = [];

    for (let i = 0; i <= 48; i++) {
      if (i % 2) {
        allDayHours.push(`${Math.floor(i / 2)}`.padStart(2, '0') + `:30`);
      } else {
        allDayHours.push(`${Math.floor(i / 2)}`.padStart(2, '0') + `:00`);
      }
    }

    return allDayHours;
  };

  const allDayHours = returnAllDayHours();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setTime(`${e.currentTarget.innerText}:00`);
  };

  return (
    <TimeListWrapper>
      {allDayHours.map((list) => {
        return (
          <ListItemButton key={list} role="option" onClick={handleClick}>
            <ListItemText>{list}</ListItemText>
          </ListItemButton>
        );
      })}
    </TimeListWrapper>
  );
};

export default TimeList;

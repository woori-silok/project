import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import theme from '../../Palette';
import ListItemButton from '@mui/material/ListItemButton';
import useGetMyInfo from '../../hooks/useGetMyInfo';
import useGetMembers from '../../hooks/useGetMembers';
import { FormData } from '../../interfaces';
import { Attendee } from '../../interfaces';
import useOutsideClickDetect from '../../hooks/useOutsideClickDetect';
import GuestsDropDownIcon from '../meeting-notes/GuestsDropDownIcon';
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from '@mui/material';

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: none;
  background-color: ${theme.palette.secondary.main};
  padding: ${theme.spacing(1)};
  font-size: 1rem;
  lineheight: 1rem;

  &: focus {
    outline: none;
  }
`;

const AttendeeListWrapper = styled.div`
  position: relative;

  font-size: 1rem;
  line-height: 1rem;
  white-space: nowrap;

  div {
    padding: 8px;
  }

  & > div {
    padding: 4px;
  }

  & ul {
    padding: 0;
    margin: 0;
  }
`;

interface AttendeesProps {
  setFormData: React.Dispatch<SetStateAction<FormData>>;
}

const Attendees: React.FC<AttendeesProps> = (props) => {
  const { setFormData } = props;
  const [attendeeList, setAttendeeList] = useState<Attendee[]>([]);
  const {
    myInfo: { name, email },
  } = useGetMyInfo();

  const members = useGetMembers().members.filter(
    (member) => member.email !== email,
  );

  useEffect(() => {
    setAttendeeList([
      { name, email, isHost: true, isWriter: true, status: 'WAITING' },
    ]);
  }, [name, email]);

  const handleAutoComplete = (
    event: React.SyntheticEvent<Element, Event>,
    values: Attendee[],
  ) => {
    values.map((value) => {
      if (!attendeeList.includes(value)) {
        setAttendeeList([...attendeeList, value]);
        setFormData((state) => ({
          ...state,
          attendeeList: [...state.attendeeList, value as Attendee],
        }));
      }
    });
  };

  const [attendeeListOpen, setAttendeeListOpen] = useState<boolean>(false);
  const attendeeListRef = useRef<HTMLDivElement>(null);
  useOutsideClickDetect(attendeeListRef, setAttendeeListOpen);

  const handleClear = (e: React.MouseEvent<HTMLSpanElement>, i: number) => {
    e.stopPropagation();
    const filteredList = attendeeList.filter((attendee, index) => index !== i);

    setAttendeeList(filteredList);
    setFormData((state) => ({ ...state, attendeeList: filteredList }));
  };

  return (
    <div style={{ display: 'flex', gap: `${theme.spacing(2)}` }}>
      <div style={{ width: '260px' }}>
        <Autocomplete
          value={attendeeList}
          id="attendees"
          options={members}
          getOptionLabel={(option) => `${option.name} ${option.email}`}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <Input {...params.inputProps} placeholder="참석자 추가" />
            </div>
          )}
          onChange={(event, values) => handleAutoComplete(event, values)}
          disableCloseOnSelect
          filterSelectedOptions
          multiple
        />
      </div>

      <AttendeeListWrapper ref={attendeeListRef}>
        <div
          onClick={() => setAttendeeListOpen((prev) => !prev)}
          style={{ cursor: 'pointer' }}
        >
          <Typography sx={{ display: 'inline', mr: 1 }}>참석자 목록</Typography>
          <GuestsDropDownIcon />
        </div>
        {attendeeListOpen && (
          <List
            style={{
              boxSizing: 'border-box',
              position: 'absolute',
              backgroundColor: 'white',
              border: '1px solid lightgray',
              borderRadius: '5px',
              maxHeight: '260x',
              zIndex: 1,
            }}
          >
            {attendeeList.map((attendee, i: number) => (
              <ListItemButton
                key={attendee.name}
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                }}
                onClick={() =>
                  setAttendeeList((attendees) => {
                    attendees = attendees.map((attendee, index) => {
                      return { ...attendee, isWriter: index === i };
                    });
                    setFormData((state) => ({
                      ...state,
                      attendeeList: attendees,
                    }));
                    return attendees;
                  })
                }
              >
                <Box component="span" sx={{ display: 'flex', gap: 1 }}>
                  <span style={{ width: '16px' }}>
                    {attendee.isWriter && <CreateIcon fontSize="small" />}
                  </span>
                  <Typography>
                    {attendee.name} {attendee.email}
                  </Typography>
                </Box>
                {i !== 0 && (
                  <Button
                    sx={{
                      borderRadius: '100%',
                      minWidth: 0,
                      padding: 0,
                    }}
                    onClick={(e: React.MouseEvent<HTMLSpanElement>) =>
                      handleClear(e, i)
                    }
                  >
                    <ClearIcon fontSize="small" color="warning" />
                  </Button>
                )}
              </ListItemButton>
            ))}
          </List>
        )}
      </AttendeeListWrapper>
    </div>
  );
};

export default Attendees;

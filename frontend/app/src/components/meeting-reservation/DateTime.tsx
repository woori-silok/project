import React, { useRef, useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import DatePicker from 'tui-date-picker';
import styled from '@emotion/styled';
import TimeList from './TimeList';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import theme from '../../Palette';
import { FormData } from '../../interfaces';
import { roomDispatchContext } from '../../containers/meeting-reservation/MeetingReservation';
import axios from 'axios';
import useOutsideClickDetect from '../../hooks/useOutsideClickDetect';

interface DateTimeProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Input = styled.input`
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background-color: ${theme.palette.secondary.main};
  padding: ${theme.spacing(1)};

  &:focus {
    outline: none;
  }
`;

const DateTimeWrapper = styled(Box)`
  display: flex;
  gap: ${theme.spacing(0.5)};
`;

const DateTime: React.FC<DateTimeProps> = (props) => {
  const { setFormData } = props;

  const [startTimeOpen, setStartTimeOpen] = useState<boolean>(false);
  const [endTimeOpen, setEndTimeOpen] = useState<boolean>(false);

  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const newDate = new Date();
  const now = {
    year: newDate.getFullYear(),
    month: newDate.getMonth() + 1,
    date: newDate.getDate(),
    hour: newDate.getHours(),
    minute: newDate.getMinutes(),
  };

  const [date, setDate] = useState<string>(
    `${now.year}-${String(now.month).padStart(2, '0')}-${String(
      now.date,
    ).padStart(2, '0')}`,
  );
  const [startTime, setStartTime] = useState<string>(
    now.minute >= 30
      ? `${String(now.hour + 1).padStart(2, '0')}:00:00`
      : `${String(now.hour).padStart(2, '0')}:30:00`,
  );
  const [endTime, setEndTime] = useState<string>(
    `${now.hour + 1}`.padStart(2, '0') + `:${now.minute < 30 ? '00' : '30'}:00`,
  );

  const dispatch = useContext(roomDispatchContext);

  useEffect(() => {
    pickerRef &&
      (picker = new DatePicker(pickerRef.current as HTMLDivElement, {
        language: 'ko',
      }));
    picker.setInput(inputRef.current as HTMLInputElement, {
      format: 'yyyy-MM-dd',
      syncFromInput: true,
    });
    picker.on('change', () => {
      const reservationDate = picker.getDate();
      setDate(
        `${reservationDate.getFullYear()}-${String(
          reservationDate.getMonth() + 1,
        ).padStart(2, '0')}-${String(reservationDate.getDate()).padStart(
          2,
          '0',
        )}`,
      );
    });
    picker.addCssClass('picker');

    setFormData((state) => ({ ...state, startTime, endTime, date }));

    try {
      (async () => {
        await axios
          .get(
            `/rooms?date=${date}&endTime=${endTime}&startTime=${startTime}&attendeeNumber=5`,
          )
          .then((res) => dispatch({ type: 'UPDATE', payload: res.data }));
      })();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [startTime, endTime, date]);

  let picker: DatePicker;

  const startTimeRef = useRef<HTMLDivElement>(null);
  const endTimeRef = useRef<HTMLDivElement>(null);

  useOutsideClickDetect(startTimeRef, setStartTimeOpen);
  useOutsideClickDetect(endTimeRef, setEndTimeOpen);
  return (
    <div style={{ display: 'flex' }}>
      <AccessTimeIcon sx={{ mr: 1 }} />
      <DateTimeWrapper>
        <div>
          <Input
            type="text"
            ref={inputRef}
            value={date}
            readOnly
            style={{ width: '90px' }}
          />
          <div
            ref={pickerRef}
            style={{
              position: 'relative',
              backgroundColor: 'white',
              width: '0',
            }}
          ></div>
        </div>
        <div
          style={{
            position: 'relative',
            cursor: 'pointer',
            backgroundColor: theme.palette.secondary.main,
            lineHeight: '1rem',
            padding: '8px',
          }}
          onClick={() => setStartTimeOpen((prev) => !prev)}
          ref={startTimeRef}
        >
          <span>
            {startTime.slice(0, 5)}
            {startTimeOpen && <TimeList setTime={setStartTime} />}
          </span>
        </div>
        <span>-</span>
        <div
          style={{
            position: 'relative',
            cursor: 'pointer',
            backgroundColor: theme.palette.secondary.main,
            lineHeight: '1rem',
            padding: '8px',
          }}
          onClick={() => setEndTimeOpen((prev) => !prev)}
          ref={endTimeRef}
        >
          <span>
            {endTime.slice(0, 5)}
            {endTimeOpen && <TimeList setTime={setEndTime} />}
          </span>
        </div>
      </DateTimeWrapper>
    </div>
  );
};

export default DateTime;

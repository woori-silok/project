import React, { SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { FormData } from '../../interfaces';
import useGetSubjects from '../../hooks/useGetSubjects';
import axios from 'axios';
import Box from '@mui/material/Box';
import theme from '../../Palette';
import Autocomplete from '@mui/material/Autocomplete';
import { Input } from './Attendees';

const AddSubjectValue = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  background-color: lightgray;
  padding: ${theme.spacing(1)};
  z-index: 1;
  white-space: nowrap;
  overflow-x: hidden;
  cursor: pointer;
`;

const Subject: React.FC<{
  setFormData: React.Dispatch<SetStateAction<FormData>>;
}> = (props) => {
  const { setFormData } = props;
  const { subjects } = useGetSubjects();
  const [inputValue, setInputValue] = useState<string>('');

  const setSubject = (subjectId?: number) => {
    setFormData((state) => ({ ...state, subjectId }));
  };

  const addSubject = async () => {
    subjects.push({
      id: subjects.length + 1,
      name: inputValue,
    });

    try {
      await axios.post('/subjects', { name: inputValue });
      setInputValue('');
    } catch (error) {
      //eslint-disable-next-line
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: `${theme.spacing(2)}` }}>
      <Box sx={{ flex: 1 }}>
        <Autocomplete
          id="subjects"
          options={subjects}
          getOptionLabel={(option) => '' + option.name}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <Input {...params.inputProps} placeholder="주제 선택" />
            </div>
          )}
          onChange={(event, value) => setSubject(value?.id)}
          disableCloseOnSelect
        />
      </Box>
      <Box sx={{ position: 'relative', flex: 1 }}>
        <Input
          value={inputValue}
          placeholder="주제 추가"
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
        {inputValue.length > 0 && (
          <AddSubjectValue role="button" onClick={addSubject}>
            + {inputValue}
          </AddSubjectValue>
        )}
      </Box>
    </Box>
  );
};

export default Subject;

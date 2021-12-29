import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import useGetSubjects from '../../hooks/useGetSubjects';
import { Subject as SubjectInterface } from '../../interfaces';
import Minutes from './Minutes';
import { useParams, useHistory } from 'react-router';

const MeetingNotes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [selectedSubject, setSelectedSubject] = useState<SubjectInterface>(
    {} as SubjectInterface,
  );

  const { subjects, loading, error } = useGetSubjects();

  useEffect(() => {
    const firstSubject = subjects.filter((subject) => subject.id == +id)[0];
    if (firstSubject) {
      setSelectedSubject({ id: firstSubject?.id, name: firstSubject?.name });
    } else {
      setSelectedSubject({
        id: subjects[0]?.id,
        name: subjects[0]?.name,
      });
    }
  }, [subjects]);

  if (loading || error) {
    return (
      <Box textAlign="center">
        {loading && <CircularProgress />}
        {error && <div>{error.message}</div>}
      </Box>
    );
  }

  return (
    <>
      <Autocomplete
        id="subject"
        defaultValue={subjects[0]}
        value={selectedSubject}
        options={subjects}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField placeholder="주제" {...params} />}
        sx={{ mb: 2, width: '250px' }}
        //eslint-disable-next-line
        onChange={(event, value: any) => {
          if (value) {
            history.replace(`/meeting-notes/${value.id}`);
            setSelectedSubject({ id: value?.id, name: value?.name });
          }
        }}
        autoHighlight
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
      <Minutes id={id ? +id : selectedSubject.id} />
    </>
  );
};

export default MeetingNotes;

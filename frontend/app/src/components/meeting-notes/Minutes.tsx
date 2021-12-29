import React from 'react';
import Note from './Note';
import useGetMinutes from '../../hooks/useGetMinutes';
import CircularProgress from '@mui/material/CircularProgress';

interface MinutesProps {
  id: number;
}

const Minutes: React.FC<MinutesProps> = (props) => {
  const { id } = props;
  const { minutes, loading, error } = useGetMinutes(id);

  if (loading || error) {
    return (
      <div>
        {loading && <CircularProgress />}
        {error && <div>{error.message}</div>}
      </div>
    );
  }

  return (
    <ul style={{ minWidth: '1000px' }}>
      {minutes
        .sort((a, b) => b.minutesId - a.minutesId)
        .map((note) => (
          <li key={note.minutesId}>
            <Note noteData={note} />
          </li>
        ))}
    </ul>
  );
};

export default Minutes;

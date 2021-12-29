import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import usePutMinutes from '../../hooks/usePutMinutes';
import usePostMinutes from '../../hooks/usePostMinutes';
import { Member, Minute } from '../../interfaces';
import useGetMembers from '../../hooks/useGetMembers';
import useGetMyInfo from '../../hooks/useGetMyInfo';
import Checkbox from '@mui/material/Checkbox';

interface ActionProps {
  minute: Minute;
}

const Action: React.VFC<ActionProps> = (props) => {
  const { minute } = props;

  const {
    myInfo: { email },
  } = useGetMyInfo();

  const members = useGetMembers().members.filter(
    (member) => member.email !== email,
  );

  const putMinutes = usePutMinutes();
  const postMinutes = usePostMinutes();

  const [shareMembers, setShareMembers] = useState<Member[]>([]);

  const handleSubmitShareMinuets = async (
    minuetsId: number,
    members: Member[],
  ) => {
    const emails = members.map((m) => m.email);
    postMinutes.handleSubmit(minuetsId, emails);
  };

  const handleSubmitMinuets = async (minuetsId: number, minute: Minute) => {
    putMinutes.handleSubmit(minuetsId, minute);
  };

  return (
    <Box display="flex" width="100%" justifyContent="space-between">
      <Box display="flex" gap={0.5}>
        <Autocomplete
          id="add-share-member"
          value={shareMembers}
          options={members}
          multiple
          freeSolo
          disableCloseOnSelect
          fullWidth
          onChange={(event, values) => {
            setShareMembers(
              Array.from(new Set([...shareMembers, ...(values as Member[])])),
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label="공유자 추가" size="small" />
          )}
          getOptionLabel={(option) => `${option.name} ${option.email}`}
          ChipProps={{
            sx: { display: 'none' },
          }}
          clearIcon={<div></div>}
          renderOption={(props, option, { selected }) => {
            return (
              <li {...props}>
                <Checkbox checked={selected} />
                {option.name} {option.email}
              </li>
            );
          }}
          sx={{
            minWidth: 300,
            '& .MuiOutlinedInput-root': {},
          }}
        />
        <Button
          variant="outlined"
          onClick={() =>
            handleSubmitShareMinuets(minute.minutesId, shareMembers)
          }
          sx={{ height: 40 }}
        >
          공유
        </Button>
      </Box>
      <Button
        variant="contained"
        onClick={() => handleSubmitMinuets(minute.minutesId, minute)}
      >
        저장
      </Button>
    </Box>
  );
};

export default Action;

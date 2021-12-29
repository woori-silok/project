import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import theme from '../../Palette';
import Button from '@mui/material/Button';
import GroupIcon from '@mui/icons-material/Group';
import MemoIcon from './MemoIcon';
import DateTime from './DateTime';
import Subject from './Subject';
import Attendees from './Attendees';
import { FormData } from '../../interfaces';
import SubjectIcon from '@mui/icons-material/Subject';

interface TopProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const TopWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing(2)};
  height: 200px;
  box-sizing: content-box;
  padding-bottom: ${theme.spacing(2)};
`;

const IconInputWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
`;

const Input = styled.input`
  font-size: 1rem;
  line-height: 1rem;
  background-color: ${theme.palette.secondary.main};
  padding: ${theme.spacing(1)};
  border: none;
  border-radius: 2px;
  &: focus {
    outline: none;
  }
`;

const Left = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  min-width: 350px;
`;

const Title = styled(Box)`
  width: 90%;
  input {
    padding-left: ${theme.spacing(0.5)};
    width: 100%;
    height: 40px;
    font-size: 1.5rem;
    background-color: white;
  }
`;

const Right = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${theme.spacing(0.5)};
  width: 55%;
  min-width: 500px;
`;

const TextArea = styled(Box)`
  display: flex;
  gap: ${theme.spacing(1)};
  height: 150px;
  box-sizing: border-box;

  textarea {
    height: 100%;
    width: 100%;
    resize: none;
    border: 1px solid lightgray;
    border-radius: 5px;
    font-family: inherit;
  }

  textarea: focus {
    padding: ${theme.spacing(0.5)};
    font-size: 1rem;

    outline: none;
  }
`;

const Top: React.FC<TopProps> = (props) => {
  const { setFormData } = props;

  const titleRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const handleBlurTitle = () => {
    if (titleRef.current) {
      setFormData((state) => ({ ...state, title: titleRef?.current?.value }));
    }
  };

  const onBlurMemo = () => {
    if (noteRef.current) {
      setFormData((state) => ({ ...state, note: noteRef?.current?.value }));
    }
  };

  const [isOnline, setIsOnline] = useState<boolean>(false);

  const handleClickOnline = () => {
    setIsOnline(true);
    setFormData((state) => ({
      ...state,
      online: { ...state.online, isOnline: true },
    }));
  };

  const handleClickOffline = () => {
    setIsOnline(false);
    setFormData((state) => ({
      ...state,
      online: { ...state.online, isOnline: false },
    }));
  };

  const [onlineUrl, setOnlineUrl] = useState<string>('');

  const handleChangeUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnlineUrl(e.currentTarget?.value);
  };
  const handleOnlineUrlInput = () => {
    setFormData((state) => ({
      ...state,
      online: { ...state.online, onlineUrl },
    }));
  };

  return (
    <TopWrapper>
      <Left>
        <Title>
          <Input placeholder="제목" onBlur={handleBlurTitle} ref={titleRef} />
          <Divider />
        </Title>
        <IconInputWrapper>
          <SubjectIcon />
          <Subject setFormData={setFormData} />
        </IconInputWrapper>
        <DateTime setFormData={setFormData} />
        <IconInputWrapper>
          <GroupIcon />
          <Attendees setFormData={setFormData} />
        </IconInputWrapper>
      </Left>
      <Right>
        <TextArea>
          <MemoIcon />
          <textarea
            name="memo"
            id="memo"
            onBlur={onBlurMemo}
            ref={noteRef}
          ></textarea>
        </TextArea>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              paddingLeft: 4,
              whiteSpace: 'nowrap',
            }}
          >
            <Box>
              <input
                type="radio"
                id="offline"
                value="offline"
                name="isOnline"
                defaultChecked
                onChange={handleClickOffline}
              />
              <label htmlFor="offline">오프라인</label>
            </Box>
            <Box>
              <input
                type="radio"
                id="online"
                value="online"
                name="isOnline"
                onChange={handleClickOnline}
              />
              <label htmlFor="online">온라인</label>
            </Box>
            <Box>
              <input
                placeholder="URL 주소"
                style={{ width: '230px' }}
                disabled={isOnline ? false : true}
                onChange={handleChangeUrlInput}
                onBlur={handleOnlineUrlInput}
              />
            </Box>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ float: 'right', width: '96px' }}
          >
            예약
          </Button>
        </Box>
      </Right>
    </TopWrapper>
  );
};

export default Top;

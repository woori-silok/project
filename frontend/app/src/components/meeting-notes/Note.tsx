import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import NoteInfo from './NoteInfo';
import { Viewer } from '@toast-ui/react-editor';
import { Minute } from '../../interfaces';
import theme from '../../Palette';
import axios from 'axios';
import useOutsideClickDetect from '../../hooks/useOutsideClickDetect';

interface NoteProps {
  noteData: Minute;
}

const DateProvider = styled.div`
  opacity: 0;
  position: absolute;
  text-align: center;
  width: 100%;
  transform: translateY(-50%);
  transition: 0.1s;

  & div {
    display: inline-block;
    background-color: white;
    border: 1px solid lightgray;
    width: 120px;
    border-radius: 15px;
    padding: 0.2rem;
  }
`;

const NoteWrapper = styled(Box)`
  position: relative;
  margin-bottom: ${theme.spacing(1)};

  &:hover > div:first-child {
    opacity: 1;
  }
`;

const Content = styled(Box)<{ showMore: boolean; fileExist: boolean }>`
  background-color: ${theme.palette.secondary.main};
  height: ${(props) => (props.showMore ? 'auto' : '0')};
  padding: ${(props) =>
    props.showMore
      ? props.fileExist
        ? '16px 8px 8px 8px'
        : '16px 8px 16px 8px'
      : '0'};
  transition: 0.25s;
  '16px 8px 8px 8px' p {
    margin: 0;
  }
`;

const Note: React.FC<NoteProps> = (props) => {
  const { createdDate, content, minutesId, attachFileDTOList } = props.noteData;
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showFiles, setShowFiles] = useState<boolean>(false);

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const handleFileDownload = async (id: number, name: string) => {
    try {
      const response = await axios.get(`/files/download/${id}`, {
        headers: {
          responseType: 'arraybuffer',
        },
      });
      const downloadUrl = URL.createObjectURL(
        new Blob([response.data], { type: response.headers['content-type'] }),
      );
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const fileRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const filesOutsideDetect = useOutsideClickDetect(fileRef, setShowFiles);

    return () => {
      document.removeEventListener('mousedown', filesOutsideDetect);
    };
  });

  return (
    <NoteWrapper id={String(minutesId)}>
      <DateProvider>
        <Box>
          <Typography fontWeight="500" fontSize="0.9rem">
            {createdDate.slice(0, 10)}
          </Typography>
        </Box>
      </DateProvider>
      <Box onClick={handleShowMore} sx={{ cursor: 'pointer' }}>
        <NoteInfo noteData={props.noteData} />
      </Box>
      <Content showMore={showMore} fileExist={attachFileDTOList.length > 0}>
        {showMore && (
          <Box>
            <Viewer initialValue={content.length > 0 ? content : '빈 회의록'} />
            {attachFileDTOList.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'right',
                }}
              >
                <AttachFileIcon fontSize="inherit" />
                <Typography
                  variant="button"
                  sx={{
                    position: 'relative',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={() => setShowFiles((p) => !p)}
                  ref={fileRef}
                >
                  첨부파일
                  {showFiles && (
                    <Box
                      position="absolute"
                      sx={{
                        top: 'calc(100% + 8px)',
                        right: '0%',
                        minWidth: '100px',
                        maxWidth: '150px',
                        minHeight: '30px',
                        zIndex: '1',
                        backgroundColor: 'white',
                        border: '1px solid lightgray',
                        borderRadius: '3px',
                        p: 1,
                      }}
                    >
                      {attachFileDTOList.map((file) => (
                        <Box
                          sx={{
                            textAlign: 'left',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                          }}
                          key={file.name}
                          onClick={() => handleFileDownload(file.id, file.name)}
                        >
                          {file.name}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Content>
    </NoteWrapper>
  );
};

export default Note;

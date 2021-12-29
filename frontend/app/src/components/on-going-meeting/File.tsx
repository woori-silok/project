import React, { useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDropzone } from 'react-dropzone';
import theme from '../../Palette';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import axios from 'axios';

interface FileProps {
  minutesId?: number | null;
}

const ReservationInfoTypography = styled(Typography)`
  font-size: ${theme.typography.pxToRem(12)};
`;

const FileDrop = styled(Box)`
  position: absolute;
  top: calc(100% + 8px);
  height: 200px;
  width: 400px;
  border: 1px solid lightgray;
  background-color: white;
  z-index: 1;
  cursor: pointer;
`;

const File: React.FC<FileProps> = (props) => {
  const { minutesId } = props;
  const [dropZoneOpen, setDropZoneOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (files: File[]) => {
    files.forEach((file: File) => {
      setFiles((files) => [...files, file]);
    });
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleFileButton = async (id?: number | null) => {
    if (id) {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      try {
        await axios.post(`/files/upload/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        //eslint-disable-next-line
        console.error(error);
      }
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <AttachFileIcon fontSize="inherit" sx={{ mr: 1 }} />
      <Box position="relative" sx={{ cursor: 'pointer' }}>
        <ReservationInfoTypography onClick={() => setDropZoneOpen((p) => !p)}>
          첨부파일
        </ReservationInfoTypography>
        {dropZoneOpen && (
          <FileDrop {...getRootProps()}>
            <input {...getInputProps({ multiple: true })} />
            {acceptedFiles.length == 0 && (
              <Typography
                sx={{ lineHeight: '200px' }}
                textAlign="center"
                color="gray"
              >
                이 곳을 클릭하거나 파일을 드래그 하여 업로드하세요.
              </Typography>
            )}
            <ul>
              {files.map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          </FileDrop>
        )}
      </Box>
      <button
        style={{ marginLeft: '8px' }}
        onClick={() => handleFileButton(minutesId)}
      >
        업로드
      </button>
    </Box>
  );
};

export default File;

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material';

const Toolbar = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const MainContents: React.FC = ({ children }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
      <Toolbar />
      <Container maxWidth={false} sx={{ px: 0 }}>
        {children}
      </Container>
    </Box>
  );
};

export default MainContents;

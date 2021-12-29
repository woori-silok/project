import styled from '@emotion/styled';
import { CssBaseline } from '@mui/material';
import React from 'react';

const BaseContainer = styled.div`
  display: flex;
`;

const BaseLayout: React.FC = (props) => {
  const { children } = props;
  return (
    <BaseContainer>
      <CssBaseline />
      {children}
    </BaseContainer>
  );
};

export default BaseLayout;

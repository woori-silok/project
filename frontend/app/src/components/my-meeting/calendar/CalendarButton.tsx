import React from 'react';
import styled from '@emotion/styled';
import theme from '../../../Palette';

export const StyledButton = styled.button`
  &:hover {
    background-color: lightgray;
  }

  border-radius: 25px;
  border: 1px solid #ddd;
  font-size: ${theme.typography.pxToRem(12)};
  color: #333;
  margin-right: ${theme.spacing(0.5)};
  background-color: white;
  padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
  cursor: pointer;
`;

interface CalendarButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CalendarButton: React.FC<CalendarButtonProps> = (props) => {
  const { children, onClick } = props;
  return (
    <StyledButton type="button" onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default CalendarButton;

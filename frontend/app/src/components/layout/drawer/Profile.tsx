import React from 'react';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import theme from '../../../Palette';
import ProfileDefaultIcon from './ProfileDefaultIcon';
import LogoutIcon from './LogoutIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useGetMyInfo from '../../../hooks/useGetMyInfo';
import { useHistory } from 'react-router';

const ProfileWrapper = styled(Box)`
  width: 240px;
  display: flex;
  justify-content: flex-start;
  padding: ${theme.spacing(2)};
`;

const IconBox = styled(Box)`
  width: 20%;
  line-height: 0;
`;

const TypoBox = styled(Box)`
  width: 80%;
  text-align: center;
`;

const Button = styled.button`
  padding: 0;
  background-color: none;
  border: none;
  cursor: pointer;
`;

const Profile: React.FC = () => {
  const {
    myInfo: { name, authorityDtoSet },
  } = useGetMyInfo();

  const role =
    authorityDtoSet[0]?.authorityName === 'ROLE_USER' ? '사용자' : '관리자';

  const history = useHistory();
  const handleClickLogoutButton = () => {
    localStorage.removeItem('woori-silok-jwt');
    history.push('/login');
  };
  return (
    <div>
      <Divider />
      <ProfileWrapper>
        <IconBox>
          <ProfileDefaultIcon />
        </IconBox>
        <TypoBox>
          <Typography>
            {role} {name}
          </Typography>
        </TypoBox>
        <Button onClick={handleClickLogoutButton}>
          <IconBox>
            <LogoutIcon />
          </IconBox>
        </Button>
      </ProfileWrapper>
    </div>
  );
};

export default Profile;

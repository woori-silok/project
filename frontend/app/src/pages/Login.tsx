import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import axios from 'axios';
import useLoginValidate from '../hooks/useLoginValidate';

const Input = styled(OutlinedInput)`
  width: 400px;
  height: 44px;
`;

interface LoginStatus {
  error: Error | null;
  loading: boolean;
}

const Login: React.FC = () => {
  const [status, setStatus] = useState<LoginStatus>({
    error: null,
    loading: false,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const isValid = await useLoginValidate(email, password);
    const isValid = true;
    if (isValid) {
      try {
        const response = await axios.post('/login', {
          email: 'ljs981120@gmail.com',
          password: 'admin',
        });
        const { accessToken, refreshToken } = response.data;
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
        localStorage.setItem('woori-silok-jwt', accessToken);
        localStorage.setItem('refresh-token', refreshToken);
        setStatus({ ...status, loading: false, error: null });
        console.log(refreshToken);
      } catch (error) {
        if (error.response.status == 400 || error.response.status == 401) {
          setStatus({
            ...status,
            error: new Error('아이디 혹은 비밀번호가 일치하지 않습니다.'),
          });
        }
      }
      history.goBack();
    } else {
      setStatus({
        ...status,
        error: new Error('올바른 형태의 이메일과 비밀번호를 입력해주세요.'),
      });
    }
  };

  return (
    <div>
      <Global
        styles={css`
          body {
            padding: 0;
            margin: 0;
          }
        `}
      ></Global>
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Box sx={{ mb: 5.5 }}>
          <Typography
            sx={{ fontSize: '5rem', lineHeight: '5rem' }}
            align="center"
          >
            Woori Sillok
          </Typography>
          <Typography sx={{ fontSize: '1.5rem' }} align="center">
            로그인
          </Typography>
        </Box>
        <form onSubmit={handleLogin}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              mb: 7,
            }}
          >
            <Input
              placeholder="이메일 주소"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            ></Input>
            <Input
              type="password"
              placeholder="비밀번호"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            ></Input>
            {status.error && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  color: 'red',
                  fontSize: '0.8rem',
                }}
              >
                {`${status.error.message}`}
              </Box>
            )}
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: '400px', color: 'white' }}
            >
              로그인
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default Login;

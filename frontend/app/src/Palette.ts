import React from 'react';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  drawer: {
    main: '#F7F6F3',
  },
  status: {
    ACCEPTED: '#1B73E8',
    REFUSED: '#F2F2F2',
    WAITING: '#F96648',
  },
  palette: {
    primary: {
      main: '#1B73E8', //google
      // main: '#79589F', //heroku
    },
    secondary: {
      main: '#F7F6F3',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ul{
          list-style:none;
          padding:0;
          margin:0;
        }
      `,
    },
    // 사이드바 컬러 설정
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#F7F6F3',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#EDECE9',
            '&:hover': {
              backgroundColor: '#EDECE9',
            },
          },
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Theme {
    drawer: {
      main: React.CSSProperties['color'];
    };
    status: {
      ACCEPTED: React.CSSProperties['color'];
      REFUSED: React.CSSProperties['color'];
      WAITING: React.CSSProperties['color'];
    };
  }

  interface ThemeOptions {
    drawer: {
      main: React.CSSProperties['color'];
    };
    status: {
      ACCEPTED: React.CSSProperties['color'];
      REFUSED: React.CSSProperties['color'];
      WAITING: React.CSSProperties['color'];
    };
  }
}

export default theme;

import React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import NotificationsContainer from '../../../containers/layout/Notifications';
import { useHistory } from 'react-router';

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
}

const drawerWidth = 240;

//* drawer에서 closed 됐을 때 width: theme.spacing(7)+1px == 57
const drawerWidthClosed = 57;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  color: 'black',
  zIndex: theme.zIndex.drawer,
  width: `calc(100% - ${drawerWidthClosed}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface AppBarLayoutProps {
  drawerOpen: boolean;
}

const AppBarLayout: React.FC<AppBarLayoutProps> = (props) => {
  const { drawerOpen } = props;
  const history = useHistory();

  return (
    <AppBar position="fixed" open={drawerOpen} elevation={0}>
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h5"
          noWrap
          component="div"
          fontWeight="bold"
          style={{ color: 'black' }}
        >
          {
            {
              '': '오늘의 회의',
              'meeting-reservation': '회의 예약',
              'meeting-notes': '회의록',
              'on-going-meeting': '참여 중인 회의',
              'my-meeting': '내 회의',
            }[`${history.location.pathname}`.split('/')[1]]
          }
        </Typography>
        <NotificationsContainer />
      </Toolbar>
    </AppBar>
  );
};

export default AppBarLayout;

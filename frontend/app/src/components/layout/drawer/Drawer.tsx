import React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TodayMeetingsIcon from '@mui/icons-material/Today';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import OngoingMeetingIcon from './OngoingMeetingIcon';
import PersonIcon from '@mui/icons-material/Person';
import MeetingNotesIcon from './MeetingNotesIcon';
import { NavLink } from 'react-router-dom';
import ProfileContainer from '../../../containers/layout/Profile';
import { useHistory } from 'react-router';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const ListProfileWrapper = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ListItemIconArrange = styled(ListItemIcon)`
  text-align: center;
`;

interface MiniDrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MiniDrawer: React.FC<MiniDrawerProps> = (props) => {
  const { drawerOpen, setDrawerOpen } = props;

  const handleDrawerToggle = () => {
    setDrawerOpen((p) => !p);
  };

  const menuItems = [
    {
      name: '오늘의 회의',
      icon: TodayMeetingsIcon,
      path: '/',
    },
    {
      name: '회의 예약',
      icon: MeetingRoomIcon,
      path: '/meeting-reservation',
    },
    {
      name: '회의록',
      icon: MeetingNotesIcon,
      path: '/meeting-notes',
    },
    {
      name: '참여 중인 회의',
      icon: OngoingMeetingIcon,
      path: '/on-going-meeting',
    },
    {
      name: '내 회의',
      icon: PersonIcon,
      path: '/my-meeting',
    },
  ];

  const history = useHistory();

  return (
    <Drawer variant="permanent" open={drawerOpen}>
      <DrawerHeader>
        <Box minWidth={64}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Typography sx={{ fontSize: '1.1rem' }}>Woori-Sillok</Typography>
      </DrawerHeader>
      <Divider />
      <ListProfileWrapper>
        <List sx={{ padding: 0 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.name}
              exact
              to={item.path}
              component={NavLink}
              sx={{ p: 2 }}
              selected={history.location.pathname === item.path}
            >
              <ListItemIconArrange>
                {React.createElement(item.icon)}
              </ListItemIconArrange>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
        <ProfileContainer />
      </ListProfileWrapper>
    </Drawer>
  );
};

export default MiniDrawer;

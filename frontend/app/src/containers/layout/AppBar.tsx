import React from 'react';
import AppBar from '../../components/layout/appbar/AppBar';

interface AppBarContainerProps {
  drawerOpen: boolean;
}

const AppBarContainer: React.FC<AppBarContainerProps> = (props) => {
  return <AppBar drawerOpen={props.drawerOpen} />;
};

export default AppBarContainer;

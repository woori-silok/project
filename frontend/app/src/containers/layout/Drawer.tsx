import React, { Dispatch, SetStateAction } from 'react';
import Drawer from '../../components/layout/drawer/Drawer';

interface DrawerContainerProps {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const DrawerContainer: React.FC<DrawerContainerProps> = (props) => {
  return (
    <Drawer drawerOpen={props.drawerOpen} setDrawerOpen={props.setDrawerOpen} />
  );
};

export default DrawerContainer;

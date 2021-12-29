import React, { useState } from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import DrawerContainer from '../../containers/layout/Drawer';
import AppBarContainer from '../../containers/layout/AppBar';

interface BaseLayoutContainerProps {
  component: React.FC;
}

const BaseLayoutContainer: React.FC<BaseLayoutContainerProps> = (props) => {
  const { component: Component } = props;

  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);

  return (
    <BaseLayout>
      <DrawerContainer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <AppBarContainer drawerOpen={drawerOpen} />
      <Component />
    </BaseLayout>
  );
};

export default BaseLayoutContainer;

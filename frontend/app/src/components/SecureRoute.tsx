import React from 'react';
import { Route } from 'react-router-dom';
import BaseLayoutContainer from '../containers/layout/BaseLayout';

interface SecureRouteProps {
  component: React.FC;
  path: string;
  exact?: boolean;
}

const SecureRoute: React.VFC<SecureRouteProps> = ({
  component: Component,
  ...args
}) => {
  return (
    <Route {...args}>
      <BaseLayoutContainer component={Component} />;
    </Route>
  );
};

export default SecureRoute;

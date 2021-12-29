import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import BaseLayoutContainer from '../../containers/layout/BaseLayout';
import useToken from '../../hooks/useToken';

interface SecureRouteProps {
  component: React.FC;
  path: string;
  exact?: boolean;
}

const SecureRoute: React.FC<SecureRouteProps> = (props) => {
  const { component: Component, ...args } = props;
  const token = useToken();
  if (token) {
    return (
      <Route {...args}>
        <BaseLayoutContainer component={Component} />
      </Route>
    );
  } else {
    return <Redirect push to="/login"></Redirect>;
  }
};

export default SecureRoute;

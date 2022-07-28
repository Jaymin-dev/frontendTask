import React, { useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { isLoggedIn } from "./utils/utility";
import Routes from "./Routes";

const renderRoutes = () => {
  const renderRoute = (routerProps, Component, props, isPrivate = false) => {
    if (Component) {
      const componentProps = {
        ...routerProps,
        ...props,
      };
      return <Component {...componentProps} />;
    }
  };

  return Routes.map((route) => (
    <Route
      key={route.name}
      exact={route.exact}
      path={route.path}
      render={(routerProps) =>
        renderRoute(routerProps, route.component, route.props, route.isPrivate)
      }
    />
  ));
};

const Router = () => <Switch>{renderRoutes()}</Switch>;

const App = () => {
  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default withRouter(App);

import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { ROUTES_MAP } from '../utils/routesMap';

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
      {
        () => props.isUserLoggedIn ? <Component {...props} /> : <Redirect to={ROUTES_MAP.SIGNIN} />
      }
    </Route>
)}

export default ProtectedRoute; 
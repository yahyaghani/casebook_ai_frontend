import React, { Component, Suspense, lazy } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import Spinner from "./Dashboard/Spinner";
import Register from "./Register";
import Highlight from "./shared/Highlight";
import Login from "./Login";
const Dashboard = lazy(() => import("./Dashboard/Index"));

function AppRoutes(props) {
  return (
    <Suspense fallback={<Spinner />}>
      {props.highlight === true && <Highlight />}

      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route
          exact
          path="/dashboard"
          render={() => <Dashboard showFileViewer={props.showFileViewer} />}
        />
        <Redirect to="/dashboard" />
      </Switch>
    </Suspense>
  );
}

export default AppRoutes;

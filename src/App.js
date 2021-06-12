// @flow

// Based on https://github.com/agentcooper/react-pdf-highlighter/tree/master/packages/example
// rewritten with hooks

import React, { useState, useReducer, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./AppRoutes";

import { reducer, InitialState } from "./Reducers";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import Highlight from "./Dashboard/Highlight";
import NodePreview from "./Dashboard/NodePreview";
import Register from "./Dashboard/Register";
import DashboardView from "./Dashboard/DashboardView";
import Login from "./Dashboard/Login";
//import testHighlights from "./test-highlights";

import Sidebar from "./shared/Sidebar";
import "./App.scss";

import "./style/App.css";
import Navbar from "./shared/Navbar";
import FileViewer from "./Dashboard/FileViewer";
import { fetchAuth } from "./utils";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [showHighlight, setShowHighlight] = useState(false);
  const [showFileViewer, setShowFileViewer] = useState(false);
  const [showDashboardView, setShowDashboardView] = useState(true);

  function getHighlightClicks(val) {
    setShowHighlight(val);
    if (val) setShowFileViewer(false);
    if (val) setShowDashboardView(false);
  }

  function getFileViewerClicks(val) {
    setShowFileViewer(val);
    if (val) setShowHighlight(false);
    if (val) setShowDashboardView(false);
  }

  function getDashboardViewClicks(val) {
    setShowDashboardView(val);
    if (val) setShowHighlight(false);
    if (val) setShowFileViewer(false);
  }

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/dashboard">
            <div className="container-scroller">
              <Sidebar
                HighlightClicks={getHighlightClicks}
                FileViewerClicks={getFileViewerClicks}
                DashboardViewClicks={getDashboardViewClicks}
              />
              <div className="container-fluid page-body-wrapper">
                <Navbar />
                <div className="main-panel">
                  <div className="show_side" style={{ display: "flex" }}>
                    {showHighlight === true && <Highlight />}
                    {showFileViewer === true && <FileViewer />}
                    <div className="content-wrapper" style={{ width: "75%" }}>
                      <AppRoutes
                        showFileViewer={showFileViewer}
                        showDashboardView={showDashboardView}
                        showHighlight={showHighlight}
                      />
                    </div>
                    {showHighlight === true && state.searchQuery !== "" && <NodePreview />}
                  </div>
                </div>
              </div>
            </div>
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

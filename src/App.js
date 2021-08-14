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
import NodesList from "./Dashboard/NodesList";
import Register from "./Dashboard/Register";
import Login from "./Dashboard/Login";
//import testHighlights from "./test-highlights";

import Sidebar from "./shared/Sidebar";
import "./App.scss";

import "./style/App.css";
import Navbar from "./shared/Navbar";
import FileViewer from "./Dashboard/FileViewer";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [showHighlight, setShowHighlight] = useState(false);
  const [showFileViewer, setShowFileViewer] = useState(false);
  const [showDashboardView, setShowDashboardView] = useState(true);
  const [showProfileView, setShowProfileView] = useState(false);
  const [showFeedView, setShowFeedView] = useState(false);

  function getHighlightClicks(val) {
    setShowHighlight(val);
    if (val) setShowFileViewer(false);
    if (val) setShowDashboardView(false);
    if (val) setShowProfileView(false);
    if (val) setShowFeedView(false);
  }

  function getProfileClicks(val) {
    setShowProfileView(val);
    if (val) setShowFileViewer(false);
    if (val) setShowDashboardView(false);
    if (val) setShowHighlight(false);
    if (val) setShowFeedView(false);
  }

  function getFeedsClicks(val) {
    setShowFeedView(val);
    if (val) setShowFileViewer(false);
    if (val) setShowDashboardView(false);
    if (val) setShowProfileView(false);
    if (val) setShowHighlight(false);
  }

  function getFileViewerClicks(val) {
    setShowFileViewer(val);
    if (val) setShowHighlight(false);
    if (val) setShowDashboardView(false);
    if (val) setShowProfileView(false);
    if (val) setShowFeedView(false);
  }

  function getDashboardViewClicks(val) {
    setShowDashboardView(val);
    if (val) setShowHighlight(false);
    if (val) setShowFileViewer(false);
    if (val) setShowProfileView(false);
    if (val) setShowFeedView(false);
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
                ProfileViewClicks={getProfileClicks}
                FeedsViewClicks={getFeedsClicks}
              />
              <div className="container-fluid page-body-wrapper">
                <Navbar />
                <div className="main-panel">
                  <div className="show_side" style={{ display: "flex" }}>
                    {/* {showHighlight === true && <Highlight />} */}
                    {/* {showHighlight === true && <NodesList />} */}
                    {showHighlight === true && state.searchQuery !== "" && <NodesList />}
                    {showFileViewer === true && <FileViewer />}
                    <div className="content-wrapper">
                      <AppRoutes
                        showFileViewer={showFileViewer}
                        showDashboardView={showDashboardView}
                        showHighlight={showHighlight}
                        showProfileView={showProfileView}
                        showFeedView={showFeedView}
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

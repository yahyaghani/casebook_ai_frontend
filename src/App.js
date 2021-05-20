// @flow

// Based on https://github.com/agentcooper/react-pdf-highlighter/tree/master/packages/example
// rewritten with hooks

import React, { useState, useReducer, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./AppRoutes";

import { reducer, InitialState } from "./Reducers";
import { BrowserRouter as Router } from "react-router-dom";
import Highlight from "./Dashboard/Highlight";

//import testHighlights from "./test-highlights";

import Sidebar from "./shared/Sidebar";
import "./App.scss";

import "./style/App.css";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import FileViewer from "./Dashboard/FileViewer";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [showHighlight, setShowHighlight] = useState(false);
  const [showFileViewer, setShowFileViewer] = useState(false);

  function getHighlightClicks(val) {
    setShowHighlight(val);
    if(val) setShowFileViewer(false);
  }

  function getFileViewerClicks(val) {
    setShowFileViewer(val);
    if(val) setShowHighlight(false);
  }

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <div className="container-scroller">
          <Sidebar
            HighlightClicks={getHighlightClicks}
            FileViewerClicks={getFileViewerClicks}
          />
          <div className="container-fluid page-body-wrapper">
            <Navbar />
            <div className="main-panel">
              <div className="show_side" style={{ display: "flex" }}>
                {showHighlight === true && <Highlight />}
                {showFileViewer === true && <FileViewer />}
                <div className="content-wrapper" style={{ width: "100%" }}>
                  <AppRoutes showFileViewer={showFileViewer} />
                </div>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

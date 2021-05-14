// @flow

// Based on https://github.com/agentcooper/react-pdf-highlighter/tree/master/packages/example
// rewritten with hooks

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./AppRoutes";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Highlight from "./Dashboard/Highlight"

//import testHighlights from "./test-highlights";

import Sidebar from "./shared/Sidebar";
import "./App.scss";

import "./style/App.css";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

function App() {
  const [showHighlight, setShowHighlight] = useState(false);

  function getHighlightClicks(val) {
    setShowHighlight(val);
  }

  return (
    <Router>
      <div className="container-scroller">
        <Sidebar HighlightClicks={getHighlightClicks} />
        <div className="container-fluid page-body-wrapper">
          <Navbar />
          <div className="main-panel">
            <div className="show_side" style={{display: 'flex'}}>
            {showHighlight === true && <Highlight />}
            <div className="content-wrapper" style={{width: '100%'}}>
              <AppRoutes />
            </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

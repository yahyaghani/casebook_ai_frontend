import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { Dropdown } from "react-bootstrap";
import { Trans } from "react-i18next";
import TextEditor from "../TextEditor";
import { UserContext } from "../App";
import { BASE_URL_DEV } from "../utils";

function Sidebar({
  HighlightClicks,
  FileViewerClicks,
  DashboardViewClicks,
  ProfileViewClicks,
  FeedsViewClicks,
  TextAnonViewClicks
}) {
  const { state, dispatch } = useContext(UserContext);
  const [highlight, setHighlight] = useState(false);
  const [fileViewer, setFileViewer] = useState(false);
  const [dashboardView, setDashboardView] = useState(true);
  const [feedsView, setFeedsView] = useState(false);
  const [textAnonView, setTextAnonView] = useState(false);
  
  useEffect(() => {
    if(!state.auth || !state.auth.authToken) return;
    (async () => {
      const result = await axios(`${BASE_URL_DEV}/get/files`, {
        headers: {
          "x-access-token": state.auth && state.auth.authToken,
        },
      });
      const files = result.data && result.data.files;
      dispatch({ type: "ADD_FILE", payload: files });
    })();
    if (state.fileHighlights && state.fileHighlights.length === 0) {
      (async () => {
        const result = await axios(`${BASE_URL_DEV}/get-highlights`, {
          headers: {
            "x-access-token": state.auth && state.auth.authToken,
          },
        });
        const fileHighlights = result.data;
        console.log(fileHighlights);
        if (
          fileHighlights &&
          fileHighlights.highlights &&
          fileHighlights.highlights.length > 0
        ) {
          dispatch({
            type: "FETCH_FILE_HIGHLIGHTS",
            payload: fileHighlights.highlights,
          });
        }
      })();
    }
  }, [state.auth.authToken]);

  const [showTextEditor, setShowTextEditor] = useState(false);

  const handleTextEditor = (e) => {
    e.preventDefault();
    setShowTextEditor(true);
  };

  function highlightClick() {
    if (fileViewer) setFileViewer(false);
    if (dashboardView) setDashboardView(false);
    if (feedsView) setFeedsView(false);
    if (textAnonView) setTextAnonView(false)
    if (!highlight) {
      setHighlight(true);
      HighlightClicks(true);
      FileViewerClicks(false);
      DashboardViewClicks(false);
      FeedsViewClicks(false);
      ProfileViewClicks(false);
      TextAnonViewClicks(false)
    }
  }

  function handleFileViewer() {
    if (highlight) setHighlight(false);
    if (dashboardView) setDashboardView(false);
    if (feedsView) setFeedsView(false);
    if (textAnonView) setTextAnonView(false)
    if (!fileViewer) {
      setFileViewer(true);
      FileViewerClicks(true);
      DashboardViewClicks(false);
      HighlightClicks(false);
      FeedsViewClicks(false);
      ProfileViewClicks(false);
      TextAnonViewClicks(false)
    }
  }

  function dashboardClick() {
    if (highlight) setHighlight(false);
    if (fileViewer) setFileViewer(false);
    if (feedsView) setFeedsView(false);
    if (textAnonView) setTextAnonView(false)
    if (!dashboardView) {
      setDashboardView(true);
      DashboardViewClicks(true);
      FileViewerClicks(false);
      HighlightClicks(false);
      FeedsViewClicks(false);
      ProfileViewClicks(false);
      TextAnonViewClicks(false)
    }
  }

  function feedsClick() {
    if (highlight) setHighlight(false);
    if (fileViewer) setFileViewer(false);
    if (dashboardView) setDashboardView(false);
    if (textAnonView) setTextAnonView(false)
    if (!feedsView) {
      setFeedsView(true);
      DashboardViewClicks(false);
      FileViewerClicks(false);
      HighlightClicks(false);
      FeedsViewClicks(true);
      ProfileViewClicks(false);
      TextAnonViewClicks(false)
    }
  }

  function textAnonClick() {
    if (highlight) setHighlight(false);
    if (fileViewer) setFileViewer(false);
    if (dashboardView) setDashboardView(false);
    if (!textAnonView) {
      FeedsViewClicks(false);
      DashboardViewClicks(false);
      FileViewerClicks(false);
      HighlightClicks(false);
      ProfileViewClicks(false);
      TextAnonViewClicks(true)
      setTextAnonView(true)
    }
  }

  function handleProfileClick() {
    if (highlight) setHighlight(false);
    if (fileViewer) setFileViewer(false);
    if (dashboardView) setDashboardView(false);
    if (feedsView) setFeedsView(false);
    if (textAnonView) setTextAnonView(false)
    if (true) {
      DashboardViewClicks(false);
      FileViewerClicks(false);
      HighlightClicks(false);
      FeedsViewClicks(false);
      ProfileViewClicks(true);
      TextAnonViewClicks(false)
    }
  }

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <a className="sidebar-brand brand-logo" href="index.html">
          <img src={require("../images/logo.svg")} alt="logo" />
        </a>
        <a className="sidebar-brand brand-logo-mini" href="index.html">
          <img src={require("../images/logo-mini.svg")} alt="logo" />
        </a>
      </div>
      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div onClick={handleProfileClick} className="cursor-pointer profile-pic">
              <div className="count-indicator">
                <img
                  className="img-xs rounded-circle "
                  src={require("../images/faces/face15.jpg")}
                  alt="profile"
                />
                <span className="count bg-success"></span>
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">
                  <Trans>{state.auth && state.auth.username}</Trans>
                </h5>
                <span>
                  <Trans>{state.auth && state.auth.email}</Trans>
                </span>
              </div>
            </div>
            <Dropdown alignRight>
              <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                <i className="mdi mdi-dots-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="sidebar-dropdown preview-list">
                <a
                  href="!#"
                  className="dropdown-item preview-item"
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-primary"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      <Trans>Account settings</Trans>
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a
                  href="!#"
                  className="dropdown-item preview-item"
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-onepassword  text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      <Trans>Change Password</Trans>
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a
                  href="!#"
                  className="dropdown-item preview-item"
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-calendar-today text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      <Trans>To-do list</Trans>
                    </p>
                  </div>
                </a>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>
        <li className="nav-item nav-category">
          <span className="nav-link">
            <Trans>Navigation</Trans>
          </span>
        </li>
        <li
          className={
            dashboardView ? "nav-item menu-items active" : "nav-item menu-items"
          }
        >
          <a className="nav-link" onClick={dashboardClick}>
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">
              <Trans>Dashboard</Trans>
            </span>
          </a>
        </li>
        
        {/* highlight */}
        <li
          className={
            highlight ? "nav-item menu-items active" : "nav-item menu-items"
          }
        >
          <a
            style={{ position: "relative" }}
            className="nav-link"
            onClick={highlightClick}
          >
            <span className="menu-icon">
              <i className="mdi mdi-lightbulb"></i>
            </span>
            <span className="menu-title">
              <Trans>Highlight</Trans>
            </span>
            <i className="fa fa-angle-right"></i>
          </a>
        </li>
        <li className={"nav-item menu-items"}>
          <a
            style={{ position: "relative" }}
            className="nav-link"
            onClick={handleTextEditor}
          >
            <span className="menu-icon">
              <i className="mdi mdi-text"></i>
            </span>
            <span className="menu-title">
              <Trans>Create Notes</Trans>
            </span>
            <i className="fa fa-angle-right"></i>
          </a>
        </li>
        <li
          className={
            fileViewer ? "nav-item menu-items active" : "nav-item menu-items"
          }
        >
          <a
            style={{ position: "relative" }}
            className="nav-link"
            onClick={handleFileViewer}
          >
            <span className="menu-icon">
              <i className="mdi mdi-file"></i>
            </span>
            <span className="menu-title">
              <Trans>File Viewer</Trans>
            </span>
            <i className="fa fa-angle-right"></i>
          </a>
        </li>
        <li
          className={
            textAnonView ? "nav-item menu-items active" : "nav-item menu-items"
          }
        >
          <a
            style={{ position: "relative" }}
            className="nav-link"
            onClick={textAnonClick}
          >
            <span className="menu-icon">
              <i className="mdi mdi-account-convert"></i>
            </span>
            <span className="menu-title">
              <Trans>Text Anonymizer</Trans>
            </span>
            <i className="fa fa-angle-right"></i>
          </a>
        </li>
        <li
          className={
            feedsView ? "nav-item menu-items active" : "nav-item menu-items"
          }
        >
          <a
            style={{ position: "relative" }}
            className="nav-link"
            onClick={feedsClick}
          >
            <span className="menu-icon">
              <i className="mdi mdi-forum"></i>
            </span>
            <span className="menu-title">
              <Trans>My Feeds</Trans>
            </span>
            <i className="fa fa-angle-right"></i>
          </a>
        </li>

      </ul>
      {showTextEditor && (
        <TextEditor
          id={state.auth && state.auth.userPublicId}
          fileName={'index'}
          showTextEditor={showTextEditor}
          setShowTextEditor={setShowTextEditor}
        />
      )}
    </nav>
  );
}

export default Sidebar;

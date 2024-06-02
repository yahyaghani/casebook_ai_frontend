
import React, { useState, useReducer, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./AppRoutes";
import { reducer } from "./Reducer/Reducers";
import { InitialState } from "./Reducer/InitialState";
import {
    Route,
    Redirect,
    Switch,
    BrowserRouter as Router,
} from "react-router-dom";
import NodePreview from "./Dashboard/NodePreview";
import NodesList from "./Dashboard/NodesList";
import Register from "./Dashboard/Register";
import Login from "./Dashboard/Login";
import Sidebar from "./shared/Sidebar";
import "./App.scss";

import "./style/App.css";
import Navbar from "./shared/Navbar";
import FileViewer from "./Dashboard/FileViewer";
import FileMetadataViewer from "./Dashboard/FileMetadataViewer";
export const UserContext = createContext();

function App() {
    const [state, dispatch] = useReducer(reducer, InitialState);

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
                            <Sidebar />
                            <div className="container-fluid page-body-wrapper">
                                <Navbar />
                                <div className="main-panel">
                                    <div className="show_side" style={{ display: "flex" }}>
                                        {state.showHighlight === true && state.searchQuery !== "" && <NodesList />}
                                        {state.showFileViewer === true && <FileViewer />}
                                        <div className="content-wrapper">
                                            <AppRoutes
                                                showFileViewer={state.showFileViewer}
                                                showDashboardView={state.showDashboardView}
                                                showHighlight={state.showHighlight}
                                                showProfileView={state.showProfileView}
                                                showFeedView={state.showFeedView}
                                                showTextAnonymizerView={state.showTextAnonymizerView}
                                                showLawsReader={state.showLawsReader}
                                                showGptView={state.showGptView}
                                            />
                                            <FileMetadataViewer files={state.files} />
                                        </div>
                                        {state.showHighlight === true && state.searchQuery !== "" && <NodePreview />}
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

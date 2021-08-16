// @flow

// Based on https://github.com/agentcooper/react-pdf-highlighter/tree/master/packages/example
// rewritten with hooks

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

export const UserContext = createContext();

function App() {
	const [state, dispatch] = useReducer(reducer, InitialState);
	const [sidebarItems, setSidebarItems] = useState({
		showHighlight: false,
		showFileViewer: false,
		showDashboardView: true,
		showProfileView: false,
		showFeedView: false,
	});

	const sidebarClickHandler = (sidebarState) => {
		setSidebarItems(sidebarState);
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
							<Sidebar sideItems={sidebarItems} sideItemsClick={sidebarClickHandler} />
							<div className="container-fluid page-body-wrapper">
								<Navbar />
								<div className="main-panel">
									<div className="show_side" style={{ display: "flex" }}>
										{/* {showHighlight === true && <Highlight />} */}
										{/* {showHighlight === true && <NodesList />} */}
										{sidebarItems.showHighlight === true && state.searchQuery !== "" && <NodesList />}
										{sidebarItems.showFileViewer === true && <FileViewer />}
										<div className="content-wrapper">
											<AppRoutes
												showFileViewer={sidebarItems.showFileViewer}
												showDashboardView={sidebarItems.showDashboardView}
												showHighlight={sidebarItems.showHighlight}
												showProfileView={sidebarItems.showProfileView}
												showFeedView={sidebarItems.showFeedView}
											/>
										</div>
										{sidebarItems.showHighlight === true && state.searchQuery !== "" && <NodePreview />}
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

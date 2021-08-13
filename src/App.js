// @flow

// Based on https://github.com/agentcooper/react-pdf-highlighter/tree/master/packages/example
// rewritten with hooks
import React, { useState, useReducer, createContext, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./AppRoutes";
import { reducer } from './Reducer/Reducers';
import { InitialState } from './Reducer/InitialState'

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
	const [itemView, setItemView] = useState({
		showHighlight: false,
		showFileViewer: false,
		showDashboardView: true,
		showProfileView: false,
		showFeedView: false,
	});

	const getItemClicks = (val) => {
		setItemView(val);
	};

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
							<Sidebar items={itemView} itemClicks={getItemClicks} />
							{useMemo(
								() => (<div className="container-fluid page-body-wrapper">
									<Navbar />
									<div className="main-panel">
										<div className="show_side" style={{ display: "flex" }}>
											{itemView.showHighlight === true && state.searchQuery !== "" && <NodesList />}
											{itemView.showFileViewer === true && <FileViewer />}
											<div className="content-wrapper">
												<AppRoutes
													showFileViewer={itemView.showFileViewer}
													showDashboardView={itemView.showDashboardView}
													showHighlight={itemView.showHighlight}
													showProfileView={itemView.showProfileView}
													showFeedView={itemView.showFeedView}
												/>
											</div>
											{itemView.showHighlight === true && state.searchQuery !== "" && <NodePreview />}
										</div>
									</div>
								</div>), [
								itemView.showHighlight, itemView.showFeedView, itemView.showFileViewer,
								itemView.showProfileView, itemView.showDashboardView, state.searchQuery
							])
							}
						</div>
					</Route>
					<Redirect to="/login" />
				</Switch>
			</Router>
		</UserContext.Provider>
	);
}

export default App;

// App.js

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
import DocViewer from "./Dashboard/DocViewer"; // Import DocViewer

export const UserContext = createContext();

function App() {
	const [state, dispatch] = useReducer(reducer, InitialState);
	const [sidebarItems, setSidebarItems] = useState({
		showHighlight: false,
		showFileViewer: false,
		showDocViewer: false, // Add this line
		showDashboardView: true,
		showProfileView: false,
		showFeedView: false,
		showTextAnonymizerView: false,
		showGptView: false,
		showLawsReader: false,
		showDocViewer: false, // Add this line

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
										{sidebarItems.showDocViewer === true && <DocViewer />} {/* Add this line */}
										<div className="content-wrapper">
											<AppRoutes
												showFileViewer={sidebarItems.showFileViewer}
												showDashboardView={sidebarItems.showDashboardView}
												showHighlight={sidebarItems.showHighlight}
												showProfileView={sidebarItems.showProfileView}
												showFeedView={sidebarItems.showFeedView}
												showTextAnonymizerView={sidebarItems.showTextAnonymizerView}
												showLawsReader={sidebarItems.showLawsReader}
												showGptView={sidebarItems.showGptView}
												showDocViewer={sidebarItems.showDocViewer} // Add this line

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

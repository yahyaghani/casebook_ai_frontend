import React, { useContext, useState, useEffect } from "react";
import { showProfile, showDashboard, showHighlight, showFileViewer, showFeedView } from './SidebarItemData/data';
import axios from 'axios';
import { Trans } from "react-i18next";
import TextEditor from "../TextEditor";
import { UserContext } from "../App";
import { BASE_URL_DEV } from "../utils";
import SideNav from "./SideNav";
import Profile from "./Profile";

function Sidebar({ sideItems, sideItemsClick }) {
	const { state, dispatch } = useContext(UserContext);

	const itemClickHandler = (itemState) => {
		sideItemsClick(itemState);
	}

	useEffect(() => {
		if (!state.auth || !state.auth.authToken) return;
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
				console.log('filehighligh', fileHighlights);
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

	return (
		<nav className="sidebar sidebar-offcanvas" id="sidebar">
			<div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
				<a className="sidebar-brand brand-logo" href="index.html">
					<img src={require("../images/scaletransm2.png")} alt="logo" />
				</a>
				<a className="sidebar-brand brand-logo-mini" href="index.html">
					<img src={require("../images/scaletransm2.png")} alt="logo" />
				</a>
			</div>
			<ul className="nav">
				<Profile profileClick={() => itemClickHandler(showProfile)}
					authUser={state.auth && state.auth.username}
					authEmail={state.auth && state.auth.email} />

				<li className="nav-item nav-category">
					<span className="nav-link">
						<Trans>Navigation</Trans>
					</span>
				</li>

				<SideNav class={sideItems.showDashboardView} click={() => itemClickHandler(showDashboard)}
					iconClass='mdi mdi-speedometer' transTitle='Dashboard' />

				<SideNav class={sideItems.showFileViewer} click={() => itemClickHandler(showFileViewer)}
					iconClass='mdi mdi-file' transTitle='Smart Law Viewer' />

				<SideNav class={sideItems.showHighlight} click={() => itemClickHandler(showHighlight)}
						iconClass='mdi mdi-lightbulb' transTitle='Intellisearch' />


				<SideNav class={sideItems.showFeedView} click={() => itemClickHandler(showFeedView)}
					iconClass='mdi mdi-forum' transTitle='My Feeds' />

				<SideNav class={false} click={handleTextEditor}
					iconClass='mdi mdi-text' transTitle='My Notepad' />
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

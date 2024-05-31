import React, { useContext, useState, useEffect } from "react";
import { showProfile, showDashboard, showHighlight, showFileViewer, showFeedView, showTextAnonymizerView, showGptView, showLawsReader, showDocViewer } from './SidebarItemData/data'; // Import showDocViewer
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
			if (files && files.length > 0) {
				const results = await axios(`${BASE_URL_DEV}/get-graphdata`, {
					headers: {
						"x-access-token": state.auth && state.auth.authToken,
					},
				});
				const allgraphs = results.data;
				let Obj = {};
				let _id = "";

				allgraphs && allgraphs.graphdata && allgraphs.graphdata.length && allgraphs.graphdata.filter(x => {
					_id = x.fileName
					Obj[_id] = x.links.filter(e => e.source == "CITATION" || e.source == "PROVISION")

				});
				var fileNew = files
				fileNew.forEach(element => {
					element["CITATION"] = Obj && Obj[element.name] && Obj[element.name].length > 0 ? Obj[element.name].filter(e => e.source == "CITATION") : ["N/A"]
					element["PROVISION"] = Obj && Obj[element.name] && Obj[element.name].length > 0 ? Obj[element.name].filter(e => e.source == "PROVISION") : ["N/A"]

				});
				dispatch({ type: "ADD_FILE", payload: fileNew });
			}
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
				if (!state.currentFile && fileHighlights && fileHighlights.highlights && fileHighlights.highlights.length) {
					var data = {}
					data["name"] = fileHighlights.highlights[0]["name"]
					data["url"] = `uploads/${state.auth.userPublicId}/${fileHighlights.highlights[0]["name"]}`
					dispatch({ type: "SET_CURR_FILE", payload: data })
				};
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
					</span>
				</li>
				{console.log(sideItems)}
				<SideNav class={sideItems.showDashboardView} click={() => itemClickHandler(showDashboard)}
					iconClass='mdi mdi-speedometer' transTitle='Dashboard' />

				<SideNav class={sideItems.showFileViewer} click={() => itemClickHandler(showFileViewer)}
					iconClass='mdi mdi-file' transTitle='Copilot' />

				{/* Add a SideNav item for DocViewer */}
				<SideNav class={sideItems.showDocViewer} click={() => itemClickHandler(showDocViewer)}
					iconClass='mdi mdi-file-document' transTitle='DocViewer' />

				{/* <SideNav class={sideItems.showHighlight} click={() => itemClickHandler(showHighlight)}
					iconClass='mdi mdi-lightbulb' transTitle='Intellisearch' /> */}

				{/* <SideNav class={sideItems.showFeedView} click={() => itemClickHandler(showFeedView)}
					iconClass='mdi mdi-forum' transTitle='My Feeds' /> */}

				<SideNav class={false} click={handleTextEditor}
					iconClass='mdi mdi-text' transTitle='Notes' />

				<SideNav class={sideItems.showTextAnonymizerView} click={() => itemClickHandler(showTextAnonymizerView)}
					iconClass='mdi mdi-text' transTitle='Anonymizer' />

				{/* <SideNav class={sideItems.showGptView} click={() => itemClickHandler(showGptView)}
					iconClass='mdi mdi-text' transTitle='Gpt Viewer' /> */}
{/* 
				<SideNav class={sideItems.showLawsReader} click={() => itemClickHandler(showLawsReader)}
					iconClass='mdi mdi-scale-balance' transTitle='Easy-Reader' /> */}

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

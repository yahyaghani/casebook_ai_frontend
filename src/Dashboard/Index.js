// @flow

// Based on https://github.com/agentcooper/react-pdf-highlighter/tree/master/packages/example
// rewritten with hooks

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	PdfLoader,
	PdfHighlighter,
	Highlight,
	Popup,
	AreaHighlight,
} from "react-pdf-highlighter";
import Spinner from "../shared/Spinner";
import Tip from "./Tip";
import processMd from "./markdown";
import { Fragment } from "react";
import GraphFunc from "./graphFunc";
import PdfViewer from "./PdfViewer";
import DashboardView from "./DashboardView";
import ProfileView from "./ProfileView";
import FeedView from "./FeedView";
import LawsViewer from "./LawsViewer";
import TextAnonymizer from "./TextAnonymizer";
import GptView from "./GptView"


const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
	document.location.hash.slice("#highlight-".length);

const resetHash = () => {
	document.location.hash = "";
};

const HighlightPopup = ({ comment }) =>
	comment.text ? (
		<div className="Highlight__popup">
			{comment.emoji} {processMd(comment.text)}
		</div>
	) : null;

//const DEFAULT_URL = "https://arxiv.org/pdf/1708.08021.pdf";

//const searchParams = new URLSearchParams(document.location.search);
//const url = searchParams.get("url") || DEFAULT_URL;
function Dashboard({
	showFileViewer,
	showDashboardView,
	showHighlight,
	showProfileView,
	showFeedView,
	showTextAnonymizerView,
	showGptView,
	showLawsReader,
  }) {
	const [state, setState] = useState({ highlights: [] });
	const [PdfUrl, setPdfUrl] = useState({ url: "" });
  
	const pdfHighlighter = useRef(null);
  
	const getHighlightById = (id) =>
	  state.highlights.find((highlight) => highlight.id === id);
  
	const scrollToHighlightFromHash = () => {
	  const highlight = getHighlightById(parseIdFromHash());
	  if (highlight) {
		pdfHighlighter.current.scrollTo(highlight);
	  }
	};
  
	useEffect(() => {
	  window.addEventListener("hashchange", scrollToHighlightFromHash, false);
  
	  return () =>
		window.removeEventListener("hashchange", scrollToHighlightFromHash);
	}, []);
  
	function addHighlight(highlight) {
	  const { highlights } = state;
  
	  setState({
		highlights: [{ ...highlight, id: getNextId() }, ...highlights],
	  });
	}
  
	function updateHighlight(highlightId, position, content) {
	  setState({
		highlights: state.highlights.map((h) => {
		  return h.id === highlightId
			? {
				...h,
				position: { ...h.position, ...position },
				content: { ...h.content, ...content },
			  }
			: h;
		}),
	  });
	}
  
	const { highlights } = state;
	const { url } = PdfUrl;
  
	return (
	  <Fragment>
		{showHighlight && (
		  <>
			<GraphFunc />
			{url ? (
			  <PdfLoader url={url} beforeLoad={<Spinner />}>
				{(pdfDocument) => (
				  <PdfHighlighter
					ref={pdfHighlighter}
					pdfDocument={pdfDocument}
					enableAreaSelection={(event) => event.altKey}
					onScrollChange={resetHash}
					// scrollRef={(scrollTo) => {
					//   // Correct usage of the scrollTo method from the ref
					//   if (pdfHighlighter.current) {
					// 	pdfHighlighter.current.scrollTo(scrollTo);
					//   }
					// }}
					scrollRef={(scrollTo) => {
						if (pdfHighlighter.current && typeof scrollTo === "function") {
							pdfHighlighter.current.scrollTo = scrollTo;
						}
					}}
					
					onSelectionFinished={(
					  position,
					  content,
					  hideTipAndSelection,
					  transformSelection
					) => (
					  <Tip
						onOpen={transformSelection}
						onConfirm={(comment) => {
						  addHighlight({ content, position, comment });
						  hideTipAndSelection();
						}}
					  />
					)}
					highlightTransform={(
					  highlight,
					  index,
					  setTip,
					  hideTip,
					  viewportToScaled,
					  screenshot,
					  isScrolledTo
					) => {
					  const isTextHighlight = !Boolean(
						highlight.content && highlight.content.image
					  );
  
					  const component = isTextHighlight ? (
						<Highlight
						  isScrolledTo={isScrolledTo}
						  position={highlight.position}
						  comment={highlight.comment}
						/>
					  ) : (
						<AreaHighlight
						  highlight={highlight}
						  onChange={(boundingRect) => {
							updateHighlight(
							  highlight.id,
							  {
								boundingRect: viewportToScaled(boundingRect),
							  },
							  { image: screenshot(boundingRect) }
							);
						  }}
						/>
					  );
  
					  return (
						<Popup
						  popupContent={<HighlightPopup {...highlight} />}
						  onMouseOver={(popupContent) =>
							setTip(highlight, (highlight) => popupContent)
						  }
						  onMouseOut={hideTip}
						  key={index}
						  children={component}
						/>
					  );
					}}
					highlights={highlights}
				  />
				)}
			  </PdfLoader>
			) : (
			  <Spinner />
			)}
		  </>
		)}
		{showFileViewer && <PdfViewer />}
		{showDashboardView && <DashboardView />}
		{showProfileView && <ProfileView />}
		{showFeedView && <FeedView />}
		{showLawsReader && <LawsViewer />}
		{showTextAnonymizerView && <TextAnonymizer />}
		{showGptView && <GptView />}
	  </Fragment>
	);
  }
  
  export default Dashboard;
  
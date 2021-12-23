import React, { useContext, useEffect, useState, useRef } from "react";
import {
	PdfLoader,
	PdfHighlighter,
	Highlight,
	Popup,
	AreaHighlight,
} from "react-pdf-highlighter";

import { Container } from "react-bootstrap";
import styled from "styled-components";
import Spinner from "../shared/Spinner";
import Tip from "./Tip";
import processMd from "./markdown";
import { UserContext } from "../App";
import { BASE_URL_DEV } from "../utils";
import PdfViewerSide from "./PdfViewerSide";

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
	document.location.hash.slice("#pdf-highlight-".length);

const resetHash = () => {
	document.location.hash = "";
};

const HighlightPopup = ({ comment }) =>
	comment.text ? (
		<div className="Highlight__popup">
			{comment.emoji} {processMd(comment.text)}
		</div>
	) : null;

const Wrapper = styled.div`
  .Highlight__part {
    background: ${props => props.highlightColors.default || "#000000"};
    /* border: 3px solid ${props => props.highlightColor || "#000000"}; */
  }
  .AreaHighlight {
    border: 3px solid ${props => props.highlightColors.default || "#000000"};
    /* background-color: ${props => props.highlightColor || "#000000"}; */
  }
  .Highlight__part.OTHER {
    background: rgb(93, 115, 240);
  }

  .Highlight__part.LEGALTEST {
    background: ${props => props.highlightColors.legalTest};
  }

  .Highlight__part.ISSUE {
    background: ${props => props.highlightColors.issue};
  }

  .Highlight__part.CONCLUSION {
    background: ${props => props.highlightColors.conclusion};
  }
`

function PdfViewer() {
	const { state, dispatch } = useContext(UserContext);
	const [currFile, setCurrFile] = useState();
	const [highlights, setHighlights] = useState([]);

	useEffect(() => {
		// console.log(highlights);
		if (highlights && highlights.length > 0) {
			dispatch({
				type: "SET_FILE_HIGHLIGHTS",
				payload: {
					highlights,
					name: state.currentFile && state.currentFile.name,
				},
			});
		}
	}, [highlights]);

	useEffect(() => {
		setCurrFile(null);
		// console.log(state);
		if (state.currentFile && state.currentFile.url) {
				setTimeout(
					() => setCurrFile(`${BASE_URL_DEV}/${state.currentFile.url}`),
					100
				);
		} else {
			let reader = new FileReader();
			let file = state.currentFile;
			reader.onload = () => {
				// console.log(file.name);
				setCurrFile(reader.result);
			};

			if (file) reader.readAsDataURL(file);
		}
	}, [state.currentFile]);

	useEffect(() => {
		if (state.currentFile) {
			// console.log(state);
			let highlightUpdated = false;
			state.fileHighlights.forEach((item) => {
				if (item.name === state.currentFile.name) {
					setHighlights(item.highlights);
					highlightUpdated = true;
				}
			});
			if (!highlightUpdated) setHighlights([]);
		}
	}, [state.currentFile, state.fileHighlights]);

	const pdfHighlighter = useRef(null);
	const getHighlightById = (id) =>
		highlights.find((highlight) => highlight.id === id);
	const scrollToHighlightFromHash = () => {
		const highlight = getHighlightById(parseIdFromHash());
		// console.log(highlight);
		if (highlight) {
			pdfHighlighter.current.scrollTo(highlight);
		}
	};

	useEffect(() => {
		window.addEventListener("hashchange", scrollToHighlightFromHash, false);

		return () =>
			window.removeEventListener("hashchange", scrollToHighlightFromHash);
	});

	function addHighlight(highlight) {
		// console.log(highlight);
		setHighlights([{ ...highlight, id: getNextId() }, ...highlights]);
	}

	function updateHighlight(highlightId, position, content) {
		setHighlights(
			highlights.map((h) =>
				h.id === highlightId
					? {
						...h,
						position: { ...h.position, ...position },
						content: { ...h.content, ...content },
					}
					: h
			)
		);
	}

	return (
		<Wrapper highlightColors={state.highlightColors}>
			<div className="d-flex">
				<div
					style={{
						minHeight: "calc(100vh - 70px)",
						color: "#000000",
						width: "80%",
					}}
					className="pdf-viewer"
				>
					{currFile ? (
						<>
							<PdfLoader
								className="my-pdf-viewer"
								url={currFile}
								beforeLoad={<Spinner />}
							>
								{(pdfDocument) => {
									return (
										<>
											<PdfHighlighter
												ref={pdfHighlighter}
												pdfDocument={pdfDocument}
												enableAreaSelection={(event) => event.altKey}
												onScrollChange={resetHash}
												scrollRef={(scrollTo) => { }}
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
										</>
									)
								}}
							</PdfLoader>
						</>
					) : state.files && state.files.length === 0 ? (
						<Container>
							<div className="h3 text-center mt-5">No File Selected!!</div>
						</Container>
					) : (
						<Spinner />
					)}
				</div>
				<PdfViewerSide />
			</div>
		</Wrapper>
	);
}

export default PdfViewer;

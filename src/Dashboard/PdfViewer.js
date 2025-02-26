import React, { useContext, useEffect, useState, useRef } from "react";
import { PdfLoader, PdfHighlighter, Highlight, Popup, AreaHighlight } from "react-pdf-highlighter";
import StickyNote from './StickyNote';
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Spinner from "../shared/Spinner";
import Tip from "./Tip";
import processMd from "./markdown";
import { UserContext } from "../App";
import PdfAutoScroller from './PdfAutoScroller';
import TextEditor from "../TextEditor";
import { BASE_URL_DEV } from "../utils";

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () => {
    return document.location.hash.slice("#pdf-highlight-".length);
};

const resetHash = () => {
    document.location.hash = "";
};

const HighlightPopup = ({ comment }) => {
    return comment.text ? (
        <div className="Highlight__popup">
            {comment.emoji} {processMd(comment.text)}
        </div>
    ) : null;
};

const Wrapper = styled.div`
  .Highlight__part {
    background: ${props => props.highlightColors.default || "#000000"};
  }
  .AreaHighlight {
    border: 3px solid ${props => props.highlightColors.default || "#000000"};
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
`;

function PdfViewer() {
    const { state, dispatch } = useContext(UserContext);
    const [currFile, setCurrFile] = useState(null);
    const [highlights, setHighlights] = useState([]);
    const pdfHighlighter = useRef(null);

    // Set the last file as currentFile every time PdfViewer is rendered
    useEffect(() => {
        console.log("Checking if last file should be set...");
        console.log("state.files:", state.files);
        console.log("state.currentFile:", state.currentFile);

        if (state.files && state.files.length > 0) {
            const lastFile = state.files[state.files.length - 1]; // Get the last file
            console.log("Last file in state.files:", lastFile);

            // Check if the last file is different from the current file
            if (!state.currentFile || lastFile.name !== state.currentFile.name) {
                const data = {
                    name: lastFile.name,
                    url: lastFile.url || `uploads/${state.auth.userPublicId}/${lastFile.name}`
                };
                dispatch({ type: 'SET_CURR_FILE', payload: data });
                console.log("Set last file as currentFile:", data);
            } else {
                console.log("Last file is already set as currentFile.");
            }
        } else {
            console.log("No files available to set as currentFile.");
        }
    }, [state.files, state.currentFile, dispatch, state.auth.userPublicId]);

    // Handle file highlights
    useEffect(() => {
        if (highlights.length > 0) {
            dispatch({
                type: "SET_FILE_HIGHLIGHTS",
                payload: {
                    highlights,
                    name: state.currentFile?.name,
                },
            });
        }
    }, [highlights, dispatch, state.currentFile]);

    // Set the current file URL
    useEffect(() => {
        if (state.currentFile) {
            console.log('state.currentFile = ', state.currentFile);
            console.log('state = ', state);

            if (state.fileViewSource === "metadataViewer") {
                // If accessed via FileMetadataViewer, set directly
                console.log('pdf view with upload');

                if (state.currentFile.url) {
                    setCurrFile(state.currentFile.url);
                } else if (state.currentFile instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setCurrFile(reader.result);
                    };
                    reader.readAsDataURL(state.currentFile);
                } else {
                    console.error('Current file is not a Blob');
                }
            } else {
                console.log('pdf view without upload');

                if (state.currentFile.url) {
                    const correctedUrl = state.currentFile.url.startsWith('http')
                        ? state.currentFile.url
                        : `${BASE_URL_DEV}/${state.currentFile.url}`;
                    setCurrFile(correctedUrl);
                } else {
                    setCurrFile(null);
                }
            }
        } else {
            setCurrFile(null);
        }
    }, [state.currentFile, state.fileViewSource]);

    // Set highlights for the current file
    useEffect(() => {
        if (state.currentFile) {
            const fileHighlights = state.fileHighlights.find(item => item.name === state.currentFile.name);
            setHighlights(fileHighlights ? fileHighlights.highlights : []);
        } else {
            setHighlights([]);
        }
    }, [state.currentFile, state.fileHighlights]);

    // Set accordion sections
    useEffect(() => {
        if (state.currentFile) {
            const currentFileName = state.currentFile.name;
            const fileHighlight = state.fileHighlights.find(file => file.name === currentFileName);

            if (fileHighlight && fileHighlight.sections) {
                dispatch({
                    type: "SET_ACCORDION_SECTIONS",
                    payload: fileHighlight.sections.map(section => ({
                        clause: section.clause,
                        text: section.text
                    }))
                });

                console.log("Accordion sections set:", fileHighlight.sections);
            } else {
                dispatch({ type: "SET_ACCORDION_SECTIONS", payload: [] });
                console.log("No sections found for:", currentFileName);
            }
        }
    }, [state.currentFile, state.fileHighlights, dispatch]);

    // Handle hash change for highlights
    useEffect(() => {
        window.addEventListener("hashchange", scrollToHighlightFromHash, false);
        return () => {
            window.removeEventListener("hashchange", scrollToHighlightFromHash);
        };
    }, [highlights]);

    const getHighlightById = (id) => {
        return highlights.find((highlight) => highlight.id === id);
    };

    const scrollToHighlightFromHash = () => {
        const highlight = getHighlightById(parseIdFromHash());
        if (highlight) {
            pdfHighlighter.current.scrollTo(highlight);
        }
    };

    const addHighlight = (highlight) => {
        setHighlights([{ ...highlight, id: getNextId() }, ...highlights]);
    };

    const updateHighlight = (highlightId, position, content) => {
        setHighlights(highlights.map((h) =>
            h.id === highlightId
                ? { ...h, position: { ...h.position, ...position }, content: { ...h.content, ...content } }
                : h
        ));
    };

    return (
        <Wrapper highlightColors={state.highlightColors}>
            {state.showPdfViewer ? (
                <div className="d-flex">
                    <div style={{ minHeight: "calc(100vh - 70px)", width: "80%" }} className="pdf-viewer">
                        {currFile ? (
                            <PdfLoader className="my-pdf-viewer" url={currFile} beforeLoad={<Spinner />}>
                                {(pdfDocument) => (
                                    <PdfHighlighter
                                        ref={pdfHighlighter}
                                        pdfDocument={pdfDocument}
                                        enableAreaSelection={(event) => event.altKey}
                                        onScrollChange={resetHash}
                                        onSelectionFinished={(position, content, hideTipAndSelection, transformSelection) => (
                                            <Tip
                                                onOpen={transformSelection}
                                                onConfirm={(comment) => {
                                                    addHighlight({ content, position, comment });
                                                    hideTipAndSelection();
                                                }}
                                            />
                                        )}
                                        highlightTransform={(highlight, index, setTip, hideTip, viewportToScaled, screenshot, isScrolledTo) => (
                                            <Popup
                                                popupContent={<HighlightPopup {...highlight} />}
                                                onMouseOver={(popupContent) =>
                                                    setTip(highlight, (highlight) => popupContent)
                                                }
                                                onMouseOut={hideTip}
                                                key={index}
                                            >
                                                <StickyNote
                                                    isScrolledTo={isScrolledTo}
                                                    position={highlight.position}
                                                    comment={highlight.comment}
                                                />
                                                <AreaHighlight
                                                    highlight={highlight}
                                                    onChange={(boundingRect) => {
                                                        updateHighlight(
                                                            highlight.id,
                                                            { boundingRect: viewportToScaled(boundingRect) },
                                                            { image: screenshot(boundingRect) }
                                                        );
                                                    }}
                                                />
                                            </Popup>
                                        )}
                                        highlights={highlights}
                                    />
                                )}
                            </PdfLoader>
                        ) : state.files?.length === 0 ? (
                            <Container>
                                <div className="h3 text-center mt-5">No File Selected!!</div>
                            </Container>
                        ) : (
                            <Spinner />
                        )}
                    </div>
                    <PdfAutoScroller pdfHighlighter={pdfHighlighter} />
                </div>
            ) : (
                <TextEditor
                    id={state.auth?.userPublicId}
                    fileName={state.currentFile?.name}
                    showTextEditor={true}
                />
            )}
        </Wrapper>
    );
}

export default PdfViewer;
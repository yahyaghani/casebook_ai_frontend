import React, { useContext, useEffect, useState, useRef } from "react";
import {
  PdfLoader,
  PdfHighlighter,
  Highlight,
  Popup,
  AreaHighlight,
  setPdfWorker
} from "react-pdf-highlighter";

import { Container, Modal } from "react-bootstrap";
import { Resizable } from "react-resizable";

import TextEditor from "../TextEditor";
import Spinner from "../shared/Spinner";
import PdfGraphFunc from "./PdfGraphFunc";
import Tip from "./Tip";
import processMd from "./markdown";
import { UserContext } from "../App";
import { BASE_URL_DEV } from "../utils";

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

function PdfViewer() {
  const { state, dispatch } = useContext(UserContext);
  const [currFile, setCurrFile] = useState();
  const [highlights, setHighlights] = useState([]);
  const [createNotes, setCreateNotes] = useState(false);
  const [showGraphModal, setShowGraphModal] = useState(false);
  const [showGraph, setShowGraph] = useState(0);
  const [dimensions, setDimensions] = useState({
    height: 720,
    width: 250,
  });

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

  const deleteHighlight = (index) => {
    const currHighlights = [...highlights];
    const updatedHighlights = currHighlights.filter((highlight, idx) => {
      if (index !== idx) {
        return highlight;
      }
    });
    setHighlights([...updatedHighlights]);
  };

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
  // function showGraphData(type) {
  //   console.log("statenew___", type)
  //   setShowGraphModal(type);
  // }

  return (
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
            {console.log(currFile)}
            <PdfLoader
              className="my-pdf-viewer"
              url={currFile}
              beforeLoad={<Spinner />}
            >
              {(pdfDocument) => (
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
              )}
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
      <Resizable
        className="box"
        height={dimensions.height}
        axis="x"
        width={dimensions.width}
        onResize={(e, { size }) => {
          setDimensions({
            height: size.height,
            width: size.width,
          });
        }}
        resizeHandles={["w"]}
      >
        <div
          className="sidebarnew"
          style={{
            minWidth: "30%",
            width: dimensions.width + "px" || "25%",
            height: dimensions.height + "px" || "calc(100vh - 70px)",
            overflowY: "scroll",
          }}
        >
          <div>
            <div
              onClick={() => setCreateNotes(true)}
              className="h4 text-center bg-secondary cursor-pointer my-5 p-3"
            >
              ADD NOTES
            </div>
            {createNotes && (
              <TextEditor
                id={state.auth && state.auth.userPublicId}
                fileName={state.currentFile && state.currentFile.name}
                showTextEditor={createNotes}
                setShowTextEditor={setCreateNotes}
              />
            )}
            <div
              onClick={() => setShowGraph(1)}
              style={{ marginBottom: "0 !important" }}
              className="h4 text-center bg-secondary cursor-pointer my-5 mb-0 p-3"
            >
            MAXIMIZE GRAPH
            </div>
            {showGraph == 1 ||
              <i className="mdi mdi-fullscreen"
                onClick={() => setShowGraphModal(true)}
                style={{
                  float: "right",
                  padding: "20px",
                  fontSize: "30px",
                }}
              />
            }
            {!showGraphModal && <PdfGraphFunc />}
            {showGraphModal && (
              <Modal
                style={{ color: "#050505" }}
                show={showGraphModal}
                onHide={() => setShowGraphModal(false)}
                backdrop="static"
                size="lg"
                centered={true}
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-sm">
                    Graph
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <PdfGraphFunc />
                </Modal.Body>
              </Modal>
            )}

          </div>
        </div>
      </Resizable>
    </div>
  );
}

export default PdfViewer;

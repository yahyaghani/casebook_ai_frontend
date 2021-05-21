import React, { useContext, useEffect, useState, useRef } from "react";
import {
  PdfLoader,
  PdfHighlighter,
  Highlight,
  Popup,
  AreaHighlight,
} from "react-pdf-highlighter";
import { Container } from "react-bootstrap";
import axios from 'axios';

import Spinner from "./Spinner";
import Tip from "./Tip";
import processMd from "./markdown";
import { UserContext } from "../App";

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
  const { state } = useContext(UserContext);
  const [currFile, setCurrFile] = useState();
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    let reader = new FileReader();
    let file = state.currentFile;
    setCurrFile(null);
    reader.onload = () => {
      console.log(file.name);
      setCurrFile(reader.result);
    };

    if (file) reader.readAsDataURL(file);
  }, [state.currentFile]);
  
  useEffect(() => {
    async function fetchData() {
      const result_json = await axios("http://127.0.0.1:5000/api/v1/json");
      const pdfHighlights =
        (state.currentFile && result_json.data[state.currentFile.name]) || [];
      setHighlights(pdfHighlights);
    }
    fetchData();
  }, [state.currentFile]);

  const pdfHighlighter = useRef(null);
  const getHighlightById = (id) =>
    highlights.find((highlight) => highlight.id === id);
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
  });

  function addHighlight(highlight) {
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
    setHighlights(highlights.map((h) => (h.id === highlightId ? {
        ...h,
        position: { ...h.position, ...position },
        content: { ...h.content, ...content },
      } : h)));
  }

  console.log(state);
  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#000000",
      }}
      className="pdf-viewer"
    >
      {currFile ? (
        <PdfLoader
          className="my-pdf-viewer"
          url={currFile}
          beforeLoad={<Spinner />}
        >
          {(pdfDocument) => (
            <PdfHighlighter
              ref={pdfHighlighter}
              pdfDocument={pdfDocument}
              enableAreaSelection={(event) => event.altKey}
              onScrollChange={resetHash}
              scrollRef={(scrollTo) => {}}
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
      ) : state.files && state.files.length === 0 ? (
        <Container>
          <div className="h3 text-center mt-5">No File Selected!!</div>
        </Container>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default PdfViewer;

// @flow

// Based on https://github.com/agentcooper/react-pdf-highlighter/tree/master/packages/example
// rewritten with hooks

import React, { useState, useEffect, useRef } from "react";
import URLSearchParams from "url-search-params";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  PdfLoader,
  PdfHighlighter,
  Highlight,
  Popup,
  AreaHighlight,
} from "react-pdf-highlighter";


//import testHighlights from "./test-highlights";

import Spinner from "./Spinner";
import Sidebar from "./Sidebar";
import Tip from "./Tip";
import processMd from "./markdown";

import type {
  T_Highlight,
  T_NewHighlight,
} from "react-pdf-highlighter/src/types";

import "./style/App.css";
import GraphFunc from "./graphFunc";
import HeaderSearch from "./hederSearch";
import HighlightButton from "./highlightButton";
import FileUploadComponent from "./fileUpload";

// type T_ManuscriptHighlight = T_Highlight;
// type State = {
//   highlights: Array<T_ManuscriptHighlight>
// };

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

function App() {
  const [graphData, setGraphData] = useState([]);
  //const [state, setState] = useState({ highlights: testHighlights[url] ? [...testHighlights[url]] : [] })
  const [state, setState] = useState({ highlights: [] });
  const [PdfUrl, setPdfUrl] = useState({ url: "" });
  const [currentTopics, setCurrentTopics] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result_json = await axios("http://127.0.0.1:5000/api/v1/json");
      const pdf_name = Object.keys(result_json.data)[0];
      setPdfUrl({ url: `http://127.0.0.1:5000/api/v1/pdf/${pdf_name}` });
      setState({ highlights: result_json.data[pdf_name] });
    }
    fetchData();
  }, []);
  // not using the State type!

  // Jumping to highlight

  // This function was defined and changed later! I'm not sure why it was used instead of a ref
  // let scrollViewerTo = (highlight: any) => { };
  // https://stackoverflow.com/questions/24841855/how-to-access-component-methods-from-outside-in-reactjs

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
  });

  // State setting functions

  const resetHighlights = () => {
    setState({
      highlights: [],
    });
  };

  function addHighlight(highlight: T_NewHighlight) {
    const { highlights } = state;

    console.log("Saving highlight", highlight);

    setState({
      highlights: [{ ...highlight, id: getNextId() }, ...highlights],
    });
  }

  const deleteHighlight = (index: number) => {
    const highlights = state.highlights.filter((highlight, idx) => {
      if (index !== idx) {
        return highlight;
      }
    });
    setState({ highlights });
  };

  function updateHighlight(
    highlightId: string,
    position: Object,
    content: Object
  ) {
    console.log("Updating highlight", highlightId, position, content);

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
    <div className="App" style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        highlights={highlights}
        resetHighlights={resetHighlights}
        deleteHighlight={deleteHighlight}
      />
      <div
        style={{
          height: "100vh",
          width: "75vw",
          overflowY: "scroll",
          position: "relative",
        }}
      >
        {/* <HeaderSearch /> */}
        <HighlightButton highlight={highlights} />
        <FileUploadComponent />
        <GraphFunc data={graphData} />
        {url ? (
          <PdfLoader url={url} beforeLoad={<Spinner />}>
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
                          { boundingRect: viewportToScaled(boundingRect) },
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
      </div>
    </div>
  );
}

export default App;

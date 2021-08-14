// @flow
import React, { useState, useEffect, useRef } from "react";
import processMd from "../Dashboard/markdown";
import axios from "axios";
import type { T_Highlight } from "react-pdf-highlighter/src/types";
type T_ManuscriptHighlight = T_Highlight;

type Props = {
  highlights: Array<T_ManuscriptHighlight>,
  resetHighlights: () => void,
  deleteHighlight: (index: number) => void,
};

const updateHash = (highlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

function Highlight(props) {
  const [state, setState] = useState({ highlights: [] });
  const [PdfUrl, setPdfUrl] = useState({ url: "" });

  useEffect(() => {
    async function fetchData() {
      const result_json = await axios("http://127.0.0.1:5000/api/v1/json");
      const pdf_name = Object.keys(result_json.data)[0];
      setPdfUrl({ url: `http://127.0.0.1:5000/api/v1/pdf/${pdf_name}` });
      setState({ highlights: result_json.data[pdf_name] });
    }
    fetchData();
  }, []);

  const parseIdFromHash = () =>
    document.location.hash.slice("#highlight-".length);

  const pdfHighlighter = useRef(null);
  const getHighlightById = (id) =>
    state.highlights.find((highlight) => highlight.id === id);
  const scrollToHighlightFromHash = () => {
    const highlight = getHighlightById(parseIdFromHash());
    if (highlight) {
      pdfHighlighter.current.scrollTo(highlight);
    }
  };

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

  const resetHighlights = () => {
    setState({
      highlights: [],
    });
  };

  return (
    <div className="sidebarnew"style={{ width: "25vw" }}>
      {/*  */}
      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>SUPO</h2>

        <p>
          <small>
            To create area highlight hold ⌥ Option key (Alt), then click and
            drag.
          </small>
        </p>
      </div>

      <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="sidebar__highlight"
            onClick={() => {
              updateHash(highlight);
            }}
          >
            <div>
              <div style={{ padding: "4px" }}>
                <button
                  style={{ float: "right" }}
                  onClick={() => deleteHighlight(index)}
                  className="sidebar__btn"
                >
                  <i className="fa fa-close"></i>
                </button>
              </div>
              <strong>{processMd(highlight.comment.text)}</strong>
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              ) : null}
              {highlight.content.image ? (
                <div
                  className="highlight__image"
                  style={{ marginTop: "0.5rem" }}
                >
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>
            <div className="highlight__location">
              Page {highlight.position.pageNumber}
            </div>
          </li>
        ))}
      </ul>
      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          <button onClick={resetHighlights}>Reset highlights</button>
        </div>
      ) : null}
    </div>
  );
}

export default Highlight;

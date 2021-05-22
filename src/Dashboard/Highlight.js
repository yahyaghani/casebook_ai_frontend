// @flow
import React, { useState, useEffect } from "react";
import processMd from "./markdown";
import axios from "axios";


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


  const deleteHighlight = (index: number) => {
    const highlights = state.highlights.filter((highlight, idx) => {
      if (index !== idx) {
        return highlight;
      }
    });
    setState({ highlights });
  };

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
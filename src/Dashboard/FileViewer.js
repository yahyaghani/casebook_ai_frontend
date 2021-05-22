// @flow
import React, { useContext, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../App";
import processMd from "./markdown";

const updateHash = (highlight) => {
  document.location.hash = `pdf-highlight-${highlight.id}`;
};

function FileViewer() {
  const { state, dispatch } = useContext(UserContext);
  
  const [highlights, setHighlights] = useState([]);
  const [selectPdf, setSelectPdf] = useState(false);

  
  useEffect(() => {
    async function fetchData() {
      if(!state.currentFile) return null;
      const result_json = await axios(`http://127.0.0.1:5000/api/v1/json?filename=${state.currentFile.name}`);
      const pdfHighlights = (state.currentFile && result_json.data[state.currentFile.name]) || [];
      // setPdfUrl({ url: `http://127.0.0.1:5000/api/v1/pdf/${pdf_name}` });
      setHighlights(pdfHighlights);
    }
    fetchData();
  }, [state.currentFile]);

  const handleFileClick = (index) => {
    dispatch({ type: "SET_CURR_FILE", payload: state.files[index] });
    setSelectPdf(false);
  }

  const deleteHighlight = (index) => {
    const updatedHighlights = highlights.filter((highlight, idx) => {
      if (index !== idx) {
        return highlight;
      }
    });
    setHighlights(updatedHighlights);
  };

  const resetHighlights = () => {
    setHighlights([]);
  };

  return (
    <div className="sidebarnew" style={{ width: "25vw" }}>
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
        <li
          className="sidebar__highlight h4 bg-secondary"
          onClick={() => setSelectPdf(true)}
        >
          Select Another File
        </li>
        {highlights.length > 0 ? (
          highlights.map((highlight, index) => (
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
          ))
        ) : (
          <li className="sidebar__highlight">
            <div className="p-2">
              <p style={{ margin: 0 }}>
                No Highlights Available for Selected Pdf!
              </p>
            </div>
          </li>
        )}
      </ul>
      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          <button onClick={resetHighlights}>Reset highlights</button>
        </div>
      ) : null}
      <Modal
        style={{ color: "#050505" }}
        show={selectPdf}
        onHide={() => setSelectPdf(false)}
        backdrop="static"
        size="md"
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Select File
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state.files && state.files.length > 0 ? (
            state.files.map((pdf, index) => (
              <div
                key={index}
                className="btn btn-secondary w-100 rounded-0 py-3 my-1"
                onClick={() => handleFileClick(index)}
              >
                {state.currentFile.name === pdf.name ? (
                  <strong>
                    <p style={{ margin: 0 }}>{pdf.name}</p>
                  </strong>
                ) : (
                  <p style={{ margin: 0 }}>{pdf.name}</p>
                )}
              </div>
            ))
          ) : (
            <div className="w-100 p-2">
              <p style={{ margin: 0 }}>No Pdfs uploaded!</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FileViewer;
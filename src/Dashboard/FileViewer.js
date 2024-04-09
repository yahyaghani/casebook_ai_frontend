// @flow
import React, { useContext, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { UserContext } from "../App";
import { Resizable } from "react-resizable";
import processMd from "./markdown";
import axios from "axios";
import { BASE_URL_DEV } from "../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import "../style/resizable.css";

const updateHash = (highlight) => {
  document.location.hash = `pdf-highlight-${highlight.id}`;
};

function FileViewer() {
  const { state, dispatch } = useContext(UserContext);

  const [highlights, setHighlights] = useState([]);
  const [dimensions, setDimensions] = useState({
    height: 720,
    width: 250,
  });
  const [selectPdf, setSelectPdf] = useState(false);

  const [show, setShow] = useState(false);
  const [index, setIndex] = useState();

  const handleClose = () => setShow(false);
  useEffect(() => {
    if (state.currentFile) {
      let highlightUpdated = false;
      state.fileHighlights.forEach((item) => {
        if (item.name === state.currentFile.name) {
          // Filter out highlights with the label "OTHER"
          const filteredHighlights = item.highlights.filter(highlight => highlight.comment.text !== "OTHER");
          setHighlights(filteredHighlights);
          highlightUpdated = true;
        }
      });
      if (!highlightUpdated) setHighlights([]);
    }
    console.log("files", state.files)
  }, [state.currentFile, state.fileHighlights]);
  

  const handleFileClick = async (index) => {
    dispatch({ type: "SET_CURR_FILE", payload: state.files[index] });
    dispatch({ type: "SET_MODAL", payload: false });

    setSelectPdf(false);
  };

  const handleRemove = (index) => {
    setShow(true);
    setIndex(index);
  }

  const handleRemoveFile = (data) => {
    console.log(data, "File Remove....")



    if (state.files.length > 0) {
      let arr = state.files
      arr.splice(arr.findIndex(a => a.name === data.name), 1)
      dispatch({ type: "ADD_FILE", payload: arr });
      dispatch({ type: "SET_CURR_FILE", payload: state.files[0] });
    } else {
      dispatch({ type: "ADD_FILE", payload: [] });
      dispatch({
        type: "SET_FILE_HIGHLIGHTS",
        payload: [],
      });
      dispatch({ type: "SET_CURR_FILE", payload: null });
    }


    setShow(false);


    axios.post(`${BASE_URL_DEV}/deletePdfAndGraphData`, { fileName: data.name }, {
      headers: {
        'x-access-token': state.auth && state.auth.authToken,
      }
    })
      .then(function (response) {
        console.log("delete api response", response)

      })

  }

  const deleteHighlight = (index) => {
    const updatedHighlights = highlights.filter((highlight, idx) => {
      if (index !== idx) {
        return highlight;
      }
    });
    setHighlights(updatedHighlights);
  };
  const hideModal = () => {
    setSelectPdf(false);
    dispatch({ type: "SET_MODAL", payload: false });

  }
  const resetHighlights = () => {
    setHighlights([]);
  };

  const handleSendToEditor = (highlight) => {
    if (!highlight.comment || !highlight.content) {
        console.error("Highlight structure is not as expected", highlight);
        return;
    }

    const payload = {
        commentText: highlight.comment.text,
        contentText: highlight.content.text,
    };
    dispatch({ type: 'ADD_HIGHLIGHT_TEXT', payload });
};


  return (
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
      resizeHandles={["e"]}
    >
      <div
        className="sidebarnew"
        style={{
          width: dimensions.width + 'px' || "25%",
          // minWidth: "20%",
          height: dimensions.height + 'px' || "calc(100vh - 70px)",
          overflowY: "scroll",
        }}
      >
        <div className="description" style={{ padding: "1rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Highlights</h2>
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
                  <div style={{ padding: "0px" }}>
                    <button
                      style={{ float: "right" }}
                      onClick={() => deleteHighlight(index)}
                      className="sidebar__btn"
                    >
                      <i className="fa fa-close"></i>
                    </button>
                    </div>
                    <div>
                    <button
                      style={{ marginLeft: "114px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSendToEditor(highlight);
                      }}
                      className="sidebar__btn_send"
                    >
                      <FontAwesomeIcon icon={faPlus} />
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
          show={selectPdf || state.isModalOpen}
          onHide={() => hideModal()}
          backdrop="static"
          size="xl"
          centered={true}
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Select File
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="card">
              <div className="card-body" style={{ padding: '1.75rem 1.2rem' }}>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>PDF NAME</th>
                        <th>CITATION</th>
                        <th>PROVISION</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.files && state.files.length > 0 ? (
                        state.files.map((pdf, index) => (
                          state.currentFile && state.currentFile.name === pdf.name ? (
                            <tr style={{ backgroundColor: "rgba(0, 0, 0, 0.075)", color: "#212529" }}>
                              <td>{pdf.name}</td>

                              <td style={{ lineHeight: 'inherit' }}><div style={{ overflowY: 'auto', maxHeight: '100px' }}>{pdf && pdf.CITATION && pdf.CITATION.length > 0 && pdf.CITATION.map((listValue) => { return listValue.target }).join(' | ')}</div></td>
                              <td style={{ lineHeight: 'inherit' }}><div style={{ overflowY: 'auto', maxHeight: '100px' }}>{pdf && pdf.PROVISION && pdf.PROVISION.length > 0 && pdf.PROVISION.map((listValue) => { return listValue.target }).join(' | ')}</div></td>

                              <td className="text-danger"><button type="button" onClick={() => handleFileClick(index)} className="btn btn-info btn-sm">View File</button></td>
                              <td className="text-danger"><button type="button" onClick={() => handleRemove(pdf)} className="btn btn-danger btn-sm">Delete File</button></td>
                            </tr>
                          ) : (
                            <tr>
                              <td>{pdf.name}</td>
                              <td style={{ lineHeight: 'inherit' }}><div style={{ overflowY: 'auto', maxHeight: '100px' }}>{pdf && pdf.CITATION && pdf.CITATION.length > 0 && pdf.CITATION.map((listValue) => { return listValue.target }).join(' | ')}</div></td>
                              <td style={{ lineHeight: 'inherit' }}><div style={{ overflowY: 'auto', maxHeight: '100px' }}>{pdf && pdf.PROVISION && pdf.PROVISION.length > 0 && pdf.PROVISION.map((listValue) => { return listValue.target }).join(' | ')}</div></td>
                              <td className="text-danger"><button type="button" onClick={() => handleFileClick(index)} className="btn btn-info btn-sm">View File</button></td>
                              <td className="text-danger"><button type="button" onClick={() => handleRemove(pdf)} className="btn btn-danger btn-sm">Delete File</button></td>
                            </tr>
                          )

                        ))) : (
                        <tr>
                          <td colSpan="4" align="center"><p style={{ margin: "5px" }}>No Pdfs uploaded!</p></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {console.log(state)}
            {/* // <div
                //   key={index}
                //   className="btn btn-secondary w-100 rounded-0 py-3 my-1"
                //   onClick={() => handleFileClick(index)}
                // >
                //   {state.currentFile.name === pdf.name ? (
                //     <strong>
                //       <p style={{ margin: 0 }}>{pdf.name}</p>
                //     </strong>
                //   ) : (
                //     <p style={{ margin: 0 }}>{pdf.name}</p>
                //   )}
                // </div>
               */}

          </Modal.Body>
        </Modal>
        <Modal
          style={{ color: "#050505" }}
          show={show}
          onHide={() => handleClose()}
          centered={true}>
          <Modal.Header closeButton>
            <Modal.Title>Deleting File</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={() => handleRemoveFile(index)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Resizable>
  );
}

export default FileViewer;

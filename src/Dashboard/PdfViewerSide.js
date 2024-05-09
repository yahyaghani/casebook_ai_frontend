import React, { useState, useContext } from 'react'
import { Resizable } from "react-resizable";
import TextEditor from "../TextEditor";
import { UserContext } from "../App";
import PdfGraphFunc from "./PdfGraphFunc";
import { Modal } from "react-bootstrap";

const PdfViewerSide = (props) => {
    const [dimensions, setDimensions] = useState({
        height: 720,
        width: 250
    });
    const [createNotes, setCreateNotes] = useState(false);
    const [showGraphModal, setShowGraphModal] = useState(false);
    const { state, dispatch } = useContext(UserContext);

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
            resizeHandles={["w"]}
        >
            <div
                className="sidebarnew"
                style={{
                    minWidth: "20%",
                    width: dimensions.width + "px" || "25%",
                    height: '100vh',
                    // overflowY: "scroll",
                }}
            >
                <div>
                    {/* Button container with flexbox */}
                    <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between', margin: '20px auto', width: 'fit-content' }}>
                        <div
                            onClick={() => setCreateNotes(true)}
                            className="btn btn-lg btn-outline-primary text-center cursor-pointer p-3"
                        >
                            ADD NOTES
                        </div>
                        {/* <div
                            onClick={() => { }}
                            className="btn btn-lg btn-outline-success text-center cursor-pointer p-3"
                        >
                            OPEN GRAPH
                        </div> */}
                    </div>
                    {createNotes && (
                        <TextEditor
                            id={state.auth && state.auth.userPublicId}
                            fileName={state.currentFile && state.currentFile.name}
                            showTextEditor={createNotes}
                            setShowTextEditor={setCreateNotes}
                        />
                    )}
                    {/* <div
                        onClick={() => { }}
                        style={{ marginBottom: "0 !important" }}
                        className="btn btn-md btn-outline-light text-center bg-secondary cursor-pointer my-5 mb-0 p-3"
                    >
                        RECOMMEND CASES
                    </div> */}


                    {/* <i className="mdi mdi-fullscreen"
                        onClick={() => setShowGraphModal(true)}
                        style={{
                            float: "right",
                            padding: "20px",
                            fontSize: "30px",
                        }}
                    /> */}

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
    )
}

export default PdfViewerSide;

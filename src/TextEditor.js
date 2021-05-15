import React from "react";
import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import { Button, Modal } from "react-bootstrap";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";

// Time in milliseconds to auto save the document
const SAVE_INTERVAL_MS = 60000;

// Options available in toolbar
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function TextEditor({ id, showTextEditor, setShowTextEditor }) {
  const documentId = id;
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // To load Initial document
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  // To auto save document according to SAVE_INTERVAL_MS
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  // to revieve the changes done somewhere else in the same document
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  // useEffect(() => {
  //   if (socket == null || quill == null) return;

  //   const handler = (delta, oldDelta, source) => {
  //     if (source !== "user") return;
  //     socket.emit("send-changes", delta);
  //   };
  //   quill.on("text-change", handler);

  //   return () => {
  //     quill.off("text-change", handler);
  //   };
  // }, [socket, quill]);

  // Setting up the quill editor
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  // to close note editor
  const handleClose = () => {
    setShowTextEditor(false);
    socket.disconnect();
  };

  // called when save button in clicked
  const handleNoteSave = () => {
    if (socket == null || quill == null) return;
    socket.emit("save-document", quill.getContents());
    handleClose();
  }

  return (
    <React.Fragment>
      <Modal
        style={{ color: "#050505" }}
        show={showTextEditor || false}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        centered={true}
      >
        <Modal.Body>
          <div className="container" ref={wrapperRef}></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleNoteSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

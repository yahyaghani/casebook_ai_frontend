import React from "react";
import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import { Button, Modal } from "react-bootstrap";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";

// Time in milliseconds to auto save the document
const SAVE_INTERVAL_MS = 3000;



// Options available in toolbar
const TOOLBAR_OPTIONS = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ font: [] }],
	[{ list: "ordered" }, { list: "bullet" }],
	["bold", "italic", "underline"],
	[{ color: [] }, { background: [] }],
	[{ script: "sub" }, { script: "super" }],
	[{ align: [] }],
	["blockquote", "code-block"],
	["clean"],
];

export default function TextEditor({
	id,
	fileName,
	showTextEditor,
	setShowTextEditor,
}) {
	const documentId = id;
	const [socket, setSocket] = useState();
	const [quill, setQuill] = useState();
	// const [openaiResponse, setOpenaiResponse] = useState("");
	const [openaiResponses, setOpenaiResponses] = useState([]);

	const handleCopyToClipboard = (text) => {
		// Copy to clipboard
		navigator.clipboard.writeText(text).then(() => {
		  console.log('Text copied to clipboard');
		}, (err) => {
		  console.error('Could not copy text: ', err);
		});
	  
		// Paste into the Quill editor at the current cursor position, or at the end if no selection is made
		const range = quill.getSelection();
		const position = range ? range.index : quill.getLength();
		quill.insertText(position, text);
		quill.setSelection(position + text.length); // Move cursor to the end of the inserted text
	  };
	  
	useEffect(() => {
		const s = io("http://localhost:8000");
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

		socket.emit("get-document", JSON.stringify({ documentId, fileName }));
		console.log(documentId, fileName);
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
	};

	//openai call
	useEffect(() => {
		const interval = setInterval(() => {
			socket.emit("openai_call",quill.getContents());
		}, 5000);
	
		return () => {
			clearInterval(interval);
		};
	}, [socket]);
	
	useEffect(() => {
		if (socket == null) return;
	
		const handler = (data) => {
			setOpenaiResponses(currentResponses => [data.message, ...currentResponses]);
		};
	
		socket.on("openai_response", handler);
	
		return () => {
			socket.off("openai_response", handler);
		};
	}, [socket]);
	



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
				<Modal.Body style={{ height: '60vh' }}>
				<div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
					<div style={{ flex: 7, marginRight: '20px' }} ref={wrapperRef}></div>
					<div style={{
					flex: 3,
					borderLeft: '1px solid #ccc',
					paddingLeft: '20px',
					overflowY: 'auto'
					}}>
					<h4>Recommendations</h4>
					<div style={{ display: 'flex', flexDirection: 'column-reverse' }}> {/* This ensures the latest (top) item is added first */}
						{openaiResponses.map((response, index) => (
						<div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<span>{response}</span>
							<Button variant="outline-primary" onClick={() => handleCopyToClipboard(response)}>Insert</Button>
						</div>
						))}
					</div>
					</div>
				</div>
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

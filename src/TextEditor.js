import React from "react";
import { useContext,useCallback, useEffect, useState } from "react";
import Quill from "quill";
import { FormControl, Modal, Button, Spinner } from "react-bootstrap"; // Import Spinner component
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { UserContext } from "./App";
import { FaRegPaperPlane, FaBriefcase, FaFile } from 'react-icons/fa'; // Importing icons
import { pdfExporter } from "quill-to-pdf";
import { saveAs } from "file-saver";

// Time in milliseconds to auto save the document
const SAVE_INTERVAL_MS = 15000;



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
    const { state } = useContext(UserContext);
	const [editorMode, setEditorMode] = useState(null); // New state for tracking the editor mode
	const [isQuillReady, setIsQuillReady] = useState(false);
	const [openaiRecommendations, setOpenaiRecommendations] = useState([]);
	const [query, setQuery] = useState('');
	const [requestCounter, setRequestCounter] = useState({ recommendations: 0, caselaw: 0, clause: 0 });
	const [responseReceived, setResponseReceived] = useState(false);
	// Add state variables to track loading status
	const [loadingRecommendations, setLoadingRecommendations] = useState(false);
	const [loadingCaselaw, setLoadingCaselaw] = useState(false);
	const [loadingClause, setLoadingClause] = useState(false);
	const [loadingSend, setLoadingSend] = useState(false);
	const [latestReceivedIndex, setLatestReceivedIndex] = useState(-1);



	const exportAsPDF = async () => {
		const delta = quill.getContents(); // gets the Quill delta
		const pdfAsBlob = await pdfExporter.generatePdf(delta); // converts to PDF
		saveAs(pdfAsBlob, "current-draft-on-case.pdf"); // downloads from the browser
	  };


	useEffect(() => {
		// Reset the request counter whenever the text editor is shown
		if (showTextEditor) {
		  setRequestCounter({ recommendations: 0, caselaw: 0, clause: 0 });
		}
	  }, [showTextEditor]);
	
	  
	useEffect(() => {
		// const s = io("http://localhost:8000");
		const s = io("https://back.casebk.com");  // Update the URL here

		setSocket(s);

		return () => {
			s.disconnect();
		};
	}, []);

	// To load Initial document
	// Assuming this useEffect hook handles loading the document.
	useEffect(() => {
		if (!socket || !quill || editorMode !== 'edit_document' && editorMode !== 'appeal') return;
	  
		const loadDocument = (document) => {
		  let documentText = '';
	  
		
		   if (document.text_body) {
			documentText = document.text_body;
		  }
	  
		  // Set the loaded text into Quill editor
		  if (documentText) {
			quill.setText(documentText);
		  } else {
			quill.setText('Document not found or is empty.');
		  }
	  
		  quill.enable(); // Enable the editor for editing
		};
	  
		socket.on("document-loaded", loadDocument);
	  
		return () => {
		  socket.off("document-loaded", loadDocument);
		};
	  }, [socket, quill, editorMode]);
	  
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

    useEffect(() => {
        if (quill != null && state.highlightTextForEditor) {
            // Assuming you want to append the text at the end of the current document
            const length = quill.getLength();
            quill.insertText(length, "\n" + state.highlightTextForEditor);
            // Optionally, clear the highlight text from global state if not needed anymore
            // dispatch({ type: 'SET_HIGHLIGHT_TEXT', payload: null });
        }
    }, [quill, state.highlightTextForEditor]);


	const wrapperRef = useCallback((wrapper) => {
		if (wrapper == null) return;
	  
		wrapper.innerHTML = ""; // Clear the wrapper
		const editor = document.createElement("div");
		wrapper.append(editor);
		const q = new Quill(editor, {
		  theme: "snow",
		  modules: { toolbar: TOOLBAR_OPTIONS },
		});
	  
		q.enable();
		setQuill(q); // Set the Quill instance
		setIsQuillReady(true); // Indicate that Quill is now ready
	  }, [editorMode]);
		  
	  const handleAppeal = () => {
		if (socket && socket.connected) {
			// Include documentId in the data being sent
			const dataToSend = { 
				content: 'Your input data here', // This can be any content you wish to send
				documentId: documentId, // Adding documentId to the payload
				filename:fileName,
				
			};
			console.log('Appeal clicked. Emitting openai_appeal_call with data:', dataToSend);
			socket.emit("openai_appeal_call", dataToSend); // Emit the openai_appeal_call event with documentId
			setEditorMode('appeal'); // Update editorMode to 'appeal'
		} else {
			console.log("Socket is not connected.");
		}
	};
	
			
	const insertTextIntoQuill = (text) => {

		const length = quill.getLength();
		quill.insertText(length, "\n" + text + "\n\n"); // Inserting text at the end
		quill.setSelection(length + text.length + 2); // Moving cursor to the end
		

	  };
	  

	const insertHighlightIntoQuill = (highlightContent) => {
		const position = quill.getLength(); // Get the position to insert at the end of the document
		quill.insertText(position, "\n" + highlightContent + "\n\n"); // Insert the content with padding newlines
		quill.setSelection(position + highlightContent.length + 2); // Move cursor to the end of the inserted text
	};
	
	// Function to handle when the "Edit Document" option is selected
	const handleEditDocument = () => {
		setEditorMode('edit_document');
		// Emit the request only after ensuring 'editorMode' is updated and socket is available
		// Note: Moved to useEffect to ensure dependencies are correctly tracked
	};

	useEffect(() => {
		if (editorMode === 'edit_document' && socket) {
			socket.emit("get-document", JSON.stringify({ documentId, fileName }));
		}
	}, [editorMode, socket, documentId, fileName]); // Dependencies ensure this runs only when editorMode changes to 'edit_document'

	
	// Function to handle when the "New Document" option is selected
	const handleNewDocument = () => {
		setEditorMode('new_document');
		// Setup for creating a new document
	};


	// to close note editor
	const handleClose = () => {
		setShowTextEditor(false);
		socket.disconnect();
	};

	// called when save button in clicked
	const handleNoteSave = () => {
		if (socket == null || quill == null) return;
		socket.emit("save-document", quill.getContents());
		exportAsPDF();
		// handleClose();
	};

	const handleRequest = (type) => {
		console.log(`Attempting to request ${type}...`);
		if (socket && socket.connected && quill) { // Ensure socket is connected and Quill is initialized
		  console.log(`Socket is connected, sending ${type} request.`);
		  const quillContent = quill.getContents(); // Get Quill content
		  const currentCount = requestCounter[type] + 1; // Increment the specific request count
		  console.log(`counter number is ${currentCount} request.`);

		  const requestData = { 
			content: quillContent, // This can be any content you wish to send
			documentId: documentId, // Adding documentId to the payload
			filename:fileName,
			requestCount: currentCount, // Include the incremented count in the request

			 }; // Include Quill content in the request data
		  
		  // Emitting different events based on the type of request
		  switch (type) {
			case "recommendations":
			  socket.emit("openai-get-recommendation", requestData);
			  setLoadingRecommendations(true);
			  break;
			case "caselaw":
			// console.log(`Emitting ${type} with data:`, requestData);
			  socket.emit("openai-get-caselaw", requestData);
			  setLoadingCaselaw(true);

			  break;
			case "clause":
			  socket.emit("openai-get-clause", requestData);
			  setLoadingClause(true);

			  break;
			default:
			  console.log("Unknown request type");
		  }
		  setRequestCounter({
			...requestCounter,
			[type]: currentCount, // Update the state with the new count
		  });
	
		} else {
		  console.log("Socket is not connected or Quill is not initialized.");
		}
	  };
	  

	useEffect(() => {
		// const newSocket = io("http://localhost:8000");
		const newSocket = io("https://back.casebk.com");  // Update the URL here

		setSocket(newSocket);
		console.log("Socket connection established");
	
		return () => {
			newSocket.disconnect();
			console.log("Socket disconnected");
		};
	}, []);
	
	useEffect(() => {
		if (editorMode === 'edit_document' && socket) {
			console.log(`Requesting document: ${documentId}, FileName: ${fileName}`);
			socket.emit("get-document", { documentId, fileName });
		}
	}, [editorMode, socket, documentId, fileName]);
	
	useEffect(() => {
		if (!socket || !isQuillReady) return; // Check if quill is ready
	  
		const recommendationHandler = (data) => {
		//   setOpenaiRecommendations(currentRecommendations => [data.recommendation, ...currentRecommendations]);
		  setOpenaiRecommendations(currentRecommendations => [...currentRecommendations, data.recommendation]);
		  setLoadingRecommendations(false); // Update loading state to false when recommendation is received
		  setLoadingCaselaw(false);
		  setLoadingSend(false);
		  setLoadingClause(false);

		};
	  
		socket.on("openai-recommendations", recommendationHandler);
		socket.on("openai-caselaw", recommendationHandler); // Listen for caselaw responses
		socket.on("openai-clause", recommendationHandler); // Listen for clause responses
		socket.on("openai-query-response", recommendationHandler);

		return () => {
		  socket.off("openai-recommendations", recommendationHandler);
		  socket.off("openai-caselaw", recommendationHandler);
		  socket.off("openai-clause", recommendationHandler);
		  socket.off("openai-query-response", recommendationHandler);

		};
	  }, [socket, isQuillReady,setLoadingRecommendations,setLoadingCaselaw,setLoadingSend,setLoadingClause]); // Ensure dependencies are correctly managed
	  

	useEffect(() => {
		if (!socket || !isQuillReady) return; // Check if quill is ready
	  
		const handler = (data) => {
		  setOpenaiResponses(currentResponses => [data.message, ...currentResponses]);
		//   setOpenaiResponses(currentResponses => [ ...currentResponses,data.message]);
			setLoadingRecommendations(false); // Update loading state to false when recommendation is received
			setLoadingCaselaw(false);
			setLoadingSend(false);
			setLoadingClause(false);

		  insertTextIntoQuill(data.message); // Automatically insert the response into Quill
		};
	  
		socket.on("openai_response", handler);

		return () => {
		  socket.off("openai_response", handler);

		};
	  }, [socket, isQuillReady,setLoadingRecommendations,setLoadingCaselaw,setLoadingSend,setLoadingClause]); // Add `isQuillReady` as a dependency
	  
	const handleSend = () => {
		if (!socket || !quill || !query) return; // Check if socket and Quill are initialized, and query is not empty
	
		const quillContent = quill.getContents(); // Get Quill content
		const dataToSend = { 
			query: query,
			content: quillContent,
			documentId: documentId,
			filename: fileName
		};
	
		// socket.emit("openai-query", dataToSend); // Emit the openai-query event with the data
		socket.emit("openai-query", dataToSend); // Emit the openai-query event with the data
		
		setLoadingSend(true);

		// Optionally clear the query box after sending the query
		setQuery('');
	
		// You might also want to handle any UI changes or feedback upon sending the query
	};
	

	  
	return (
		<React.Fragment>
		  {!editorMode ? (
			<Modal show={showTextEditor} onHide={handleClose} backdrop="static" centered
			
		>
		<Modal.Header closeButton style={{ backgroundColor: '#191c24', textAlign: 'center' }}>
			  <Modal.Title >Notepad</Modal.Title>
			  </Modal.Header >
			  <Modal.Body style={{ textAlign: 'center',background:'#191c24' }}>
			  <Button variant="outline-info" onClick={handleNewDocument} style={{ margin: '10px' }}>
				  <FaFile /> New Document
				</Button>

				<Button variant="outline-success" onClick={handleEditDocument} style={{ margin: '10px' }}>
				  <FaBriefcase /> Edit Document
				</Button>

				<Button variant="outline-primary" onClick={handleAppeal} style={{ margin: '10px' }}>
				  <FaRegPaperPlane /> Appeal
				</Button>

				
		
			  </Modal.Body>
			</Modal>
		  ) : (
			<Modal
			  style={{ color: "white" }}
			  show={showTextEditor}
			  onHide={handleClose}
			  backdrop="static"
			  size="xl"
			  centered
			><Modal.Header closeButton={false} style={{ backgroundColor: '#191c24', textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
			<Modal.Title>Notepad</Modal.Title>
			<div>
			  <Button variant="primary" onClick={handleNoteSave} style={{ marginRight: '10px' }}>Save</Button>
			  <Button variant="secondary" onClick={handleClose} style={{ fontSize: '16px', lineHeight: '1', padding: '0.375rem 0.75rem' }}>
				<span aria-hidden="true">&times;</span>
			  </Button>
			</div>
		  </Modal.Header>
		  
				<Modal.Body style={{ height: '76vh', background:'#191c24' }}>
				<div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
				{/* <div style={{ flex: 2, paddingRight: '20px', overflowY: 'auto' }}>
						{state.highlightTextsForEditor && state.highlightTextsForEditor.length > 0 ? (
							state.highlightTextsForEditor.map((highlight, index) => (
								<div key={index} className="sidebar__highlight" style={{ 
									// padding: '10px', 
									margin: '5px 0', 
									display: 'flex', 
									flexDirection: 'column', // Stack content and button vertically
									justifyContent: 'space-between', // Space between content and button
									// height: '100%' // Ensure the div takes full height to push the button to the bottom
								}}>
									<div>
											<strong style={{ fontSize: '10px' }}>{highlight.commentText}</strong>
											<p style={{ fontSize: '10px' }}>{highlight.contentText}</p>
									</div>
									<div style={{
										display: 'flex',
										justifyContent: 'flex-end', // Align button to the right
										// paddingTop: '10px' // Add some space between the text and the button
									}}>
										<Button variant="outline-secondary" onClick={() => insertHighlightIntoQuill(highlight.contentText)}>Insert</Button>
									</div>
								</div>
							))
						) : (
							<div></div>
						)}
					</div> */}

					
				  <div style={{ flex: 7, marginRight: '20px' }} ref={wrapperRef}></div>


				  <div style={{ flex: 3, paddingLeft: '2px', overflowY: 'auto' }}>
				  <div style={{ flex: 3, paddingLeft: '2px', overflowY: 'auto' }}>
				  <Button variant="outline-primary" onClick={() => handleRequest('recommendations')}>
				{loadingRecommendations ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : 'Insights'}
			</Button>
			<Button variant="outline-success" onClick={() => handleRequest('caselaw')}>
				{loadingCaselaw ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : 'Caselaw'}
			</Button>
		
						
						<Button variant="outline-info" onClick={() => handleRequest('clause')}>
				{loadingClause ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : 'Clause'}
			</Button>
						<div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
						{openaiRecommendations.map((recommendation, index) => (
								<div 
									key={index} 
									className="sidebar__highlight"  
									style={{
										padding: '10px', 
										margin: '5px 0', 
										display: 'flex', 
										justifyContent: 'space-between', 
										alignItems: 'center',
										backgroundColor: index === latestReceivedIndex ? '2A3038' : '2A3038', // Apply flashing effect to the latest received recommendation
										animation: index === latestReceivedIndex ? 'flash 1s infinite alternate' : 'none' // Apply flashing animation
									}}
									onMouseEnter={() => setLatestReceivedIndex(index)} // Update the index of the latest received recommendation on hover
									onMouseLeave={() => setLatestReceivedIndex(-1)} // Reset the index when mouse leaves
								>
									<span style={{ fontSize: '10px' }}>{recommendation}</span>
									<Button variant="outline-secondary" onClick={() => insertHighlightIntoQuill(recommendation)}>Insert</Button>
								</div>
							))}

						</div>
						</div>

				  </div>
				</div>
			  </Modal.Body>
			  <Modal.Footer className="custom-modal-footer" style={{ background:'#191c24', justifyContent: 'center' }}>
				<div className="w-100 d-flex justify-content-between align-items-center">
					{/* <Button variant="secondary" onClick={handleClose}>Close</Button> */}
					{/* Query Text Box */}
					<FormControl
						type="text"
						placeholder="Ask Casebook AI a question"
						value={query} // Bind the input value to state
						onChange={(e) => setQuery(e.target.value)} // Update state on input change
						className="nav-link mt-2 mt-md-0 d-none d-lg-flex search mx-3"
					/>

					{/* Send Button */}
					{/* <Button variant="info" onClick={handleSend}>Send</Button> */}
					<Button variant="info" onClick={handleSend}>
				{loadingSend ? <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner> : 'Send'}
			</Button>

					{/* <Button variant="primary" onClick={handleNoteSave}>Save</Button> */}
				</div>

			</Modal.Footer>
			<style>
        {`
            @keyframes flash {
                from {
                    background-color: #2A3038; // Initial background color
                }
                to {
                    background-color: #32435a; // Flashing background color
                }
            }
        `}
    </style>


			</Modal>
		  )}
		</React.Fragment>
	  );
					  }
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone'
// import data from '../shared/jsonData/raw_contract 1-clauses.json';
import Accordion from '../Dashboard/Accordion';
import folder from '../images/folder.png';
import folderDocs from '../images/folder_documents.png';

const LawsViewer = () => {
	const [data, setData] = useState("");
	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader()

			reader.onabort = () => console.log('file reading was aborted')
			reader.onerror = () => console.log('file reading has failed')
			reader.onload = () => {
				// Do whatever you want with the file contents
				const binaryStr = reader.result;
				const jsonFile = JSON.parse(binaryStr);
				setData(jsonFile);
			}
			reader.readAsText(file);
		})

	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	return (
		<div className="dashboard-view bg-dark p-5"
			style={{ width: "100%" }}>
			<div className="drag-drop">
				<div {...getRootProps()} className="drag-drop__area">
					<input {...getInputProps()} />
					{isDragActive ? (
						<>
							<div className="drag-drop__file-icon">
								<div>
									{/* <i className="mdi mdi-file-multiple"></i> */}
									<img src={folderDocs} alt="Dropping File ..." className="images" />
								</div>
								<div>
									<h2>Drag and drop or<button className="browse-button"><u>browse</u></button></h2>
								</div>
							</div>
							{data ? <div className="side-drag-drop">
								<h2>
									Drag and drop
									<button className="browse-button">
										<u>browse</u>
									</button>
								</h2>
							</div> : null}
						</>
					) : (
						<>
							<div className="drag-drop__file-icon">
								<div>
									{/* <i className="mdi mdi-file-multiple"></i> */}
									<img src={folder} alt="Drop File here " className="images" />
								</div>
								<div>
									<h2>Drag and drop or<button className="browse-button"><u>browse</u></button></h2>
								</div>
							</div>
							{data ? <div className="side-drag-drop">
								<h2>
									Drag and drop or
									<button className="browse-button">
										<u>browse</u>
									</button>
								</h2>
							</div> : null}
						</>
					)}
				</div>
			</div>
			<div>
				{data ? <Accordion data={data} /> : null}
			</div>
		</div>
	)
}

export default LawsViewer;

// FileMetadataViewer.js
import React, { useContext } from 'react';
import { Table, Button } from 'reactstrap';
import { UserContext } from '../App';

function FileMetadataViewer({ files }) {
	const { state, dispatch } = useContext(UserContext);

	const handleOpenDocViewer = (file) => {
		dispatch({ type: "SET_CURR_FILE", payload: file });
		dispatch({ type: "SHOW_DOC_VIEWER", payload: true });
	};

	return (
		<div className="file-metadata-viewer">
			<h2>Uploaded Files</h2>
			<Table responsive bordered className="custom-table">
				<thead>
					<tr>
						<th>File Name</th>
						<th>File Size</th>
						<th>Upload Date</th>
						<th>Category</th>
						<th>Summary</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{files.map((file, index) => (
						<tr key={index}>
							<td>{file.name}</td>
							<td>{(file.size / 1024).toFixed(2)} KB</td> {/* Assuming size is in bytes */}
							<td>{new Date().toLocaleDateString()}</td> {/* Placeholder for upload date */}
							<td>{file.category}</td>
							<td>{file.summary}</td>
							<td>
								<Button color="primary" onClick={() => handleOpenDocViewer(file)}>Open in DocViewer</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default FileMetadataViewer;

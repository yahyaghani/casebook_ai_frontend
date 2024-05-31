// FileMetadataViewer.js
import React from 'react';
import { Table } from 'reactstrap';

function FileMetadataViewer({ files }) {
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
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default FileMetadataViewer;

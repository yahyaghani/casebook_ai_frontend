import React, { useContext, useState, useCallback, Fragment } from "react";
import axios from "axios";
import { Button, Table } from "reactstrap";
import { useDropzone } from 'react-dropzone';
import { IoArrowBackCircle } from "react-icons/io5";
import folderDocs from '../images/cloud-drag.png';
import { UserContext } from "../App";
import { BASE_URL_DEV } from "../utils";
import FileMetadataViewer from './FileMetadataViewer'; // Import the new component

function MultiFileUpload({ onBackClick }) {
    const { state, dispatch } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showMetadataViewer, setShowMetadataViewer] = useState(false); // State to trigger metadata viewer
    const [uploadedFiles, setUploadedFiles] = useState([]); // Store uploaded files metadata

    const onDrop = useCallback((acceptedFiles) => {
        let newFiles = [];
        acceptedFiles.forEach((file) => {
            let existFile = state.files.filter(e => e.name === file.name);
            if (existFile.length !== 0) {
                alert(`${existFile[0].name} already exists`);
            } else {
                newFiles.push(file);
            }
        });
        setFiles([...files, ...newFiles]);
    }, [files, state.files]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleSelectFile = (fileName) => {
        if (selectedFiles.includes(fileName)) {
            setSelectedFiles(selectedFiles.filter(name => name !== fileName));
        } else {
            setSelectedFiles([...selectedFiles, fileName]);
        }
    };

    const handleSelectAll = () => {
        if (selectedFiles.length === files.length) {
            setSelectedFiles([]);
        } else {
            setSelectedFiles(files.map(file => file.name));
        }
    };

    const handleRowClick = (fileName) => {
        handleSelectFile(fileName);
    };

    async function handleUpload(e) {
        e.preventDefault();
        const filesToUpload = files.filter(file => selectedFiles.includes(file.name));
        if (filesToUpload.length === 0) return;

        const data = new FormData();
        filesToUpload.forEach(file => {
            data.append('files', file);
        });
        setIsLoading(true);
        await axios
            .post(`${BASE_URL_DEV}/upload/multiple-files`, data, {
                headers: {
                    'x-access-token': state.auth && state.auth.authToken,
                }
            })
            .then(function (response) {
                console.log(response.data);
                dispatch({ type: "MESSAGE", payload: response.data.message });
                toggleShowHighlight();
                setFiles([]);
                setSelectedFiles([]);
                setUploadedFiles(response.data.files); // Set uploaded files metadata
                setIsLoading(false);
                setShowMetadataViewer(true); // Show the metadata viewer on successful upload
            })
            .catch(function (error) {
                console.log(error);
                if (error && error.response) {
                    dispatch({ type: "ERROR", payload: error.response.statusText || 'File Upload Failed!!' });
                }
                setIsLoading(false);
            });
    }

    const toggleShowHighlight = () => {
        dispatch({ type: "TOGGLE_HIGHLIGHT", payload: true });
    };

    return (
        <Fragment>
            <div className="previewComponent">
                <button className="back-button" onClick={onBackClick}>
                    <IoArrowBackCircle size={40} />
                </button>
                {!showMetadataViewer && files.length === 0 && (
                    <div {...getRootProps()} className="drag-drop__area">
                        <input {...getInputProps()} />
                        <div className="drag-drop__file-icon">
                            <img src={folderDocs} alt="Dropping File ..." className="drag-drop-image" />
                            <h5 className="drag-drop-text">Drag & Drop case files here<button className="browse-button"></button></h5>
                        </div>
                    </div>
                )}
                {!showMetadataViewer && files.length > 0 && (
                    <Fragment>
                        <div className="file-preview">
                            <Table responsive bordered className="custom-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <input
                                                type="checkbox"
                                                checked={selectedFiles.length === files.length}
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th>File Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.map((file, index) => (
                                        <tr key={index} onClick={() => handleRowClick(file.name)} style={{ cursor: 'pointer' }}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFiles.includes(file.name)}
                                                    onChange={(e) => { e.stopPropagation(); handleSelectFile(file.name); }}
                                                />
                                            </td>
                                            <td>{file.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className="upload-button-container">
                            <Button
                                className="btn btn-lg submitButton" // Updated to btn-lg
                                color="success"
                                onClick={handleUpload}
                                disabled={selectedFiles.length === 0 || isLoading}
                            >
                                Upload
                            </Button>
                        </div>
                    </Fragment>
                )}
                {showMetadataViewer && <FileMetadataViewer files={uploadedFiles} />}
                {isLoading && <div className="loading"></div>}
            </div>
        </Fragment>
    );
}

export default MultiFileUpload;

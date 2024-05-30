import React, { useContext, useState, useCallback } from "react";
import { Fragment } from "react";
import axios from "axios";
import { Button, Table } from "reactstrap";
import { UserContext } from "../App";
import { BASE_URL_DEV } from "../utils";
import { useDropzone } from 'react-dropzone';
import async from 'async';
import folder from '../images/folder.png';
import folderDocs from '../images/folder_documents.png';

function MultiFileUpload(props) {
    const { state, dispatch } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
                setIsLoading(false);
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
                <div {...getRootProps()} className="drag-drop__area">
                    <input {...getInputProps()} />
                 
                        <div className="drag-drop__file-icon">
                            <img src={folderDocs} alt="Dropping File ..." className="images" />
                    
                            <h5 className="w-100 text-center">Drag and drop  <button className="browse-button"></button></h5>

                        </div>
                 
                </div>
                {files.length > 0 && (
                    <div className="file-preview">
                        <Table responsive bordered>
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
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedFiles.includes(file.name)}
                                                onChange={() => handleSelectFile(file.name)}
                                            />
                                        </td>
                                        <td>{file.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
                <Button
                    className="btn btn-md submitButton"
                    color="success"
                    onClick={handleUpload}
                    disabled={selectedFiles.length === 0 || isLoading}
                >
                    Upload
                </Button>
                {isLoading && <div className="loading"></div>}
            </div>
        </Fragment>
    );
}

export default MultiFileUpload;

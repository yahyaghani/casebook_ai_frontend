import React, { useContext, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { UserContext } from "../App";
import { BASE_URL_DEV } from "../utils";

function FileUploadComponent(props) {
	const { state, dispatch } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false)
	const [file, setFile] = useState([]);
	let existsFileName = [];
	// const [imagePreviewUrl, setImagePreviewUrl] = useState("");
	// const [uploadedResponse, setUploadedResponse] = useState("");

	async function _handleSubmit(e) {
		e.preventDefault();
		if (!file) return null;
		console.log("existsFileName", existsFileName);
		if (existsFileName.length > 0) {
			alert("File is already Exists", existsFileName);
		}
		else {
			dispatch({ type: "ADD_FILE", payload: file });
			const data = new FormData();
			//data.append("file", file);
			for (const key of Object.keys(file)) {
				data.append('file', file[key])
			}
			setIsLoading(true);
			await axios
				.post(`${BASE_URL_DEV}/upload/file`, data, {
					headers: {
						'x-access-token': state.auth && state.auth.authToken,
					}
				})
				.then(function (response) {
					// console.log(response)
					// setUploadedResponse(response.data);
					if (response.data) {
						setIsLoading(false);
						dispatch({ type: "MESSAGE", payload: response.data.message });
						dispatch({ type: "SET_MODAL", payload: true });
						return (async () => {
							const result = await axios(
								`${BASE_URL_DEV}/highlights-json/${state.auth && state.auth.userPublicId
								}/${file[0].name}`
							);
							const fileHighlights = result.data;
							setFile([]);
							console.log('fileHighlights: ', fileHighlights);
							if (fileHighlights && fileHighlights.highlights) {
								dispatch({
									type: "SET_FILE_HIGHLIGHTS",
									payload: fileHighlights.highlights,
								});
							}
						})();

					}
				})
				.catch(function (error) {
					console.log(error);
					// setUploadedResponse(
					//   error && error.response !== undefined && error.response.statusText
					// );
					if (error && error.response) {
						dispatch({ type: "ERROR", payload: error.response.statusText || 'File Upload Failed!!' });
					}
				});
		}
		// let uploadedFile = {
		//   lastModified: file.lastModified,
		//   lastModifiedDate: new Date(file.lastModifiedDate),
		//   name: file.name,
		//   size: file.size,
		//   type: file.type,
		// };

	}

	function _handleImageChange(e) {
		e.preventDefault();
		let newfile = [];
		let file = e.target.files;
		console.log(file[0]);
		for (let i = 0; i < file.length; i++) {
			let existFile = state.files.filter(e => e.name == file[i].name);

			if (existFile.length != 0) {
				alert(`${existFile[0].name} is already Exists`)
			} else {
				let reader = new FileReader();
				newfile.push(file[i]);
				reader.readAsDataURL(file[i])

				reader.onload = () => {
					setFile(newfile);
				};
			}

		}


	}



	return (
		<Fragment>
			<div className="previewComponent">
				<form onSubmit={(e) => _handleSubmit(e)} encType="multipart/form-data">
					<div className="input-group">
						{/* <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                Upload
              </span>
            </div> */}
						<div className="custom-file">
							<input
								type="file"
								name="file"
								className="custom-file-input"
								//id="inputGroupFile01"
								multiple="multiple"
								onChange={(e) => _handleImageChange(e)}
								aria-describedby="inputGroupFileAddon01"
							/>
							<label style={{ color: '#c7c7c7' }} className="custom-file-label" >
								{file.length === 0 ? 'Choose file' : file.length + ' files selected'}
							</label>
						</div>
					</div>

					<Button
						className="btn btn-md submitButton"
						color="success"
						type="submit"
						onClick={(e) => _handleSubmit(e)}
					>
						Upload File
					</Button>
					{isLoading ? (
						<div className="loading"></div>
					) :
						null
					}
				</form>
				{/* {true &&
          <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <img src="..." className="rounded mr-2" alt="..."/>
                <strong className="mr-auto">Bootstrap</strong>
                <small>11 mins ago</small>
                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
              <div className="toast-body">
                Hello, world! This is a toast message.
              </div>
          </div>
        } */}
				{/* <div className="preview_Sec">
          {$imagePreview !== null && (
            <div className="imgPreview">{$imagePreview}</div>
          )}
          {uploadedResponse !== "" && <p>File Uploaded Successfully</p>}
        </div> */}
			</div>
		</Fragment>
	);
}

export default FileUploadComponent;

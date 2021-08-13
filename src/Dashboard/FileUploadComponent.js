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

	async function _handleSubmit(e) {
		e.preventDefault();
		if (!file) return null;
		// console.log("existsFileName", existsFileName);
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
					if (error && error.response) {
						dispatch({ type: "ERROR", payload: error.response.statusText || 'File Upload Failed!!' });
					}
				});
		}
	}

	function _handleImageChange(e) {
		e.preventDefault();
		let newfile = [];
		let file = e.target.files;
		console.log(file[0]);
		for (let i = 0; i < file.length; i++) {
			let existFile = state.files.filter(e => e.name == file[i].name);

			if (existFile.length !== 0) {
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
			</div>
		</Fragment>
	);
}

export default FileUploadComponent;

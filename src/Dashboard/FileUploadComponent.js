import React, { useContext, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { UserContext } from "../App";
import { BASE_URL_DEV } from "../utils";
const async = require('async')

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
			//dispatch({ type: "ADD_FILE", payload: file });
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
						var data = file
						dispatch({ type: "MESSAGE", payload: response.data.message });
						try {
							async.eachSeries(data, function (element, cbBatch) {
								axios.get(`${BASE_URL_DEV}/highlights-json/${state.auth && state.auth.userPublicId
									}/${element.name}`, {
									headers: {
										'x-access-token': state.auth && state.auth.authToken,
									}
								})
									.then(function (result) {

										const fileHighlights = result.data;
										dispatch({ type: "SET_CURR_FILE", payload: file[0] });
										setFile([]);
										if (fileHighlights && fileHighlights.highlights) {
											dispatch({
												type: "SET_FILE_HIGHLIGHTS",
												payload: fileHighlights.highlights,
											});
										}
										cbBatch(null);


									})

							}, (loopErrBatch) => {

								console.log(loopErrBatch);
								(async () => {
									const result = await axios(`${BASE_URL_DEV}/get/files`, {
										headers: {
											"x-access-token": state.auth && state.auth.authToken,
										},
									});
									const files = result.data && result.data.files;
									console.log("resultresultresultresult", result)
									if (result && files && files.length > 0) {
										const results = await axios(`${BASE_URL_DEV}/get-graphdata`, {
											headers: {
												"x-access-token": state.auth && state.auth.authToken,
											},
										});
										const allgraphs = results.data;
										let Obj = {};
										let _id = "";

										results && allgraphs && allgraphs.graphdata && allgraphs.graphdata.length > 0 && allgraphs.graphdata.filter(x => {
											_id = x.fileName
											Obj[_id] = x.links.filter(e => e.source == "CITATION" || e.source == "PROVISION")

										});
										var fileNew = files
										fileNew.forEach(element => {
											element["CITATION"] = Obj && Obj[element.name] && Obj[element.name].length > 0 ? Obj[element.name].filter(e => e.source == "CITATION") : ["N/A"]
											element["PROVISION"] = Obj && Obj[element.name] && Obj[element.name].length > 0 ? Obj[element.name].filter(e => e.source == "PROVISION") : ["N/A"]

										});
										setIsLoading(false);
										dispatch({ type: "ADD_FILE", payload: fileNew });
										dispatch({ type: "SET_MODAL", payload: true });

									}

								})();
								console.log("All Batch Completed");
							});




						} catch (error) {
							console.log("error :--- ", error)
						}

					}
				})
				.catch(function (error) {
					console.log(error);

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
		//console.log(file[0]);
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
						Upload
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

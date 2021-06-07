import React, { useContext, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { UserContext } from "../App";
import { BASE_URL_DEV } from "../utils";

function FileUploadComponent(props) {
  const { state, dispatch } = useContext(UserContext);

  const [file, setFile] = useState("");
  // const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  // const [uploadedResponse, setUploadedResponse] = useState("");

  async function _handleSubmit(e) {
    e.preventDefault();
    // let uploadedFile = {
    //   lastModified: file.lastModified,
    //   lastModifiedDate: new Date(file.lastModifiedDate),
    //   name: file.name,
    //   size: file.size,
    //   type: file.type,
    // };
    if(!file) return null;
    dispatch({ type: "ADD_FILE", payload: file });
    const data = new FormData();
    data.append("file", file);
    console.log(state.auth);
    await axios
      .post(`${BASE_URL_DEV}/upload/file`, data, {
        headers: {
          'x-access-token': state.auth && state.auth.authToken,
        }
      })
      .then(function (response) {
        // console.log(response)
        // setUploadedResponse(response.data);
        if(response.data) {
          dispatch({ type: "MESSAGE", payload: response.data.message });
          return (async () => {
            const result = await axios(
              `${BASE_URL_DEV}/highlights-json/${
                state.auth && state.auth.userPublicId
              }/${file.name}`
            );
            const fileHighlights = result.data;
            console.log('fileHighlights: ');
            console.log(fileHighlights);
            if (
              fileHighlights &&
              fileHighlights.highlights
              ) {
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
      setFile('');
  }

  function _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onload = () => {
      setFile(file);
      // setImagePreviewUrl(reader.result);
    };

    if(file) reader.readAsDataURL(file);
  }

  // let $imagePreview = null;
  // if (imagePreviewUrl) {
  //   $imagePreview = <img src={imagePreviewUrl} height="50px" width="50px" />;
  // }
  //   else {
  //     $imagePreview = (
  //         <div></div>
  //     //   <div className="previewText">Please select an Image for Preview</div>
  //     );
  //   }

  return (
    <Fragment>
      <div className="previewComponent">
        <form onSubmit={(e) => _handleSubmit(e)}>
          <div className="input-group">
            {/* <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                Upload
              </span>
            </div> */}
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                onChange={(e) => _handleImageChange(e)}
                aria-describedby="inputGroupFileAddon01"
              />
              <label style={{ color: '#c7c7c7' }} className="custom-file-label" htmlFor="inputGroupFile01">
                {file === '' ? 'Choose file' : file.name}
              </label>
            </div>
          </div>
          {/* 
<Input
            className="fileInput"
            type="file"
           
          /> */}

          <Button
            className="btn btn-md submitButton"
            color="success"
            type="submit"
            onClick={(e) => _handleSubmit(e)}
          >
            Upload File
          </Button>
        </form>
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

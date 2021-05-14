import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import { Button, Input } from "reactstrap";

function FileUploadComponent(props) {
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [uploadedResponse, setUploadedResponse] = useState("");

  async function _handleSubmit(e) {
    e.preventDefault();
    let uploadedFile = {
      lastModified: file.lastModified,
      lastModifiedDate: new Date(file.lastModifiedDate),
      name: file.name,
      size: file.size,
      type: file.type,
    };
    await axios
      .post("http://127.0.0.1:5000/api/v1/file", uploadedFile)
      .then(function (response) {
        setUploadedResponse(response.data);
      })
      .catch(function (error) {
        setUploadedResponse(
          error && error.response !== undefined && error.response.statusText
        );
      });
  }

  function _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  }

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = <img src={imagePreviewUrl} height="50px" width="50px" />;
  }
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
              <label className="custom-file-label" htmlFor="inputGroupFile01">
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
        <div className="preview_Sec">
          {$imagePreview !== null && (
            <div className="imgPreview">{$imagePreview}</div>
          )}
          {uploadedResponse !== "" && <p>{uploadedResponse}</p>}
        </div>
      </div>
    </Fragment>
  );
}

export default FileUploadComponent;

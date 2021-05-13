import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import axios from "axios";

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
      type: file.type
    }
    console.log("handle uploading-", file, uploadedFile);
    await axios
      .post("http://127.0.0.1:5000/api/v1/file", uploadedFile)
      .then(function (response) {
        setUploadedResponse(response.data);
      })
      .catch(function (error) {
        console.log("error:", error.response);
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
    $imagePreview = <img src={imagePreviewUrl} />;
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
          <input
            className="fileInput"
            type="file"
            onChange={(e) => _handleImageChange(e)}
          />
          <button
            className="submitButton"
            type="submit"
            onClick={(e) => _handleSubmit(e)}
          >
            Upload File
          </button>
        </form>
        <div className="preview_Sec">
        {$imagePreview !== null && (
          <div className="imgPreview">{$imagePreview}</div>
        )}
        {uploadedResponse !== '' && <p>{uploadedResponse}</p>}
        </div>
      </div>
    </Fragment>
  );
}

export default FileUploadComponent;

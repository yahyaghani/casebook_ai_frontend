import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Button } from "reactstrap";
import axios from "axios";

function HighlightButton(props){
    const [hightlightResponse, setHightlightResponse] = useState("");

    async function getHighlightData() {
        await axios
        .post("http://127.0.0.1:5000/api/v1/jsondata", props.highlight)
        .then(function (response) {
            setHightlightResponse(response.data);
        })
        .catch(function (error) {
          console.log("error:", error.response);
          setHightlightResponse(
            error && error.response !== undefined && error.response.statusText
          );
        });
    }

    return(
        <Fragment>
            <div className="highlight_btn">
            <Button className="btn btn-md" outline color='success' onClick={getHighlightData}>Click to get Highlight Data</Button>
            <p>{hightlightResponse}</p>
            </div>
        </Fragment>
    )

}

export default HighlightButton;

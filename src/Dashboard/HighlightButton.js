import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Button } from "reactstrap";
import axios from "axios";

function HighlightButton(props){
    const [hightlightResponse, setHightlightResponse] = useState("");
    const [highlightData, setHighlightData] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const result_json = await axios("http://127.0.0.1:5000/api/v1/json");
          const pdf_name = Object.keys(result_json.data)[0];
        setHighlightData(result_json.data[pdf_name]);
        }
        fetchData();
      }, []);

    async function getHighlightData() {
        await axios
        .post("http://127.0.0.1:5000/api/v1/savejsondata", highlightData)
        .then(function (response) {
            setHightlightResponse(response.data);
        })
        .catch(function (error) {
          setHightlightResponse(
            error && error.response !== undefined && error.response.statusText
          );
        });
    }

    return(
        <Fragment>
            <div className="highlight_btn">
            <Button className="btn btn-md" outline color='success' onClick={getHighlightData}>Save Highlight JSON</Button>
            <p>{hightlightResponse}</p>
            </div>
        </Fragment>
    )

}

export default HighlightButton;

// @flow
import React, { useContext } from "react";
import { UserContext } from "../App";

function FileViewer() {
  const { state, dispatch } = useContext(UserContext);

  const handleFileClick = (index) => {
    dispatch({ type: "SET_CURR_FILE", payload: state.files[index] });
  }

  return (
    <div className="sidebarnew" style={{ width: "25vw" }}>
      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Select File</h2>

        <p>
          <small>To select a file click on file name.</small>
        </p>
      </div>

      <ul className="sidebar__highlights">
        {state.files && state.files.length > 0 ? (
          state.files.map((pdf, index) => (
            <li
              key={index}
              className="sidebar__highlight"
              onClick={() => handleFileClick(index)}
            >
              <div>
                {state.currentFile.name === pdf.name ? (
                  <strong>
                    <p style={{ margin: 0 }}>{pdf.name}</p>
                  </strong>
                ) : (
                  <p style={{ margin: 0 }}>{pdf.name}</p>
                )}
              </div>
            </li>
          ))
        ) : (
          <li className="sidebar__highlight">
            <div>
              <p style={{ margin: 0 }}>No Pdfs uploaded!</p>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default FileViewer;

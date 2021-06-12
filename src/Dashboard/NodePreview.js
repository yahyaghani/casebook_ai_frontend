
import React, { useState, useEffect, useContext  } from "react";
import { UserContext } from "../App";

function Highlight(props) {
  const {state} = useContext(UserContext);
  const [preview, setPrview] = useState("")
  const text = ` <small>
  To create area highlight hold ⌥ Option key (Alt), then click and
  drag.
</small>`
useEffect(() => {
  setPrview(state.nodePreview)
}, [state.nodePreview]);

  return (
    <div className="sidebarnew"style={{ width: "25vw" }}>
      {/*  */}
      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" , fontSize:"1.2rem"}}>Preview</h2>

        <div dangerouslySetInnerHTML={{ __html: preview }} />
        
      </div>
    </div>
  );
}

export default Highlight;

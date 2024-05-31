import React, { useContext, useState } from "react";
import { Resizable } from "react-resizable";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from "../App";

import "../style/resizable.css";
import "../style/docviewer.css";

function DocViewer() {
  const { state } = useContext(UserContext);
  const [dimensions, setDimensions] = useState({
    height: 720,
    width: 300,
  });
  const [text, setText] = useState('');

  return (
    <Resizable className="box" width={dimensions.width} onResize={(e, { size }) => setDimensions({ width: size.width })} resizeHandles={["e"]}>
      <div className="doc-editor-container" style={{ flex: 1, padding: "20px" }}>
        <ReactQuill value={text} onChange={setText} style={{ height: '590px' }} />
      </div>
    </Resizable>
  );
}

export default DocViewer;

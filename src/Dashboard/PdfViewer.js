import React, { useContext, useEffect, useState } from "react";
import { PdfLoader, PdfHighlighter } from "react-pdf-highlighter";
import { Container } from "react-bootstrap";

import Spinner from "./Spinner";
import { UserContext } from "../App";

const resetHash = () => {
  document.location.hash = "";
};

// Your render function
function PdfViewer({ pdfUrl }) {
  const { state } = useContext(UserContext);
  const [currFile, setCurrFile] = useState();

  useEffect(() => {
    let reader = new FileReader();
    let file = state.currentFile;
    setCurrFile(null);
    reader.onload = () => {
      console.log(file.name);
      setCurrFile(reader.result);
    };

    if (file) reader.readAsDataURL(file);
  }, [state.currentFile]);

  console.log(state);
  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#000000",
      }}
    >
      {currFile ? (
        <PdfLoader
          className="my-pdf-viewer"
          url={currFile}
          beforeLoad={<Spinner />}
        >
          {(pdfDocument) => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={(event) => event.altKey}
              onScrollChange={resetHash}
              scrollRef={(scrollTo) => {}}
              highlights={[]}
            />
          )}
        </PdfLoader>
      ) : state.files && state.files.length === 0 ? (
        <Container>
          <div className="h3 text-center mt-5">No File Selected!!</div>
        </Container>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default PdfViewer;

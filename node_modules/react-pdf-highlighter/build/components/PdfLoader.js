function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

class PdfLoader extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      pdfDocument: null
    });
  }

  componentDidMount() {
    const {
      url,
      onError
    } = this.props;
    pdfjs.getDocument({
      url: url,
      eventBusDispatchToDOM: true
    }).promise.then(pdfDocument => {
      this.setState({
        pdfDocument: pdfDocument
      });
    }).catch(onError);
  }

  render() {
    const {
      children,
      beforeLoad
    } = this.props;
    const {
      pdfDocument
    } = this.state;

    if (pdfDocument) {
      return children(pdfDocument);
    }

    return beforeLoad;
  }

}

export default PdfLoader;
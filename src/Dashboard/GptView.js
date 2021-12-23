import React, { useState } from 'react';
import SelectBox from '../shared/SelectBox';
import TextBox from '../shared/TextBox';
import '../Gptstyles.scss';
import { postGenerateTextEndpoint } from '../shared/GptUtil';
import Form from 'react-bootstrap/Form'
import {Button, Alert, Spinner} from 'react-bootstrap'
import axios from "axios";
// import { BASE_URL_DEV } from "../utils";
function GptView() {
  const [text, setText] = useState("");
  const [model, setModel] = useState('gpt2');
  const [generatedText, postGenerateText] = postGenerateTextEndpoint();

  const generateText = () => {
    console.log("Data: ", text)
    postGenerateText({ text, model, userId: 1 });
  }

  return (
    <div className='app-container'>
      <form noValidate autoComplete='off'>
        <h1>React GPT-2</h1>
        <SelectBox model={model} setModel={setModel} />
        <TextBox text={text} setText={setText} />
        <Button onClick={generateText} />
      </form>

      {generatedText.pending &&
        <div className='result pending'>Please wait</div>}

      {generatedText.complete &&
        (generatedText.error ?
          <div className='result error'>Bad Request</div> :
          <div className='result valid'>
            {generatedText.data.result}
          </div>)}
    </div>
  );
}

export default GptView;
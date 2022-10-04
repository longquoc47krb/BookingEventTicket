import React, { useState } from "react";
//import './App.css';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import CKEditor from "@ckeditor/ckeditor5-react"
import CKEditor from "@ckeditor/ckeditor5-react";
import parse from "html-react-parser";

function TextEditor() {
  const [text, setText] = useState("");
  return (
    <div className="App">
      <div className="editer">
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
        />
      </div>
      <div className="">
        {/*<h2>Content</h2>
       <p>{parse(text)}</p>*/}
      </div>
    </div>
  );
}

export default TextEditor;

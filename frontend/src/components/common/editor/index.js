import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const TextEditor = ({
  setlong_description,
  long_description,
  update,
}) => {
  const [editorState, setEditorState] = useState(
    update
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(long_description))
        )
      : EditorState.createEmpty()
  );

  const handleChange = (editorState) => {
    const contentState = stateToHTML(editorState.getCurrentContent());

    setlong_description(contentState);
  };

  return (
    <div className="My-Editor">
      <Editor
        onEditorStateChange={(editorState) => {
          setEditorState(editorState);
          handleChange(editorState);
        }}
        editorState={editorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        // defaultEditorState={stateToHTML(editorState.getCurrentContent())}
      />
      {/* <textarea>{ description }</textarea> */}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import RichTextEditor from "react-rte";

function Editor(props) {
  const { field, form, label, uppercase, onChange: onChangeCustom } = props;
  const { value, name } = field;
  const [editorState, setEditorState] = useState(
    RichTextEditor.createEmptyValue()
  );
  useEffect(() => {
    if (
      value !== null &&
      typeof value !== "undefined" &&
      value !== editorState.toString("html")
    ) {
      setEditorState(RichTextEditor.createValueFromString(value, "html"));
    }
  }, [value, editorState.toString("html")]);
  return (
    <RichTextEditor
      value={editorState}
      onChange={(text) => {
        form.setFieldValue(name, text.toString("html"));
        setEditorState(text);
      }}
    />
  );
}

export default Editor;

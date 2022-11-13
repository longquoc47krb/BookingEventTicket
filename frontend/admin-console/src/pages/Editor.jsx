import { ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";
import RichTextEditor from "react-rte";

function Editor(props) {
  const { field, form, label, onChange: onChangeCustom } = props;
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
  }, [editorState, value]);
  return (
    <div className="my-2">
      <h1 className="text-primary text-xl font-semibold mb-4">{label}</h1>
      <RichTextEditor
        value={editorState}
        onChange={(text) => {
          form.setFieldValue(name, text.toString("html"));
          setEditorState(text);
        }}
      />
      <p className="error-message">
        <ErrorMessage name={name} />
      </p>
    </div>
  );
}

export default Editor;

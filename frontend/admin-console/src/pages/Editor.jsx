import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ErrorMessage } from "formik";
const Editor = (props) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const { field, form, label, onChange: onChangeCustom } = props;
  const { value, onChange, onBlur, onFocus, name } = field;
  const { setFieldValue } = form;
  return (
    <div className="form-group">
      <h1 className="text-primary text-xl font-semibold mb-2">{label}</h1>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={(content) => setFieldValue(name, content)}
        onBlur={onBlur}
        onFocus={onFocus}
        name={name}
      ></ReactQuill>
      <p className="error-message">
        <ErrorMessage name={name} />
      </p>
    </div>
  );
};
export default Editor;

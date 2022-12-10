import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { ErrorMessage, useField } from "formik";
import React, { useEffect, useState } from "react";
import { Editor as EditorDraft } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTranslation } from "react-i18next";
import axios from "axios";
const Editor = (props) => {
  const { name, label } = props;
  const [field, meta, helpers] = useField(name);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { t } = useTranslation();
  const formikValue = meta.value;
  // Convert formik value to an editor state.
  // This is triggered when we change the subject.
  useEffect(() => {
    const blocksFromHTML = convertFromHTML(formikValue);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    setEditorState(EditorState.createWithContent(state));
  }, [formikValue]);
  // Formik value is only updated when we leave the editor.
  function saveStateToFormik() {
    const htmlString = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    helpers.setValue(htmlString);
  }
  const uploadImageCallBack = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "admin_preset");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/lotus-ticket-2022/image/upload",
        formData
      );
      return { data: { link: response.data.url } };
    } catch (error) {
      return error.response.data;
    }
  };
  return (
    <div>
      <h1 className="text-primary text-xl font-semibold mb-4">{label}</h1>
      <EditorDraft
        editorState={editorState}
        onEditorStateChange={(editorState) => setEditorState(editorState)}
        wrapperClassName="w-auto"
        editorClassName="bg-white border-2 border-gray-200 p-2"
        onBlur={saveStateToFormik}
        toolbar={{
          image: {
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: uploadImageCallBack,
            previewImage: true,
            inputAccept: "image/*",
            alt: { present: false, mandatory: false, previewImage: true },
          },
        }}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <p className="text-red-600 font-medium text-lg mb-0">{t(msg)}</p>
        )}
      />
    </div>
  );
};
export default Editor;

/* eslint-disable jsx-a11y/alt-text */
import { t } from "i18next";
import { useState, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { GiCancel } from "react-icons/gi";
import { useSelector } from "react-redux";
import { isEmpty, isNotEmpty } from "../utils/utils";
import { AlertErrorPopup } from "./Alert";
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 4,
  borderRadius: 2,
  borderColor: "#a7a7a7",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "100%",
  height: "auto",
  maxHeight: "600px",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
const maxSize = 200000;
function sizeValidator(file) {
  if (file.size > maxSize) {
    AlertErrorPopup({
      title: t("event.upload.validate.error"),
    });
    return {
      code: "file-too-large",
      message: `File is larger than ${maxSize} bytes`,
    };
  }

  return null;
}
const UploadImage = (props) => {
  const { field, form, label } = props;
  const { value, onBlur, name } = field;
  const { setFieldValue } = form;
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    validator: sizeValidator,
    onDrop: (acceptedFiles) => {},
  });
  useEffect(() => {
    if (isNotEmpty(acceptedFiles)) {
      setFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )[0]
      );
      setFieldValue(
        name,
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )[0]
      );
    }
  }, [acceptedFiles]);
  const initialBackground = useSelector(
    (state) => state.event.initialBackground
  );
  const [file, setFile] = useState(value);
  console.log({ file, initialBackground });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  const thumbs = isNotEmpty(file) ? (
    <div style={thumb} key={file.name} className="relative">
      <div style={thumbInner}>
        {file ? (
          <GiCancel
            className={`text-red-500 text-3xl absolute top-2 right-2`}
            onClick={() => {
              setFile(initialBackground);
              setFieldValue(name, initialBackground);
            }}
          />
        ) : null}
        <img
          src={file.preview ? file.preview : initialBackground}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ) : isNotEmpty(value) ? (
    <div style={thumb}>
      <div style={thumbInner}>
        <img src={value} style={img} />
      </div>
    </div>
  ) : null;
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(file.preview);
  }, []);
  return (
    <>
      <span className="text-primary text-xl font-semibold">{label}</span>
      <section className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <h1 className="text-xl">{t("event.upload.text")}</h1>
          <span>{t("event.upload.hint")}</span>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    </>
  );
};
export default UploadImage;

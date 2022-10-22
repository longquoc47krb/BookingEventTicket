import { convertToHTML, convertFromHTML } from "draft-convert";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import {
  getToHTMLConfig,
  getFromHTMLConfig,
  defaultFontFamilies,
} from "./configs.js";

const defaultConvertOptions = {
  fontFamilies: defaultFontFamilies,
};

export const convertRawToHTML = (rawContent, options) => {
  options = { ...defaultConvertOptions, ...options };

  try {
    const contentState = convertFromRaw(rawContent);
    options.contentState = contentState;
    return convertToHTML(getToHTMLConfig(options))(contentState);
  } catch (error) {
    console.warn(error);
    return "";
  }
};

export const convertHTMLToRaw = (HTMLString, options, source) => {
  options = { ...defaultConvertOptions, ...options };

  try {
    const contentState = convertFromHTML(getFromHTMLConfig(options, source))(
      HTMLString
    );
    return convertToRaw(contentState);
  } catch (error) {
    console.warn(error);
    return {};
  }
};

export const convertEditorStateToHTML = (editorState, options) => {
  options = { ...defaultConvertOptions, ...options };

  try {
    const contentState = editorState.getCurrentContent();
    options.contentState = contentState;
    return convertToHTML(getToHTMLConfig(options))(contentState);
  } catch (error) {
    console.warn(error);
    return "";
  }
};

export const convertHTMLToEditorState = (
  HTMLString,
  editorDecorators,
  options,
  source
) => {
  options = { ...defaultConvertOptions, ...options };

  try {
    const content = convertFromHTML(getFromHTMLConfig(options, source))(
      HTMLString
    );
    return EditorState.createWithContent(content, editorDecorators);
  } catch (error) {
    console.warn(error);
    return EditorState.createEmpty(editorDecorators);
  }
};

export const convertEditorStateToRaw = (editorState) => {
  return convertToRaw(editorState.getCurrentContent());
};

export const convertRawToEditorState = (rawContent, editorDecorators) => {
  try {
    console.log(convertToHTML(convertFromRaw(rawContent)));
    return EditorState.createWithContent(
      convertFromRaw(rawContent),
      editorDecorators
    );
  } catch (error) {
    console.warn(error);
    return EditorState.createEmpty(editorDecorators);
  }
};

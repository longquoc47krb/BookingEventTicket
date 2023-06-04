import {
  DatePicker as AntdDatePicker,
  Form,
  Input as AntdInput,
  Select as AntdSelect,
  TimePicker as AntdTimePicker,
} from "antd";
import moment from "moment";
import { ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import React, { useEffect, useRef } from "react";
const { Item } = Form;
const { Option } = AntdSelect;
function Input(props) {
  const {
    field,
    form,
    label,
    width,
    uppercase,
    onChange: onChangeCustom,
    disabled,
  } = props;
  const { t } = useTranslation();
  const { value, onChange, onBlur, name } = field;
  const { errors, touched } = form;
  const inputRef = useRef(null);

  useEffect(() => {
    if (touched[name] && errors[name]) {
      inputRef.current.focus();
    }
  }, [errors, name, touched]);
  const handleChange = (e) => {
    const { value } = e.target;
    var customEvent = {
      target: {
        value: uppercase ? value.toUpperCase() : value,
        name,
      },
    };
    onChange(customEvent);
    if (onChangeCustom) {
      onChangeCustom(value);
    }
  };
  return (
    <>
      <h1 className="font-medium text-black text-lg my-2">{label}</h1>
      <AntdInput
        disabled={disabled}
        name={name}
        value={value}
        onBlur={onBlur}
        status={errors[name] ? "error" : ""}
        onChange={handleChange}
        style={{ width: width }}
        className="p-[0.5rem]"
        ref={inputRef}
      />
      {/* <p className="text-red-600 font-medium text-lg mb-0">
        {touched[name] && t(errors.name)}
      </p> */}
      <ErrorMessage
        name={name}
        render={(msg) => (
          <p className="text-red-600 font-medium text-lg mb-0">{t(msg)}</p>
        )}
      />
    </>
  );
}
function InputCurrency(props) {
  const {
    field,
    form,
    label,
    width,
    uppercase,
    onChange: onChangeCustom,
    disabled,
  } = props;
  const { t } = useTranslation();
  const { value, onChange, onBlur, name } = field;
  const { errors, touched } = form;
  const inputRef = useRef(null);

  useEffect(() => {
    if (touched[name] && errors[name]) {
      inputRef.current.focus();
    }
  }, [errors, name, touched]);
  const handleChange = (e) => {
    const { value } = e.target;
    var customEvent = {
      target: {
        value: uppercase ? value.toUpperCase() : value,
        name,
      },
    };
    onChange(customEvent);
    if (onChangeCustom) {
      onChangeCustom(value);
    }
  };
  return (
    <>
      <h1 className="font-medium text-black text-lg my-2">{label}</h1>
      <AntdInput
        disabled={disabled}
        name={name}
        value={value.toLocaleString()}
        onBlur={onBlur}
        status={errors[name] ? "error" : ""}
        onChange={handleChange}
        style={{ width: width }}
        className="p-[0.5rem]"
        ref={inputRef}
      />
      {/* <p className="text-red-600 font-medium text-lg mb-0">
        {touched[name] && t(errors.name)}
      </p> */}
      <ErrorMessage
        name={name}
        render={(msg) => (
          <p className="text-red-600 font-medium text-lg mb-0">{t(msg)}</p>
        )}
      />
    </>
  );
}
function DatePicker(props) {
  const dateFormat = "DD/MM/YYYY";
  const { form, field, label, disabled } = props;
  const { value, onBlur, name } = field;
  const { t } = useTranslation();
  const { setFieldValue, errors, touched } = form;
  const inputRef = useRef(null);

  useEffect(() => {
    if (touched[name] && errors[name]) {
      inputRef.current.focus();
    }
  }, [errors, name, touched]);
  return (
    <>
      <Item>
        <h1 className="text-primary text-xl font-semibold mb-4">{label}</h1>
        <AntdDatePicker
          className="w-full p-[0.5rem] mb-4 h-[2.5rem]"
          format={dateFormat}
          name={name}
          value={value}
          onChange={(value) => setFieldValue(name, value)}
          onBlur={onBlur}
          disabled={disabled}
          ref={inputRef}
        />
        <p className="text-red-600 font-medium text-lg mb-0">
          {touched[name] && t(errors[name])}
        </p>
      </Item>
    </>
  );
}
function TimePicker(props) {
  const { form, field, label, disabled } = props;
  const { value, onBlur, name } = field;
  const { t } = useTranslation();
  const { setFieldValue, errors, touched } = form;
  const format = "HH:mm";
  const inputRef = useRef(null);

  useEffect(() => {
    if (touched[name] && errors[name]) {
      inputRef.current.focus();
    }
  }, [errors, name, touched]);
  return (
    <>
      <Item>
        <h1 className="text-primary text-xl font-semibold mb-4">{label}</h1>
        <AntdTimePicker
          defaultValue={moment("17:00", format)}
          format={format}
          className="w-full p-[0.5rem] mb-4 h-[2.5rem]"
          name={name}
          value={value}
          allowClear={false}
          status={errors[name] ? "error" : ""}
          onChange={(value) => setFieldValue(name, value)}
          onBlur={onBlur}
          disabled={disabled}
          ref={inputRef}
        />
        <p className="text-red-600 font-medium text-lg mb-0">
          {touched[name] && t(errors[name])}
        </p>
      </Item>
    </>
  );
}
function Select(props) {
  const { field, form, label, mode, options } = props;
  const { value, name, onChange } = field;
  const { t } = useTranslation();
  const { errors, touched } = form;
  const handleChange = (value) => {
    const customEvent = {
      target: {
        name: name,
        value: value,
      },
    };
    onChange(customEvent);
  };
  const inputRef = useRef(null);

  useEffect(() => {
    if (touched[name] && errors[name]) {
      inputRef.current.focus();
    }
  }, [errors, name, touched]);

  return (
    <>
      <Item>
        <h1 className="text-primary text-xl font-semibold mb-4">{label}</h1>
        <AntdSelect
          showSearch
          value={value}
          style={{ height: "2.5rem" }}
          status={errors[name] ? "error" : ""}
          onChange={handleChange}
          mode={mode}
          ref={inputRef}
        >
          {options.map((item, index) => (
            <Option key={index + 1} value={item.value}>
              {item.name}
            </Option>
          ))}
        </AntdSelect>
        <p className="text-red-600 font-medium text-lg mb-0">
          {touched[name] && t(errors[name])}
        </p>
      </Item>
    </>
  );
}
function SelectHorizonal(props) {
  const { field, form, label, mode, options } = props;
  const { value, name, onChange } = field;
  const { t } = useTranslation();
  const { errors, touched } = form;
  const handleChange = (value) => {
    const customEvent = {
      target: {
        name: name,
        value: value,
      },
    };
    onChange(customEvent);
  };
  const inputRef = useRef(null);

  useEffect(() => {
    if (touched[name] && errors[name]) {
      inputRef.current.focus();
    }
  }, [errors, name, touched]);
  return (
    <>
      <Item>
        <div style={{ display: "flex", alignItems: "center", gap: "0 1rem" }}>
          <h1 className="text-primary text-xl font-semibold mb-4">{label}</h1>
          <AntdSelect
            showSearch
            value={value}
            defaultValue={"USD"}
            style={{ height: "2.5rem", width: "auto" }}
            status={errors[name] ? "error" : ""}
            onChange={handleChange}
            mode={mode}
            ref={inputRef}
          >
            {options.map((item, index) => (
              <Option key={index + 1} value={item.value}>
                {item.name}
              </Option>
            ))}
          </AntdSelect>
        </div>
        <p className="text-red-600 font-medium text-lg mb-0">
          {touched[name] && t(errors[name])}
        </p>
      </Item>
    </>
  );
}
function InputPassword(props) {
  const { field, form, label, uppercase, onChange: onChangeCustom } = props;
  const { t } = useTranslation();
  const { value, onChange, onBlur, name } = field;
  const { errors, touched } = form;
  const handleChange = (e) => {
    const { value } = e.target;
    var customEvent = {
      target: {
        value: uppercase ? value.toUpperCase() : value,
        name,
      },
    };
    onChange(customEvent);
    if (onChangeCustom) {
      onChangeCustom(value);
    }
  };
  const inputRef = useRef(null);

  useEffect(() => {
    if (touched[name] && errors[name]) {
      inputRef.current.focus();
    }
  }, [errors, name, touched]);
  return (
    <>
      <h1 className="font-medium text-black text-lg my-2">{label}</h1>
      <AntdInput.Password
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={handleChange}
        status={errors[name] ? "error" : ""}
        className="p-[0.5rem]"
        ref={inputRef}
      />

      <p className="text-red-600 font-medium text-lg mb-0">
        {touched[name] && t(errors[name])}
      </p>
    </>
  );
}

export {
  Input,
  InputPassword,
  InputCurrency,
  DatePicker,
  TimePicker,
  Select,
  SelectHorizonal,
};

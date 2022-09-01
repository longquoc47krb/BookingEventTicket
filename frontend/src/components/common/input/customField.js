import { Form, Input as AntdInput } from "antd";
import { ErrorMessage } from "formik";
import React from "react";
const { Item } = Form;
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
  const { value, onChange, onBlur, name } = field;
  const { errors } = form;
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
      <Item>
        <h1 className='font-bold text-white text-base'>{label}</h1>
        <AntdInput
          disabled={disabled}
          name={name}
          value={value}
          onBlur={onBlur}
          status={errors[name] ? "error" : ""}
          onChange={handleChange}
          style={{ width: width }}
          className='p-[0.5rem]'
        />
        <p className='error-message'>
          <ErrorMessage name={name} />
        </p>
      </Item>
    </>
  );
}
function InputPassword(props) {
  const { field, form, label, uppercase, onChange: onChangeCustom } = props;
  const { value, onChange, onBlur, name } = field;
  const { errors } = form;
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
      <Item>
        <h1 className='font-bold text-white text-base'>{label}</h1>
        <AntdInput.Password
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={handleChange}
          status={errors[name] ? "error" : ""}
          className='p-[0.5rem]'
        />
        <p className='error-message'>
          <ErrorMessage name={name} />
        </p>
      </Item>
    </>
  );
}
export { Input, InputPassword };

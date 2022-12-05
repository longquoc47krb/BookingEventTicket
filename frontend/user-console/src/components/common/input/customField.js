import { Form, Input as AntdInput } from "antd";
import MaskedInput from "antd-mask-input";
import React from "react";
import { useTranslation } from "react-i18next";
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
      />
      <p className="text-red-600 font-medium text-lg mb-0">
        {touched[name] && t(errors[name])}
      </p>
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
      />

      <p className="text-red-600 font-medium text-lg mb-0">
        {touched[name] && t(errors[name])}
      </p>
    </>
  );
}
const DUMB_PHONE = "+84111111111";
function InputMask(props) {
  const { field, form, label, value } = props;
  const { name, onBlur, onChange } = field;
  const { errors, touched } = form;
  const { t } = useTranslation();
  return (
    <>
      <Item>
        <h1 className="title">{label}</h1>
        <MaskedInput
          mask={DUMB_PHONE}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <p className="text-red-600 font-medium text-lg mb-0">
          {touched[name] && t(errors[name])}
        </p>
      </Item>
    </>
  );
}
export { Input, InputPassword, InputMask };

import { Select as AntdSelect } from "antd";
const { Option } = Select;
export function Select(props) {
  const { field, mode, options, width } = props;
  const { value, name } = field;
  const handleChange = (value) => {
    const changeEvent = {
      target: {
        name: name,
        value: value,
      },
    };
    field.onChange(changeEvent);
  };
  return (
    <>
      <AntdSelect
        value={value}
        onChange={handleChange}
        style={{ width: width }}
        mode={mode}>
        {options.map((item, index) => (
          <Option key={index + 1} value={item.key}>
            {item.value}
          </Option>
        ))}
      </AntdSelect>
    </>
  );
}

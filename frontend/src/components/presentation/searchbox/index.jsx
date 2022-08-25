import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import React from "react";
function SearchBox(props) {
  const {
    dataSource,
    notFoundContent,
    keyword,
    onChange,
    onSelect,
    onPressEnter,
    width,
    placeholder,
    className,
  } = props;

  return (
    <AutoComplete
      allowClear
      value={keyword}
      notFoundContent={notFoundContent}
      dropdownClassName='certain-category-search-dropdown'
      dropdownMatchSelectWidth={300}
      style={{
        width: width,
      }}
      onSelect={onSelect}
      onChange={onChange}
      options={dataSource}
      className={className}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }>
      <Input
        onPressEnter={onPressEnter}
        style={{ height: 54 }}
        placeholder={placeholder}
        prefix={
          <SearchOutlined onClick={onSelect} style={{ cursor: "pointer" }} />
        }
      />
    </AutoComplete>
  );
}

export default SearchBox;

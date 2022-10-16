import { useTranslation } from "react-i18next";
import { isNotEmpty } from "../../../utils/utils";
import { Select as AntSelect } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterSelector,
  setCategoryId,
  setProvince,
  setStatus,
} from "../../../redux/slices/filterSlice";
export function Select(props) {
  const { data, icon, type, defaultValue } = props;
  const { t } = useTranslation();
  const keys = isNotEmpty(data) && Object.keys(Object.assign({}, ...data));
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  console.log({ defaultValue });
  console.log({ value });
  useEffect(() => {
    if (type === "location") {
      dispatch(setProvince(value));
      console.log("setProvince:", value);
    } else if (type === "category") {
      dispatch(setCategoryId(value));
      console.log("setCategoryId:", value);
    } else {
      dispatch(setStatus(value));
      console.log("setStatus:", value);
    }
  }, [type, value, dispatch, defaultValue]);
  return (
    <div className="select-container">
      {icon}
      <AntSelect
        style={{
          width: "100%",
        }}
        bordered={false}
        defaultValue={defaultValue}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      >
        {data?.map((item, index) => (
          <AntSelect.Option key={index} value={item[keys[0]]}>
            {t(item[keys[1]])}
          </AntSelect.Option>
        ))}
      </AntSelect>
    </div>
  );
}
